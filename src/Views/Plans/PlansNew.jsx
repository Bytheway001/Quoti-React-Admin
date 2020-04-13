import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Tabs, Tab, Table, Form, FormControl, Button, FormCheck, Card, FormGroup, FormLabel } from 'react-bootstrap';
import { API, APIHEADERS, groupBy } from '../../utils';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import InputFiles from 'react-input-files';
import PlansLogic from './PlansLogic';
import { RateRow, RateSetRow } from './components/RateRow';
const testDeds = [
    { in: 1, out: 2 },
    { in: 3, out: 4 },
    { in: 5, out: 6 }
]

const testAges = [
    { min: 18, max: 24 },
    { min: 25, max: 29 },
    { min: 30, max: 34 }
]

/*
Rates = [
    {
        deductible:int,
        deductible_out:int
        values:[
            {
                min_age:int,
                max_age:int,
                yearly_price:int,
                biyearly_price:int
            }
        ]
    }

]
*/

const PlansNew = ({ location, regions, getRegionList }) => {
    const [region_id, setRegionId] = useState('');
    const [company_id, setCompanyId] = useState('');
    const [name, setName] = useState('');
    const [plan_type, setPlanType] = useState('');
    const [enabled, setEnabled] = useState(0);
    const [deductibles, setDeductibles] = useState([]);
    const [ages, setAges] = useState([])
    const [rates, setRates] = useState([]);
    const [kidRates, setKidRates] = useState([]);
    const [endosos, setEndosos] = useState([]);
    const [formIn, setFormIn] = useState('');
    const [formOut, setFormOut] = useState("");
    const [ageMin, setAgeMin] = useState('');
    const [ageMax, setAgeMax] = useState("");
    useEffect(() => {
        console.log(ages)
        getRegionList();
        let r = []
        for (let i = 0; i < deductibles.length; ++i) {
            let obj = {}
            obj.deductible = deductibles[i].in
            obj.deductible_out = deductibles[i].out
            obj.values = [];
            for (let j = 0; j < ages.length; ++j) {
                obj.values.push({
                    min_age: ages[j].min,
                    max_age: ages[j].max,
                    yearly_price: '',
                    biyearly_price: ''
                })
            }
            r.push(obj);
        }
        console.log('Effecting')
        console.table(rates)
        setRates(r);
    }, [ages,deductibles])

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

    const removeAgeOption = (min) => {
        let x = ages.filter(x => x.min !== min);
        setAges([...x]);
    }

    const addAgeOption = () => {
        let min = ageMin;
        let max = ageMax;
        setAges([...ages, { min: min, max: max }]);
    }

    const handlePriceChange = (e) => {
        let newRates = [...rates] // [age,ded,type]
        let arr = e.target.name.split('_');
        if (arr[2] === 'yearly') {
            newRates.find(obj => obj.deductible === arr[1]).values.find(a => a.min_age === arr[0]).yearly_price = e.target.value;
        }
        else {
            newRates.find(obj => obj.deductible === arr[1]).values.find(a => a.min_age === arr[0]).biyearly_price = e.target.value;
        }


        setRates(newRates);




    }
    const getInputValue = (deductible, age, field) => {
     
        let r = rates.find(x => x.deductible === deductible.in);
        if (r) {
       
            let a = r.values.find(z => z.min_age === age.min);
            if (a) {
                if (field === 'yearly_price') {
                    return a.yearly_price;
                }
                else {
                    return a.biyearly_price;
                }

            }
            else {
                return 'a'
            }
        }
        else {
            return 'b';
        }


    }
    return (
        <Row id='planForm'>
            <Col sm={12}>
                <Tabs defaultActiveKey="general" className='nav-justified'>
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
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={6}>
                                <Card>
                                    <Card.Header>Configuracion del Plan</Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Col sm={6}>

                                                <Table size='sm' variant='bordered'>
                                                    <thead>
                                                        <tr>
                                                            <th className='text-center blue' colSpan={3}>Deducibles</th>
                                                        </tr>
                                                        <tr>
                                                            <th className='blue ' style={{ width: '33%' }}>Inside</th>
                                                            <th className='blue'>Outside</th>
                                                            <th>--</th>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                <FormControl size='sm' value={formIn} onChange={({ target }) => setFormIn(target.value)} />
                                                            </th>
                                                            <th>
                                                                <FormControl size='sm' value={formOut} onChange={({ target }) => setFormOut(target.value)} />
                                                            </th>
                                                            <th>
                                                                <Button block size='sm' variant='success' onClick={() => addDedOption()}>Agregar</Button>
                                                            </th>
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
                                                                        <Button block size='sm' variant='danger' onClick={() => removeDedOption(deductible.in)}>Quitar</Button>
                                                                    </td>
                                                                </tr>

                                                            ))
                                                        }
                                                    </tbody>
                                                </Table>

                                            </Col>
                                            <Col sm={6}>

                                                <Table size='sm' variant='bordered'>
                                                    <thead>
                                                        <tr>
                                                            <th className='text-center blue' colSpan={3}>Rangos Etarios</th>
                                                        </tr>
                                                        <tr>
                                                            <th className='blue ' style={{ width: '33%' }}>Min</th>
                                                            <th className='blue'>Max</th>
                                                            <th>--</th>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                <FormControl size='sm' value={ageMin} onChange={({ target }) => setAgeMin(target.value)} />
                                                            </th>
                                                            <th>
                                                                <FormControl size='sm' value={ageMax} onChange={({ target }) => setAgeMax(target.value)} />
                                                            </th>
                                                            <th>
                                                                <Button block size='sm' variant='success' onClick={() => addAgeOption()}>Agregar</Button>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            ages.map((age) => (
                                                                <tr>
                                                                    <td>
                                                                        <label className='my-0'>{age.min}</label>
                                                                    </td>
                                                                    <td sm={4}>
                                                                        <label className='my-0'>{age.max}</label>
                                                                    </td>
                                                                    <td sm={4}>
                                                                        <Button block size='sm' variant='danger' onClick={() => removeAgeOption(age.min)}>Quitar</Button>
                                                                    </td>
                                                                </tr>

                                                            ))
                                                        }
                                                    </tbody>
                                                </Table>

                                            </Col>
                                        </Row>
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
                            deductibles.length > 0 && ages.length > 0 ?
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
                                            rates.length > 0 && ages.map((age, agekey) => (
                                                <tr>
                                                    <td>{age.min}</td>
                                                    <td>{age.max}</td>
                                                    {
                                                        deductibles.map((ded, dedkey) => (
                                                            <Fragment>
                                                                <td>
                                                                    <FormControl
                                                                        value={getInputValue(ded, age, 'yearly_price')}
                                                                        name={`${age.min}_${ded.in}_yearly`}
                                                                        onChange={(e) => handlePriceChange(e)} />

                                                                </td>
                                                                <td>
                                                                    <FormControl value={getInputValue(ded, age, 'biyearly_price')} name={`${age.min}_${ded.in}_biyearly`} onChange={(e) => handlePriceChange(e)} />
                                                                </td>
                                                            </Fragment>
                                                        ))
                                                    }
                                                </tr>
                                            ))
                                        }

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


export default PlansNew