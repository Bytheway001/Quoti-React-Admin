import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Tabs, Tab, Table, Form, FormControl, Button, FormCheck, Card, FormGroup, FormLabel } from 'react-bootstrap';
import { API, APIHEADERS } from '../../utils';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import InputFiles from 'react-input-files';
import PlansLogic from './PlansLogic';
const testDeds = [
    { in: 1, out: 2 },
    { in: 3, out: 4 },
    { in: 5, out: 6 }
]
const PlansNew = ({ location, regions, getRegionList }) => {
    const [region_id, setRegionId] = useState('');
    const [company_id, setCompanyId] = useState('');
    const [name, setName] = useState('');
    const [plan_type, setPlanType] = useState('');
    const [enabled, setEnabled] = useState(0);
    const [deductibles, setDeductibles] = useState(testDeds);
    const [rates, setRates] = useState([]);
    const [kidRates, setKidRates] = useState([]);
    const [endosos, setEndosos] = useState([]);
    const [formIn, setFormIn] = useState('');
    const [formOut, setFormOut] = useState("");


    useEffect(() => {
        getRegionList();
    }, [])

    const removeDedOption = (inside) => {
        let x = deductibles.filter(x => x.in !== inside);
        setDeductibles([...x])
    }
    const addDedOption = () => {
        let inside = formIn;
        let outside = formOut;
        setDeductibles([...deductibles, { in: inside, out: outside }]);
        setFormIn('');
        setFormOut("")
    }

    const updateRates = (key, rate, isNew) => {
       
        if (isNew) {
            console.log('NEW RATE')
            rates.push(rate)
            setRates([...rates])
        }
        else {
            console.log("OLD RATE")
            rates[key] = rate
        }
    }


    return (
        <Row id='planForm'>
            {JSON.stringify(rates)}
            <Col sm={12}>
                <Tabs defaultActiveKey="rates" className='nav-justified'>
                    <Tab eventKey="general" title="Plan">
                        <Row>
                            <Col sm={6}>
                                <Card className='h-100'>
                                    <Card.Header>PLAN</Card.Header>
                                    <Card.Body>
                                        <FormGroup>
                                            <FormLabel>Nombre del Plan</FormLabel>
                                            <FormControl size='sm' name='name' value={name} onChange={({ target }) => setName(target.value)} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Aseguradora</FormLabel>
                                            <FormControl name='company_id' size='sm' as='select' value={company_id} onChange={({ target }) => setCompanyId(target.value)}>
                                                <option disabled value="">Seleccione...</option>
                                                <option value='1'>Allianz Care</option>
                                                <option value='2'>Vumi Group</option>
                                                <option value='3'>Best Doctors Insurance</option>
                                                <option value='5'>Bupa Salud</option>
                                                <option value='6'>BMI</option>
                                            </FormControl>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Region</FormLabel>
                                            <FormControl size='sm' name='region_id' as='select' value={region_id} onChange={({ target }) => setRegionId(target.value)}>
                                                <option disabled value="">Seleccione...</option>
                                                {regions && regions.list.filter(x => x.company_id == company_id).map((region, k) => {
                                                    return (<option key={k} value={region.id}>{region.name}</option>)
                                                })}
                                            </FormControl>
                                        </FormGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={6}>
                                <Card>
                                    <Card.Header>Configuracion del Plan</Card.Header>
                                    <Card.Body>
                                        <FormGroup>
                                            <FormLabel>Tipo de Plan</FormLabel>
                                            <FormControl name='plan_type' size='sm' as='select' value={plan_type} onChange={({ target }) => setPlanType(target.value)}>
                                                <option disabled value="">Seleccione...</option>
                                                <option value='Normal'>Normal</option>
                                                <option value='Joint'>Joint</option>
                                            </FormControl>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Activo por Defecto</FormLabel>
                                            <FormControl name='enabled' size='sm' as='select' value={enabled} onChange={({ target }) => setEnabled(target.value)}>
                                                <option disabled value="">Seleccione...</option>
                                                <option value='1'>Activo</option>
                                                <option value='0'>Inactivo</option>
                                            </FormControl>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel className='d-block text-center'>Opciones de Deducible</FormLabel>
                                            <Row>
                                                <Col sm={4}>
                                                    <FormControl size='sm' value={formIn} placeholder='Inside USA' onChange={({ target }) => setFormIn(target.value)} />
                                                </Col>
                                                <Col sm={4}>

                                                    <FormControl size='sm' value={formOut} placeholder='Outside USA' onChange={({ target }) => setFormOut(target.value)} />
                                                </Col>
                                                <Col sm={4}>

                                                    <Button size='sm' variant='success' onClick={() => addDedOption()}>Agregar</Button>
                                                </Col>
                                            </Row>
                                            <Row className='my-2'>
                                                <Col sm={12}>
                                                    <Table size='sm'>
                                                        <thead>
                                                            <tr>
                                                                <th className='blue' style={{ width: '33%' }}>Inside</th>
                                                                <th className='blue'>Outside</th>
                                                                <th>--</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                deductibles.map((deductible) => (
                                                                    <tr>
                                                                        <td>
                                                                            <label className='my-0'>{deductible.in}</label>
                                                                        </td>
                                                                        <td sm={4}>
                                                                            <label className='my-0'>{deductible.out}</label>
                                                                        </td>
                                                                        <td sm={4}>
                                                                            <Button size='sm' variant='danger' onClick={() => removeDedOption(deductible.in)}>Quitar</Button>
                                                                        </td>
                                                                    </tr>

                                                                ))
                                                            }
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className='my-5'>
                            <Col sm={12} className='d-flex justify-content-end'>
                                <Button>Siguiente</Button>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="rates" title="Tarifas">
                        {
                            deductibles.length > 0 ?
                                <Table size='sm' variant='bordered' id='tarifario'>
                                    <thead>
                                        <tr className='blue-bg'>
                                            <th style={{ width: '25%' }} colSpan={2} className='col-right'>En Usa</th>
                                            {deductibles.map(x => <th className='text-right col-right' colSpan={2}>${x.in}</th>)}
                                        </tr>
                                        <tr className='blue-bg'>
                                            <th style={{ width: '25%' }} colSpan={2} className='col-right'>Fuera de USA</th>
                                            {deductibles.map(x => <th className='text-right col-right' colSpan={2}>${x.out}</th>)}
                                        </tr>
                                        <tr style={{ backgroundColor: 'gray', color: 'black' }}>
                                            <th>Min.</th>
                                            <th className='col-right'>Max</th>
                                            {deductibles.map(x =>
                                                <Fragment>
                                                    <th>Anual</th>
                                                    <th className='col-right'>Semestral</th>
                                                </Fragment>
                                            )}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            rates.map((rate, key) => (
                                                <RateRow isNew={false} rate={rate} key={key} deductibles={deductibles} updateRates={updateRates} />
                                            ))
                                        }
                                        <RateRow isNew={true} index={null} deductibles={deductibles} updateRates={updateRates} />
                                    </tbody>
                                </Table>
                                : null
                        }

                    </Tab>
                    <Tab eventKey="endosos" title="Endosos"></Tab>
                    <Tab eventKey="kidrates" title="Tarifas (Niños)"></Tab>
                </Tabs>
            </Col>

        </Row >
    )
}
/*
{min_age,max_age,deductible,yearly_price,biyearly_price,deductible_out}
*/


const RateRow = ({ deductibles, updateRates, rate, index, isNew }) => {
    const changeField = (field, value) => {
        rate = { ...rate, [field]: value }
        updateRates(index, rate, isNew)
    }
    return (
        <tr style={{ color: 'black' }}>
            <td>{index}</td>
            <td>
                <FormControl size='sm' min={0} max={99} type='number' onChange={({ target }) => changeField('min_age', target.value)} />
            </td>
            <td className='col-right'>
                <FormControl size='sm' min={0} max={99} type='number' />
            </td>
            {deductibles.map(x => <Fragment>
                <th> <FormControl size='sm' min={0} type='number' /></th>
                <th className='col-right'> <FormControl size='sm' min={0} type='number' /></th>
            </Fragment>
            )}
        </tr>
    )

    /*

    if (isNew) {
        return (
            <tr style={{ color: 'black' }}>
                <td>{key}</td>
                <td>
                    <FormControl size='sm' min={0} max={99} type='number' onChange={({ target }) => changeField('min_age', target.value)} />
                </td>
                <td className='col-right'>
                    <FormControl size='sm' min={0} max={99} type='number' />
                </td>
                {deductibles.map(x => <Fragment>
                    <th> <FormControl size='sm' min={0} type='number' /></th>
                    <th className='col-right'> <FormControl size='sm' min={0} type='number' /></th>
                </Fragment>
                )}
            </tr>
        )
    }
    else {
        return (
            <tr style={{ color: 'black' }}>

                <td>
                    <FormControl size='sm' min={0} max={99} type='number' />
                </td>
                <td className='col-right'>
                    <FormControl size='sm' min={0} max={99} type='number' />
                </td>
                {deductibles.map(x => <Fragment>
                    <th> <FormControl size='sm' min={0} type='number' /></th>
                    <th className='col-right'> <FormControl size='sm' min={0} type='number' /></th>
                </Fragment>
                )}
            </tr>
        )
    }
    */

}



class PlanxsNew extends PlansLogic {
    state = {
        plan: {
            id: null,
            region_id: "",
            region: "",
            company_id: "",
            company: "",
            name: "",
            plan_type: "",
            enabled: 0,
            rates: [],
            kid_rates: [],
            endosos: []
        },
        regions: []
    }
    componentDidMount() {
        this.getRegions()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        Axios.post(API + 'plans', this.state.plan, { headers: APIHEADERS }).then(res => res.data)
            .then(result => {
                if (result.errors === false) {
                    alert('Guardado con Exito')
                }
            })
    }


    render() {
        let plan = this.state.plan
        return (
            <Row id='planForm'>

                {
                    plan ?
                        <React.Fragment>
                            <Col sm={12}>
                                <h3 className="text-center">{plan.name}</h3>
                            </Col>
                            <Col sm={12}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Tabs defaultActiveKey="general" id="noanim-tab-example" className='nav-justified'>
                                        <Tab style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} eventKey="general" title="Plan">
                                            <Table size='sm'>
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Nombre</th>
                                                        <th>Compañia</th>
                                                        <th>Region</th>
                                                        <th>Tipo</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>{plan.id}</th>
                                                        <th>
                                                            <FormControl size='sm' name='name' value={plan.name} onChange={this.handleMainChange} />
                                                        </th>
                                                        <th>
                                                            <FormControl name='company_id' size='sm' as='select' value={plan.company_id} onChange={this.handleMainChange}>
                                                                <option disabled value="">Seleccione...</option>
                                                                <option value='1'>Allianz Care</option>
                                                                <option value='2'>Vumi Group</option>
                                                                <option value='3'>Best Doctors Insurance</option>
                                                                <option value='5'>Bupa Salud</option>
                                                                <option value='6'>BMI</option>
                                                            </FormControl>
                                                        </th>
                                                        <th>
                                                            <FormControl size='sm' name='region_id' as='select' value={plan.region_id} onChange={this.handleMainChange}>
                                                                <option disabled value="">Seleccione...</option>
                                                                {this.state.regions.filter(x => x.company_id == plan.company_id).map((region, k) => {
                                                                    return (<option key={k} value={region.id}>{region.name}</option>)
                                                                })}
                                                            </FormControl>
                                                        </th>
                                                        <th> <FormControl name='plan_type' size='sm' as='select' value={plan.plan_type} onChange={this.handleMainChange}>
                                                            <option disabled value="">Seleccione...</option>
                                                            <option value='Normal'>Normal</option>
                                                            <option value='Joint'>Joint</option>
                                                        </FormControl></th>
                                                        <th>
                                                            <FormControl name='enabled' size='sm' as='select' value={plan.enabled} onChange={this.handleMainChange}>
                                                                <option disabled value="">Seleccione...</option>
                                                                <option value='1'>Activo</option>
                                                                <option value='0'>Inactivo</option>
                                                            </FormControl>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            <Link to={'/plans/' + plan.id + '/edit'}>Editar plan</Link>
                                                        </th>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Tab>
                                        <Tab eventKey="rates" style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} title="Tarifas">
                                            <InputFiles onChange={this.handleRateCSVUpload} accept='.csv'>
                                                <Button variant='info' style={{ marginBottom: 20 }} size='sm'>Cargar Archivo CSV</Button>
                                            </InputFiles>
                                            <Button size='sm' style={{ marginBottom: 20 }} type='submit'>Guardar</Button>
                                            <Tabs className='nav-justified' onSelect={this.createNewDeductible}>
                                                {
                                                    [...new Set(plan.rates.map(item => item.deductible))].map((ded, k) => {
                                                        return (
                                                            <Tab key={k} eventKey={'deductible_' + ded} style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} title={ded}>
                                                                <Table size='sm' variant='condensed'>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Desde</th>
                                                                            <th>Hasta</th>
                                                                            <th>Anual</th>
                                                                            <th>Semestral</th>
                                                                            <th>Eliminar</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            plan.rates.filter(x => x.deductible === ded).filter(x => !x.destroy).map((rate, k) => {
                                                                                return (
                                                                                    <tr key={k}>
                                                                                        <td><FormControl name='min_age' data-rate-id={rate.id} value={rate.min_age} size='sm' type='number' onChange={this.handleRateChange} /></td>
                                                                                        <td><FormControl name='max_age' data-rate-id={rate.id} value={rate.max_age} size='sm' type='number' onChange={this.handleRateChange} /></td>
                                                                                        <td><FormControl name='yearly_price' data-rate-id={rate.id} value={rate.yearly_price} size='sm' type='number' onChange={this.handleRateChange} /></td>
                                                                                        <td><FormControl name='biyearly_price' data-rate-id={rate.id} value={rate.biyearly_price} size='sm' type='number' onChange={this.handleRateChange} /></td>
                                                                                        <td><Button block data-id={rate.id} onClick={this.destroyRate} size='sm'>Remove</Button></td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }
                                                                    </tbody>
                                                                    <tfoot>
                                                                        <tr>
                                                                            <td colSpan={5}><Button onClick={() => this.addNewRate(ded)} block>Add Rate</Button></td>
                                                                        </tr>
                                                                    </tfoot>
                                                                </Table>

                                                            </Tab>
                                                        )
                                                    })
                                                }
                                                <Tab eventKey='newDed' style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} title={'+'} />
                                            </Tabs>
                                        </Tab>
                                        <Tab style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} eventKey="endosos" title="Endosos">
                                            <Tabs className='nav-justified' onSelect={this.createNewEndoso}>
                                                {
                                                    plan.endosos.map((endoso, k) => {
                                                        return (
                                                            <Tab key={k} eventKey={'endoso_' + k} style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} title={endoso.name}>
                                                                <Table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Deducible</th>
                                                                            <th>Disponible</th>
                                                                            <th>Seleccionado</th>
                                                                            <th>Incluido</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {endoso.endoso_configs.map((ec, k) => {
                                                                            return (
                                                                                <tr key={k}>
                                                                                    <td>{ec.deductible}</td>
                                                                                    <td><FormCheck checked={ec.avaliable} /></td>
                                                                                    <td><FormCheck checked={ec.selected} /></td>
                                                                                    <td><FormCheck checked={ec.included} /></td>
                                                                                </tr>
                                                                            )
                                                                        })}
                                                                    </tbody>
                                                                </Table>
                                                            </Tab>
                                                        )
                                                    })
                                                }
                                                <Tab eventKey='newEndoso' style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} title={'+'} />
                                            </Tabs>
                                        </Tab>
                                        <Tab style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} eventKey="kidrates" title="Tarifas (Niños)">
                                            <Tabs className='nav-justified'>
                                                {
                                                    [...new Set(plan.rates.map(item => item.deductible))].map((ded, k) => {
                                                        return (
                                                            <Tab key={k} eventKey={'deductible_' + ded} style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} title={ded}>
                                                                <Table size='sm' variant='hover'>
                                                                    <thead>
                                                                        <tr>
                                                                            <th># Hijos</th>

                                                                            <th>Anual</th>
                                                                            <th>Semestral</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            plan.kid_rates.filter(x => x.deductible === ded).map((rate, k) => {
                                                                                return (
                                                                                    <tr key={k}>
                                                                                        <td>{rate.num_kids}</td>

                                                                                        <td>{rate.yearly_price}</td>
                                                                                        <td>{rate.biyearly_price}</td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }
                                                                    </tbody>
                                                                </Table>

                                                            </Tab>
                                                        )
                                                    })
                                                }
                                            </Tabs>
                                        </Tab>
                                    </Tabs>

                                </Form>
                            </Col>
                        </React.Fragment>
                        : null
                }

            </Row>
        )

    }
}

export default PlansNew