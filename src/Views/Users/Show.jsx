import React from 'react';
import { Row, Col, ListGroup, ListGroupItem, Card } from 'react-bootstrap';
import Axios from 'axios';
import { API, APIHEADERS } from '../../utils';
import {Link} from 'react-router-dom';

class UserShow extends React.Component {
    state = {
        user: null
    }

    componentDidMount() {
        Axios.get(API + 'users/' + this.props.match.params.id, { headers: APIHEADERS }).then(res => res.data)
            .then(result => {
                this.setState({
                    ...this.state,
                    user: result.data
                })
            })
    }
    render() {
        let user = this.state.user
        return (

            <Row>
                {
                    user ?
                        <React.Fragment>
                            <Col sm={12}>
                                <h3 className="text-center">{user.first_name + ' ' + user.last_name}</h3>
                            </Col>

                            <Col sm={12}>
                                <Row>
                                    <Col sm={4}>
                                        <Card>
                                            <Card.Header>Datos Generales</Card.Header>
                                            <Card.Body>
                                                <ListGroup>
                                                    <ListGroupItem>
                                                        Rol: {user.role}
                                                    </ListGroupItem>
                                                    <ListGroupItem>Email: {user.email}</ListGroupItem>
                                                </ListGroup>
                                            </Card.Body>
                                        </Card>

                                    </Col>
                                    <Col sm={4}>
                                        <Card>
                                            <Card.Header>Regiones Habilitadas</Card.Header>
                                            <Card.Body>
                                                <ListGroup>
                                                    {
                                                        user.regions.map(region => (
                                                            <ListGroupItem style={{padding:8}}>{region.name}</ListGroupItem>
                                                        ))
                                                    }
                                                </ListGroup>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={4}>
                                    <Card>
                                            <Card.Header>Acciones</Card.Header>
                                            <Card.Body>
                                                <ListGroup>
                                                   <Link to={'/users/'+user.id+'/edit'}>Editar</Link>
                                                </ListGroup>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </React.Fragment>
                        : null
                }

            </Row>
        )
    }
}


export default UserShow

