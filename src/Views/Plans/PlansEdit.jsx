import React from 'react';
import { Row, Col, Tabs, Tab, Form } from 'react-bootstrap';
import PlansLogic from './PlansLogic';
import { PlanTab } from './components/PlanTab';
import { RatesTab } from './components/RatesTab';
import { RidersTab } from './components/RidersTab';
import { KidRatesTab } from './components/KidRatesTab';
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

