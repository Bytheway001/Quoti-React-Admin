import React from 'react';
import { Row, Col, Card, ListGroup, ListGroupItem, FormControl, FormCheck, Button, Form } from 'react-bootstrap';
import { API, APIHEADERS } from '../../utils';
import Axios from 'axios';

class RegionsEdit extends React.Component {
    state = {
        region: null,
        countries: []
    }

    getCountries() {

        Axios.get(API + 'countries', { headers: APIHEADERS })
            .then(res => res.data)
            .then(result => {
                this.setState({
                    countries: result.data,

                })
            })
    }

    componentDidMount() {
        Axios.get(API + 'regions/' + this.props.match.params.id, { headers: APIHEADERS })
            .then(res => res.data)
            .then(result => {
                this.setState({
                    region: result.data
                })
            })
        this.getCountries()
    }

    toggleCountry = (e) => {
        let value = parseInt(e.target.value)
        let region = this.state.region;
        let element = region.countries.find(x => x.id === value)
        if (e.target.checked) {
            if (!element) {
                region.countries.push({ ...this.state.countries.find(x => x.id === value), selected: true })
            }
            else {
                element.selected = true;
            }
        }
        else {
            if (element) {
                element.selected = false;
            }
        }
        this.setState({
            ...this.state,
            region: region
        })

        console.log(element)


    }

    handleSubmit=(e)=>{
        e.preventDefault()
        console.log('a')
        Axios.post(API+'regions/'+this.props.match.params.id,this.state.region,{headers:APIHEADERS}).then(res=>res.data)
        .then(result=>{
            console.log(result)
        })
    }

    handleChange=(e)=>{
     
    }
    render() {
        let region = this.state.region
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    {
                        region ?
                            <React.Fragment>
                                <Col sm={12}>
                                    {JSON.stringify(this.state)}
                                    <h3 className='text-center'>{region.name}</h3></Col>
                                <Col sm={6}>
                                    <Card>
                                        <Card.Header className='d-flex justify-content-between'>
                                            Datos de Region
                                        <Button size='sm' type='submit'>Guardar</Button>
                                        </Card.Header>
                                        <Card.Body>
                                            <ListGroup>
                                                <ListGroupItem>
                                                    <h5 className='text-primary'>Compañia</h5>
                                                    <FormControl as='select' size='sm' name='company_id' value={region.company_id}>
                                                        <option value='1'>Allianz Care</option>
                                                        <option value='2'>Vumi Group</option>
                                                        <option value='3'>Best Doctors Insurance</option>
                                                        <option value='5'>Bupa Salud</option>
                                                        <option value='6'>BMI</option>
                                                    </FormControl>
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <h5 className='text-primary'>Nombre</h5>
                                                    <FormControl size='sm' name='name' value={region.name} />
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <h5 className='text-primary'>Codigo</h5>
                                                    <FormControl size='sm' name='codename' value={region.codename} />
                                                </ListGroupItem>
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col sm={6}>
                                    <Card>
                                        <Card.Header>
                                            Paises En la Region
    
                                    </Card.Header>
                                        <Card.Body>
                                            <Row>
                                                {
                                                    this.state.countries.map(country => {
                                                        let isCountry = this.state.region.countries.find(x => x.id === country.id)

                                                        return (
                                                            <Col sm={4}>
                                                                <FormCheck
                                                                    label={country.name}
                                                                    value={country.id}
                                                                    checked={isCountry && (isCountry.selected === true || isCountry.selected === undefined)}
                                                                    onChange={this.toggleCountry}
                                                                />
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </React.Fragment>
                            : null
                    }

                </Row>
            </Form>
        )
    }
}

export default RegionsEdit;