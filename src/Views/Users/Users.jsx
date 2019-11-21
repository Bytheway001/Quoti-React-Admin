import React from 'react'
import { Switch, Route,Link } from 'react-router-dom';
import { API } from '../../utils';
import axios from 'axios';
import { Container, Col, Row, Table } from 'react-bootstrap'
import UserShow from './UserShow';
import UserEdit from './UserEdit';
import { List } from '../../Components/List';
import CrudIndex from '../crud/Index';
class Users extends React.Component {
    headers ={id:'ID',first_name:'NOMBRE',last_name:'APELLIDOS',role:'ROL',email:'E-MAIL'}
    state = {
        userList: []
    }
    componentDidMount() {
        axios.get(API + 'users').then(res => res.data)
            .then(result => {
                this.setState({
                    ...this.state,
                    userList: result
                })
            })
    }

    render() {
        return (
            <Container fluid>
                <Switch>
                    <Route exact path='/users' render={() => <CrudIndex headers={this.headers} for='users'/>}></Route>
                    <Route exact path='/users/:id' component={UserShow}/>
                    <Route path='/users/:id/edit' component={UserEdit}/>
                </Switch>
            </Container>
        )
    }
}

const Lista = (props) => (
    <Row>
        <Col sm={12}>
            <h3 className="text-center">Listado de Usuarios</h3>
        </Col>
        <Col sm={12}>
            <Table size='sm' variant="bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Nombres</th>
                        <th>Rol</th>
                        <th>Status</th>
                        <th className='text-center' colSpan={3}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.users.map((user,key)=>{
                            return(
                                <tr key={key} >
                                    <td>{user.id}</td>
                                    <td >{user.email}</td>
                                    <td style={{textTransform:'capitalize'}}>{user.first_name+' '+user.last_name}</td>
                                    <td style={{textTransform:'capitalize'}}>{user.role}</td>
                                    <td>--</td>
                                    <td><Link to={'/users/'+user.id}> Ver</Link></td>
                                    <td>Editar</td>
                                    <td>Eliminar</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Col>

    </Row>
)

function getRowBg(role){
    let roles = {
        admin:'green',
        agent:'blue',
        client:'white'
    }
    return roles[role]
}
export default Users