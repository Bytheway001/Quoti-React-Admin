import React from 'react';
import { Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Axios from 'axios';
import { API, APIHEADERS } from '../../utils';


class RegionShow extends React.Component {
    state = {
        region: null
    }
    componentDidMount() {
        Axios.get(API + 'regions/' + this.props.match.params.id,{headers:APIHEADERS})
            .then(res => res.data)
            .then(result => {
                this.setState({
                    ...this.state,
                    region: result.data
                })
            })
    }
    render() {
        let region = this.state.region
        return (
            <Row>
                <p>Show</p>
                {region ?
                    <React.Fragment>
                        <Col sm={12}>
                            <h3 className="text-center">{region.name}</h3>
                        </Col>
                        <Col sm={6}>
                            <Card>
                                <Card.Header>Datos de Region</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        <ListGroupItem>
                                            <h5 className='text-primary'>Compañia</h5>
                                            <p className="mb-0">{region.company}</p>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <h5 className='text-primary'>Nombre</h5>
                                            <p className="mb-0">{region.name}</p>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <h5 className='text-primary'>Codigo</h5>
                                            <p className="mb-0">{region.codename}</p>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={6}>
                            <Card>
                                <Card.Header>Paises En la Region</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        {
                                            region.countries.map(country=>{
                                                return(
                                                    <ListGroupItem>
                                                    <p className="mb-0">{country.name}</p>
                                                </ListGroupItem>
                                                )
                                            })
                                        }
                                       
                                     
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </React.Fragment>
                    : null
                }

            </Row>
        )
    }
}

export default RegionShow;