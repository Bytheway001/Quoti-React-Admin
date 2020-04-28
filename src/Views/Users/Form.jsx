import React from 'react'
import { Form, Row, Col, Card, FormControl, FormCheck, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getRegionList } from '../../ducks/regions';
import { getCountryList } from '../../ducks/countries';
import { setUserInfo, updateUser } from '../../ducks/user';
let UserForm = ({ id, getUserInfo, user, getRegionList, getCountryList, regions, countries,setUserInfo,updateUser }) => {
    useEffect(() => {
        getRegionList()
        getUserInfo(id)
        getCountryList()
    }, [getRegionList,getUserInfo,getCountryList,id])

    const handleChange = (e)=>{
        let oldUser = {...user};
        oldUser[e.target.name]=e.target.value
        setUserInfo(oldUser)
    }

    const toggleRegion = (regionId)=>{
        let oldUser = {...user}
        let r = oldUser.regions.find(r=>r.region===regionId);
        if(r){
            r.checked=!r.checked
        }
        else{
            oldUser.regions.push({region:regionId,checked:true})
        }
        setUserInfo(oldUser);
    }

    const toggleCountry = (countryId) =>{
        let oldUser = {...user}
        let r = oldUser.countries.find(r=>r.country===countryId);
        if(r){
            r.checked=!r.checked
        }
        else{
            oldUser.countries.push({country:countryId,checked:true})
        }
        setUserInfo(oldUser);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        updateUser()
    }




    return (
        <Form onSubmit={handleSubmit}>

            <Row noGutters style={{height:'60vh'}}>
                <Col sm={4}>
                    <Card className='h-100' style={{borderRadius:0}}>
                        <Card.Header className='text-center'  style={{borderRadius:0}}>Datos Generales</Card.Header>
                        <Card.Body>

                            <Form.Group>
                                <label>Nombre(s):</label>
                                <FormControl name='first_name' size='sm' value={user.first_name} onChange={(e)=>handleChange(e)}/>
                            </Form.Group>
                            <Form.Group>
                                <label>Apellido(s):</label>
                                <FormControl name='last_name' size='sm' value={user.last_name} onChange={(e)=>handleChange(e)}/>
                            </Form.Group>
                            <Form.Group>
                                <label>Rol:</label>
                                <FormControl as='select' name='role' size='sm' value={user.role} onChange={(e)=>handleChange(e)}>
                                    <option value=''>Seleccione...</option>
                                    <option value='staff'>STAFF</option>
                                    <option value='agent'>AGENTE</option>
                                    <option value='client'>CLIENTE</option>
                                </FormControl>
                            </Form.Group>
                            <Form.Group>
                                <label>Email:</label>
                                <FormControl component='input' type='email' name='email' size='sm' value={user.email} onChange={(e)=>handleChange(e)}/>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={3}>
                                    <label>Codigo</label>
                                    <FormControl name='countrycode' size='sm' value={user.countrycode} onChange={(e)=>handleChange(e)} />
                                </Col>
                                <Col sm={9}>
                                    <label>Whatsapp</label>
                                    <FormControl name='whatsapp' size='sm' value={user.whatsapp} onChange={(e)=>handleChange(e)}/>
                                </Col>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4} className='h-100'>
                    <Card className='h-100'>
                        <Card.Header className='text-center'  style={{borderRadius:0}}>Regiones</Card.Header>
                        <Card.Body>

                            <Row>

                                {
                                    regions && regions.map(region => {
                                        return (
                                            <Col sm={6}>
                                                <FormCheck 
                                                    checked={user.regions && user.regions.find(r => r.region === region.id) && user.regions.find(r => r.region === region.id).checked} label={region.name} 
                                                    onChange={(e)=>toggleRegion(region.id)}
                                                />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4}>
                    <Card className='h-100'>
                        <Card.Header className='text-center' style={{borderRadius:0}}>Paises</Card.Header>
                        <Card.Body>

                            <Row>

                                {
                                    countries && countries.map(country => {
                                        return (
                                            <Col sm={6}>
                                                <FormCheck 
                                                    checked={user.countries && user.countries.find(r => r.country === country.id) && user.countries.find(r => r.country === country.id).checked} label={country.name} 
                                                    onChange={(e)=>toggleCountry(country.id)}
                                                />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col sm={12} className='text-center mt-2'>
                <Button type='submit'>Enviar</Button>
                </Col>
            </Row>
                               
        </Form>
    )
}

const mapStateToProps = state => (
    {
        user: state.users.editing,
        regions: state.regions.list,
        countries: state.countries.list
    }
)

const mapDispatchToProps = dispatch => (
    {
        getRegionList: () => dispatch(getRegionList()),
        getCountryList: () => dispatch(getCountryList()),
        setUserInfo:(newUser)=>dispatch(setUserInfo(newUser)),
        updateUser:()=>dispatch(updateUser())
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)