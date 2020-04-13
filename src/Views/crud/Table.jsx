import React, { useState, useEffect } from 'react';
import { Table, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown, faEye, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';
import { API } from '../../utils';
export const CrudTable = (props) => {
	const [direction, setDirection] = useState(true);
	const [order, setOrder] = useState(null)
	const [data, setData] = useState([]);
	const [filters, setFilters] = useState({})
	useEffect(() => {
		console.log('effecting')
		let newArray = data.sort((a, b) => {
			if (direction) {
				return a[order] > b[order] ? -1 : 1
			}
			else {
				return a[order] > b[order] ? 1 : -1
			}
		})
		setData(newArray)
	}, [direction, order, filters])


	useEffect(() => {
		setData(props.resource)
	}, [props])

	const sortTable = (order, direction) => {
		setOrder(order);
		setDirection(direction)
	}

	const filterTable = (filters) => {
		console.log(filters);
		const oldData = props.resource;
		const newData = oldData.filter(row => {
			let shown = true;
			Object.keys(filters).map(filter => {
				if (row[filter].toString() !== filters[filter] && filters[filter] !== 'all') {
					shown = false;
				}
			})
			return shown;
		})
		setData(newData)
	}

	const addFilter = (filtername, filtervalue) => {
		console.log(filtername, filtervalue);
		let f = { ...filters }
		f[filtername] = filtervalue;
		console.log(f)
		setFilters(f)
		filterTable(f)
	}

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
		< Table size='sm' variant='bordered'>

			<thead>
				<tr>
					{
						props.headers.map((header, index) => (
							<td onClick={() => sortTable(header.name, !direction)} key={index}>
								{header.name} {order === header && <FontAwesomeIcon icon={direction ? faCaretUp : faCaretDown} />}
							</td>
						))
					}
					<td colSpan={3}>ACCIONES</td>

				</tr>
				<tr>
					{props.headers.map((header, index) => (
						<td>
							{
								header.filter && (
									<FormControl size='sm' as='select' onChange={({ target }) => addFilter(header.filter, target.value)}>
										<option value='all' > </option>
										{[...new Set(props.resource.map(r => header.value(r)))].map(value => {

											return <option value={value}>{value}</option>
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
									props.headers.map((header, index) => {
										return (
											<td key={index}>{header.value(element)}</td>
										)
									})
								}
								<td style={{ width: 50 }}>
									<Button block variant='info' size='sm' as={Link} to={'/' + props.for + '/' + element.id}><FontAwesomeIcon icon={faEye} /></Button>
								</td>
								<td style={{ width: 50 }}>
									<Button block size='sm' as={Link} to={'/' + props.for + '/' + element.id + '/edit'}><FontAwesomeIcon icon={faEdit} /></Button>
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
