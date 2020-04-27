import React from 'react';
import { Row, Card, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import Axios from 'axios';

export const UserShow = ({id,getUserInfo,users}) =>{
    const user = users.editing
   
    useEffect(()=>{
        getUserInfo(id)
       
    },[])
    return(
        <Row>
            <Col sm={4}>
                <Card>
                    <Card.Header>Datos Generales</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col sm={6}>
                                <p>Nombre:</p>
                            </Col>
                            <Col sm={6}>
                                <p>{user.first_name}</p>
                            </Col>
                            <Col sm={6}>
                                <p>Apellido:</p>
                            </Col>
                            <Col sm={6}>
                                <p>{user.last_name}</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={4}>
                <Card>
                    <Card.Header>Stats</Card.Header>
                    <Card.Body>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}