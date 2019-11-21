import React from 'react';
import { Row, Col, ListGroup, ListGroupItem, Card, Form, FormLabel, FormGroup, FormControl, FormCheck, Button } from 'react-bootstrap';
import Axios from 'axios';
import { API, APIHEADERS } from '../../utils';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
class UserEdit extends React.Component {
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
                {user ?
                    <React.Fragment>
                        <Col sm={12}>
                            <h3 className="text-center">Editar Usuario</h3>
                        </Col>
                        <Col sm={12}>
                            <UserForm user={user} />
                        </Col>
                    </React.Fragment>
                    : null
                }
            </Row>



        )
    }
}


class UserForm extends React.Component {
    state = {
        email: '',
        first_name: '',
        last_name: '',
        role: '',
        regions: [],
        countries:[],
        regionList: [],
        countryList:[]
    }
    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }
    componentDidMount() {
        Axios.get(API + 'regions', { headers: APIHEADERS }).then(res => res.data)
            .then(result => {
                this.setState({
                    ...this.props.user,
                    regionList: result.data
                })
            })
            Axios.get(API + 'countries', { headers: APIHEADERS })
            .then(res => res.data)
            .then(result => {
                this.setState({
                    countryList: result.data,

                })
            })

    }

    isCountryChecked = (country) => {
    
        let r = this.state.countries.find(x => x.country === country)
        return r && r.checked
    }

    isRegionChecked = (region) => {
       
        let r = this.state.regions.find(x => x.region === region)
        return r && r.checked
    }
    toggleCountryCheckbox = (e)=>{
        console.log(e.target.value,this.state.countries)
        let value = parseInt(e.target.value)
        let r = this.state.countries;
        let element = r.find(x => x.country === value)
        if (element) {
            if (e.target.checked) {
                element.checked = true;

            }
            else {
                element.checked = false;
            }
            this.setState({
                ...this.state,
                countries: r
            })
        }
        else {
            if (e.target.checked) {

                r.push({ country: value, checked: true })
                this.setState({
                    ...this.state,
                    countries:r
                })
            }
        }
     
    }

    toggleCheckbox = (e) => {
        let value = parseInt(e.target.value)
        let r = this.state.regions;
        let element = r.find(x => x.region === value)
        if (element) {
            if (e.target.checked) {
                element.checked = true;

            }
            else {
                element.checked = false;
            }
            this.setState({
                ...this.state,
                regions: r
            })
        }
        else {
            if (e.target.checked) {

                r.push({ region: value, checked: true })
                this.setState({
                    ...this.state,
                    regions:r
                })
            }
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        let user = { id: this.props.user.id, email: this.state.email, first_name: this.state.first_name, last_name: this.state.last_name, role: this.state.role, regions: this.state.regions,countries:this.state.countries }
        Axios.post(API + 'users/' + this.props.user.id, { user: user }, { headers: APIHEADERS }).then(res => res.data)
            .then(result => {
                alert(result.msg)
            })
    }

    render() {
        return (
            <React.Fragment>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col sm={4}>
                            <Card>
                                <Card.Header>Datos Generales</Card.Header>
                                <Card.Body>
                                    <FormGroup>
                                        <FormLabel>E-Mail</FormLabel>
                                        <FormControl name='email' value={this.state.email} onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Nombres</FormLabel>
                                        <FormControl name='first_name' value={this.state.first_name} onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Apellidos</FormLabel>
                                        <FormControl name='last_name' value={this.state.last_name} onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Rol</FormLabel>
                                        <FormControl as='select' name='role' value={this.state.role} onChange={this.handleChange}>
                                            <option value='agent'>Agente</option>
                                            <option value='client'>Cliente</option>
                                            <option value='agent'>Agente</option>
                                        </FormControl>
                                    </FormGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card>
                                <Card.Header>Regiones Habilitadas</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        <ListGroupItem>
                                            {
                                                this.state.regionList.map((region, k) => {
                                                    return (<FormCheck key={k} style={{ display: 'flex' }} value={region.id} checked={this.isRegionChecked(region.id)} label={region.name} onChange={this.toggleCheckbox} />)
                                                })
                                            }
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card>
                                <Card.Header>Paises Habilitados</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        <ListGroupItem>
                                            {
                                                this.state.countryList.map((country, k) => {
                                                    return (<FormCheck key={k} style={{ display: 'flex' }}  checked={this.isCountryChecked(country.id)} value={country.id} label={country.short_name} onChange={this.toggleCountryCheckbox} />)
                                                })
                                            }
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12}>
                            <Button type='submit'>Guardar Cambios</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>

        )
    }

}




UserForm.propTypes = {
    user: PropTypes.object
}



export default UserEdit

