import React, { useEffect, useReducer } from 'react';
import { Row, Col, Tabs, Tab, Form, Button } from 'react-bootstrap';
import PlansLogic from './PlansLogic';
import { PlanTab } from './components/PlanTab';
import { RatesTab } from './components/RatesTab';
import { RidersTab } from './components/RidersTab';
import { KidRatesTab } from './components/KidRatesTab';
import { API } from '../../utils';
import Axios from 'axios';
import { reducer } from './reducer';
import { BenefitsTab } from './components/BenefitsTab';
export const PlanEdit = ({ match }) => {
    const initialState = null
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        Axios.get(API + 'plans/' + match.params.id).then(res => {
            dispatch({ type: 'PLAN_REQUEST_SUCCEEDED', payload: res.data.data });
        })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleRateChange = (id, value, type) => {
        dispatch({ type: "RATE_WAS_CHANGED", payload: { id, value, type } })
    }

    const handleSubmit = e => {
        e.preventDefault()
        Axios.put(API + 'plans/' + match.params.id, state).then(res => {
            console.log(res.data.data)
        })
    }




    return (
        <Row className='mt-5'>
            {
                state && (
                    <>
                        <Col sm={6}>
                            <h3 className="text-center"> {state.general.name}</h3>
                        </Col>
                        {state &&
                            <Col sm={6}>
                                <Button block size='sm' type='submit' form='plan_edit_form' >Guardar Cambios</Button>
                            </Col>
                        }
                        <Col sm={12}>
                            <Form onSubmit={handleSubmit} id='plan_edit_form'>

                                {
                                    state && (
                                        <Tabs defaultActiveKey="rates" id="noanim-tab-example" className='nav-justified'>
                                            <PlanTab />
                                            <Tab eventKey="rates" title='Tarifas' className='p-3'>
                                                <RatesTab rates={state.rates} onRateChange={handleRateChange} />
                                            </Tab>
                                            <Tab eventKey="benefits" title='Beneficios'>
                                                <BenefitsTab benefits={state.benefits} />
                                            </Tab>
                                            <Tab eventKey="riders" title='Endosos'></Tab>
                                        </Tabs>
                                    )
                                }
                            </Form>
                        </Col>
                    </>
                )
            }

        </Row>
    )
}
class PlanEdit2 extends PlansLogic {
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
                                            <PlanTab plan={plan} handleMainChange={this.handleMainChange} regions={this.state.regions} />
                                        </Tab>
                                        <Tab eventKey="rates" style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} title="Tarifas">
                                            <RatesTab
                                                plan={plan}
                                                handleRateCSVUpload={this.handleRateCSVUpload}
                                                createNewDeductible={this.createNewDeductible}
                                                handleRateChange={this.handleRateChange}
                                                destroyRate={this.destroyRate}
                                            />
                                        </Tab>
                                        <Tab style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} eventKey="endosos" title="Endosos">
                                            <RidersTab plan={plan} handleEndosoConfigChange={this.handleEndosoConfigChange} createNewEndoso={this.createNewEndoso} />
                                        </Tab>
                                        <Tab style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} eventKey="kidrates" title="Tarifas (Niños)">
                                            <KidRatesTab
                                                plan={plan}
                                                handleKidRateCSVUpload={this.handleKidRateCSVUpload}
                                            />
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

