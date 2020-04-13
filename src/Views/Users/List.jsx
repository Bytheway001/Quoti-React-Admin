import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, ButtonGroup } from 'react-bootstrap';
import { TableActions } from '../../Components/TableActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCircle } from '@fortawesome/free-solid-svg-icons';

const currentURL = 'http://www.quotiapp.com';
const UserList = (props) => {
    useEffect(() => {
        props.getUserList();
    }, []);
    let list = props.users.list
    return (
        <Fragment>
            <h3 className="text-center">Listado de Usuarios</h3>
            <Button className='my-2' as={Link} to='/users/new' variant='success'><FontAwesomeIcon icon={faPlus} /> Nuevo</Button>
            <Table size='sm'>
                <thead>
                    <tr>
                        <th><FontAwesomeIcon icon={faCircle} color='gray'/></th>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Licencia</th>
                        <th>Ult. Login</th>
                        <th>Link</th>
                        <th>Creado en</th>
                        <th className='text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <th><FontAwesomeIcon icon={faCircle} color={user.enabled==1?'green':'red'}/></th>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td style={{textTransform:'capitalize'}}>{user.license}</td>
                                    <td>{user.last_sign_in}</td>
                                    <td>{user.created_at}</td>
                                    {user.token ?
                                        <td><Button block size='sm' onClick={() => alert(`${currentURL}/confirm?uid=` + user.email + '&t=' + user.token)}>Ver Link</Button></td>
                                        :
                                        <td><Button block size='sm' variant='success' disabled>Confirmada</Button> </td>
                                    }

                                    <TableActions resource='users' id={user.id} onDelete={props.deleteUser} />

                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        }
        </Fragment >
    )
  
}


export default UserList;