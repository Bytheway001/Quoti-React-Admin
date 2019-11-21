import React from 'react';
import { Row, Col, ListGroup, ListGroupItem, Card, Tabs, Tab, Table, Form, FormControl, Button, FormCheck } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import InputFiles from 'react-input-files';
import PlansLogic from './PlansLogic';
class PlanEdit extends PlansLogic {
    render() {
        let plan = this.state.plan
        return (
            <Row>

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
                                                                <option value='1'>Allianz Care</option>
                                                                <option value='2'>Vumi Group</option>
                                                                <option value='3'>Best Doctors Insurance</option>
                                                                <option value='5'>Bupa Salud</option>
                                                                <option value='6'>BMI</option>
                                                            </FormControl>
                                                        </th>
                                                        <th>
                                                            <FormControl size='sm' name='region_id' as='select' value={plan.region_id} onChange={this.handleMainChange}>
                                                                {this.state.regions.filter(x => x.company_id == plan.company_id).map((region, k) => {
                                                                    return (<option key={k} value={region.id}>{region.name}</option>)
                                                                })}
                                                            </FormControl>
                                                        </th>
                                                        <th>{plan.plan_type}</th>
                                                        <th>
                                                            <FormControl name='enabled' size='sm' as='select' value={plan.enabled} onChange={this.handleMainChange}>
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
                                                                                    <td><FormCheck name='avaliable' data-endoso={endoso.id} data-id={ec.id} checked={ec.avaliable===1} onClick={this.handleEndosoConfigChange} /></td>
                                                                                    <td><FormCheck name='selected'  data-endoso={endoso.id} data-id={ec.id} checked={ec.selected===1} onClick={this.handleEndosoConfigChange} /></td>
                                                                                    <td><FormCheck name='included'  data-endoso={endoso.id} data-id={ec.id} checked={ec.included===1} onClick={this.handleEndosoConfigChange} /></td>
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





export default PlanEdit

