import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export const List = (props) => {

    let data = props.data;
    const headers = props.headers || data[0]?Object.keys(data[0]):[]
    
    return (
        <Table size='sm' variant="bordered">
            <thead>
                <tr>
                    {headers.map((h, k) => <td>{h}</td>)}
                    <td colSpan={3}>Acciones</td>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map((element, key) => {
                        return (
                            <tr key={key} >
                                {
                                    headers.map(header => {
                                        return (
                                            <td>{element[header]}</td>
                                        )
                                    })
                                }
                                <td><Button variant='info' block size='sm' as={Link} to={props.path+'/'+element.id}>Ver</Button></td>
                                <td><Button variant='success' block size='sm' as={Link} to={props.path+'/'+element.id+'/edit'}>Editar</Button></td>
                                <td><Button variant='danger' block size='sm' >Eliminar</Button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}