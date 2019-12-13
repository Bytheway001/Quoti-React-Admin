import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Card, FormGroup, FormLabel, FormControl, Spinner, Button } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

const UserForm = (props) => {
    const [email, setEmail] = useState('')
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [license, setLicense] = useState('');
    const [enabled, setEnabled] = useState('');
    const [regions, setRegions] = useState([]);
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        if (props.match.params.id) {
            props.getUserInfo(props.match.params.id)
        }
        else {
            props.clearUserInfo()
        }
        props.getRegionList();
        props.getCountryList();
    }, [props.match.params.id])

    useEffect(() => {
        console.log(props.users.editing)
        setEmail(props.users.editing.email)
        setFirstName(props.users.editing.first_name)
        setLastName(props.users.editing.last_name)
        setRole(props.users.editing.role)
        setEnabled(props.users.editing.enabled)
        setRegions(props.users.editing.regions || [])
        setCountries(props.users.editing.countries || [])
        setLicense(props.users.editing.license)
    }, [props.users.editing])

    const handleSubmit = (e) => {
 
        e.preventDefault();
      
        if (props.match.params.id) {
            props.updateUser(props.match.params.id, email, first_name,last_name, role, enabled,license, regions, countries)
        }
        else {
            props.createUser(email, first_name,last_name, role, enabled,license, regions, countries)
        }
      
    }

    const toggleRegion = (checked, regionId) => {
        let selectedRegion = regions.findIndex(x => x.region === regionId)
        if (selectedRegion === -1) {
            regions.push({ region: regionId, checked: checked })
        }
        else {
            regions[selectedRegion].checked = checked
        }
        setRegions(regions)

    }

    const toggleCountry = (checked, countryId) => {
        let selectedCountry = countries.findIndex(x => x.country === countryId)
        if (selectedCountry === -1) {
            countries.push({ country: countryId, checked: checked })
        }
        else {
            countries[selectedCountry].checked = checked
        }
        setCountries(countries)
    }


    return (
        <Form onSubmit={handleSubmit}>

            {
                !props.users.fetchingList && !props.regions.fetchingList && !props.countries.fetchingList ?
                    <Row>
                        <Col sm={12} md={3} className='h-100'>
                            <Card>
                                <Card.Header>Datos Generales</Card.Header>

                                <Card.Body>
                                    <FormGroup>
                                        <FormLabel>E-Mail</FormLabel>
                                        <FormControl size='sm' name="email" value={email || ''} onChange={({ target }) => setEmail(target.value)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Nombres</FormLabel>
                                        <FormControl size='sm' name='first_name' value={first_name || ''} onChange={({ target }) => setFirstName(target.value)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Apellidos</FormLabel>
                                        <FormControl size='sm' name='last_name' value={last_name || ''} onChange={({ target }) => setLastName(target.value)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Rol</FormLabel>
                                        <FormControl size='sm' as='select' name='role' value={role || ''} onChange={({ target }) => setRole(target.value)} >
                                            <option value=''>Seleccione...</option>
                                            <option value='client'>Cliente</option>
                                            <option value='agent'>Agente</option>
                                            <option value='admin'>Admin</option>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup>
                                   
                                        <FormLabel>Status</FormLabel>
                                        <FormControl size='sm' as='select' name='enabled' value={enabled.toString() || ''} onChange={({ target }) => setEnabled(target.value)} >>
                                            <option value=''>Seleccione...</option>
                                            <option value='1'>Activo</option>
                                            <option value='0'>Inactivo</option>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Licencia</FormLabel>
                                        <FormControl size='sm' as='select' name='license' value={license || ''} onChange={({ target }) => setLicense(target.value)} >
                                            <option value=''>Seleccione...</option>
                                            <option value='trial'>Trial User</option>
                                            <option value='paid'>Paid Customer</option>
                                        </FormControl>
                                    </FormGroup>
                                </Card.Body>

                            </Card>
                            <Button size='sm' block type='submit'>Guardar</Button>
                        </Col>
                        <Col md={9} className='d-flex flex-column justify-content-around'>
                            <Card className='mb-3'>
                                <Card.Header>Regiones</Card.Header>
                                <Card.Body as={Row}>
                                    {
                                        props.regions && props.regions.list.map((region, index) => (
                                            <Col sm={3} key={index}>
                                                <BootstrapSwitchButton
                                                    checked={regions && regions.find(x => { return x.region === region.id }) ? regions.find(x => { return x.region === region.id }).checked : false}
                                                    onChange={(e) => { toggleRegion(e, region.id) }}
                                                    size='sm'
                                                    onlabel={region.name}
                                                    offlabel={region.name}
                                                    onstyle='success' offstyle='danger'
                                                    style='w-100'

                                                />
                                            </Col>
                                        ))
                                    }
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Header>Paises</Card.Header>

                                <Card.Body as={Row}>
                                    {
                                        props.countries && props.countries.list.map((country, index) => (
                                            <Col sm={3}>
                                                <BootstrapSwitchButton
                                                    checked={countries && countries.find(x => { return x.country === country.id }) ? countries.find(x => { return x.country === country.id }).checked : false}
                                                    size='sm'
                                                    onlabel={country.name}
                                                    offlabel={country.name}
                                                    onstyle='success' offstyle='danger'
                                                    style='w-100'
                                                    onChange={(e) => { toggleCountry(e, country.id) }}
                                                />
                                            </Col>

                                        ))
                                    }

                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                    : <Spinner animation='border' size={32} />

            }

        </Form>
    )
}



export default UserForm
