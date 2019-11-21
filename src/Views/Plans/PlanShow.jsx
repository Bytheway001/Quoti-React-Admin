import React from 'react';
import { Row, Col, ListGroup, ListGroupItem, Card, Tabs, Tab, Table } from 'react-bootstrap';
import Axios from 'axios';
import { API, APIHEADERS } from '../../utils';
import { Link } from 'react-router-dom';

class PlanShow extends React.Component {
    state = {
        plan: null
    }

    componentDidMount() {
        Axios.get(API + 'plans/' + this.props.match.params.id, { headers: APIHEADERS }).then(res => res.data)
            .then(result => {
                this.setState({
                    ...this.state,
                    plan: result.data
                })
            })
    }
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
                                <Tabs defaultActiveKey="general" id="noanim-tab-example" className='nav-justified'>
                                    <Tab style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} eventKey="general" title="Plan">
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Compañia</th>
                                                    <th>Region</th>
                                                    <th>Tipo</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>{plan.id}</th>
                                                    <th>{plan.company}</th>
                                                    <th>{plan.region}</th>
                                                    <th>{plan.plan_type}</th>
                                                    <th>{plan.enabled ? 'Activo' : 'Inactivo'}</th>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <Link to={'/plans/'+plan.id+'/edit'}>Editar plan</Link>
                                                    </th>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="rates" style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} title="Tarifas">
                                        <Tabs className='nav-justified'>
                                            {
                                                [...new Set(plan.rates.map(item => item.deductible))].map(ded => {
                                                    return (
                                                        <Tab eventKey={'deductible_' + ded} style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} title={ded}>
                                                            <Table size='sm' variant='hover'>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Desde</th>
                                                                        <th>Hasta</th>
                                                                        <th>Anual</th>
                                                                        <th>Semestral</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        plan.rates.filter(x => x.deductible === ded).map(rate => {
                                                                            return (
                                                                                <tr>
                                                                                    <td>{rate.min_age}</td>
                                                                                    <td>{rate.max_age}</td>
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
                                    <Tab style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} eventKey="endosos" title="Endosos">
                                        <Tabs className='nav-justified'>
                                            {
                                                plan.endosos.map(endoso => {
                                                    return (
                                                        <Tab eventKey={'endoso_' + endoso.id} style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} title={endoso.name}>
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
                                                                   {endoso.endoso_configs.map(ec=>{
                                                                       return(
                                                                           <tr>
                                                                               <td>{ec.deductible}</td>
                                                                               <td>{ec.avaliable?'SI':'NO'}</td>
                                                                               <td>{ec.selected?'SI':'NO'}</td>
                                                                               <td>{ec.included?'SI':'NO'}</td>
                                                                           </tr>
                                                                       )
                                                                   })}
                                                                </tbody>
                                                            </Table>
                                                        </Tab>
                                                    )
                                                })
                                            }
                                        </Tabs>
                                    </Tab>
                                    <Tab style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} eventKey="kidrates" title="Tarifas (Niños)">
                                        <Tabs className='nav-justified'>
                                            {
                                                [...new Set(plan.rates.map(item => item.deductible))].map(ded => {
                                                    return (
                                                        <Tab eventKey={'deductible_' + ded} style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} title={ded}>
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
                                                                        plan.kid_rates.filter(x => x.deductible === ded).map(rate => {
                                                                            return (
                                                                                <tr>
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
                            </Col>
                        </React.Fragment>
                        : null
                }

            </Row>
        )
    }
}


export default PlanShow

