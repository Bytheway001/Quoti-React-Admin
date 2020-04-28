import React, { useState, useEffect } from 'react';
import { Table, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown, faEye, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';
import { API } from '../../utils';
import PropTypes from 'prop-types'
const CrudTable = ({ resourceName, headers, resourceList }) => {
	const [direction, setDirection] = useState(true);
	const [order, setOrder] = useState(null)
	const [data, setData] = useState(resourceList);

	const [filters, setFilters] = useState({})
	/** This effect sorts the table */
	useEffect(() => {
		let newArray = data.sort((a, b) => {
			if (direction) {
				return a[order] > b[order] ? -1 : 1
			}
			else {
				return a[order] > b[order] ? 1 : -1
			}
		})

		setData(newArray)
	}, [direction, order, filters, data])

	/** Sets the data from the list prop */
	useEffect(() => {
		setData(resourceList)
	}, [resourceList])
	/* This sets the sort criteria */
	const sortTable = (order, direction) => {
		setOrder(order);
		setDirection(direction)
	}
	/** Filters the table for delivery */
	const filterTable = (filters) => {
		const oldData = resourceList;
		const newData = oldData.filter(row => {
			let shown = true;
			Object.keys(filters).map(filter => {
				if (row[filter].toString() !== filters[filter] && filters[filter] !== 'all') {
					shown = false;
				}
				return false
			})
			return shown;
		})
		setData(newData)
	}

	/** Adds a new filter */
	const addFilter = (filtername, filtervalue) => {

		let f = { ...filters }
		f[filtername] = filtervalue;
		setFilters(f)
		filterTable(f)
	}

	/** Handles the deletion of a register */
	const handleDelete = (e) => {
		if (window.confirm('Seguro que desea eliminar este registro?')) {
			Axios.delete(API + 'files/' + e).then(res => {
				if (res.data.message === 'Deleted Successfully') {
					setData(data.filter(x => x.id !== e))
				}
			})
				.catch(err => {
					alert("Failure")
				})
		}
	}
	return (
		<Table size='sm' variant='bordered'>
			<thead>
				<tr>
					{
						headers.map((header, index) => (
							<td key={index} onClick={() => sortTable(header.name, !direction)} >
								{header.name} {order === header && <FontAwesomeIcon icon={direction ? faCaretUp : faCaretDown} />}
							</td>
						))
					}
					<td colSpan={3}>ACCIONES</td>

				</tr>
				<tr>
					{headers.map((header, index) => (
						<td key={index}>
							{
								header.filter && (
									<FormControl size='sm' as='select' onChange={({ target }) => addFilter(header.filter, target.value)}>
										<option value='all' > </option>
										{[...new Set(resourceList.map(r => header.value(r)))].map((value, index) => {

											return <option key={index} value={value}>{value}</option>
										}
										)}
									</FormControl>
								)
							}

						</td>
					))
					}
					<td style={{ verticalAlign: 'middle', textAlign: 'center' }}>Ver</td>
					<td style={{ verticalAlign: 'middle', textAlign: 'center' }}>Edit</td>
					<td style={{ verticalAlign: 'middle', textAlign: 'center' }}>Elim</td>
				</tr>
			</thead>
			<tbody>
				{
					data.map((element, index) => {
						return (
							<tr key={index}>
								{
									headers.map((header, index) => {
										return (
											<td key={index}>{header.value(element)}</td>
										)
									})
								}
								<td style={{ width: 50 }}>
									<Button block variant='info' size='sm' as={Link} to={'/' + resourceName + '/' + element.id}><FontAwesomeIcon icon={faEye} /></Button>
								</td>
								<td style={{ width: 50 }}>
									<Button block size='sm' as={Link} to={'/' + resourceName + '/' + element.id + '/edit'}><FontAwesomeIcon icon={faEdit} /></Button>
								</td>
								<td style={{ width: 50 }}>
									<Button block variant='danger' size='sm' onClick={() => handleDelete(element.id)}><FontAwesomeIcon icon={faTimes} /></Button>
								</td>
							</tr>
						)
					})
				}
			</tbody>
		</Table >
	)
}

CrudTable.propTypes = {
	resourceList: PropTypes.array.isRequired,
	resourceName: PropTypes.string.isRequired,
	headers: PropTypes.array.isRequired
}

export default CrudTable;