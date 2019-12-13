import React, { useState, useEffect } from 'react';
import { Table, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown, faEye, faEdit } from '@fortawesome/free-solid-svg-icons'
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
    }, [direction, order,filters])


    useEffect(() => {
        setData(props.resource)
    }, [props])

    const sortTable = (order, direction) => {
        setOrder(order);
        setDirection(direction)
    }

    const filterTable = (filters)=>{
        const oldData = props.resource;
        const newData = oldData.filter(row=>{
            let shown = true;
            Object.keys(filters).map(filter=>{
                if(row[filter].toString()!==filters[filter] && filters[filter]!=='all'){
                    shown=false;
                }
            })
            return shown;
        })
        setData(newData)
    }

    const addFilter = (filtername,filtervalue)=>{
        let f = {...filters}
        f[filtername]=filtervalue;
        console.log(f)
        setFilters(f)
        filterTable(f)
    }
    
    return (
        < Table size='sm' >

            <thead>
                <tr>
                    {props.headerkeys.map((key, index) => <td onClick={() => sortTable(key, !direction)} key={index}>{props.headers[key]} {order === key && <FontAwesomeIcon icon={direction ? faCaretUp : faCaretDown} />} </td>)}
                    <td colSpan={3}>ACCIONES</td>

                </tr>
                <tr>
                    {props.headerkeys.map((key, index) => (
                        <td>
                            <FormControl size='sm' as='select' onChange={({target})=>addFilter(key,target.value)}>
                                <option value='all' >TODOS</option>
                                {[...new Set(props.resource.map(r => r[key]))].map(value => (<option value={value}>{value}</option>))}
                            </FormControl>
                        </td>
                    ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((element, index) => {
                        return (
                            <tr key={index}>
                                {
                                    props.headerkeys.map((key, index) => {
                                        return (
                                            <td key={key}>{element[key]}</td>
                                        )
                                    })
                                }
                                <td>
                                    <Button variant='info' size='sm' as={Link} to={'/' + props.for + '/' + element.id}><FontAwesomeIcon icon={faEye} /></Button>
                                    <Button size='sm' as={Link} to={'/' + props.for + '/' + element.id + '/edit'}><FontAwesomeIcon icon={faEdit} /></Button>
                                </td>
                         
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table >
    )
}
