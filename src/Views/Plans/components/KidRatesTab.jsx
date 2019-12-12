import React, { Fragment } from 'react';
import {Tabs,Tab,Table, Button} from 'react-bootstrap';
import InputFiles from 'react-input-files';

export const KidRatesTab = props => {
    let {plan,handleKidRateCSVUpload}=props

    return (
        <Fragment>
             <InputFiles onChange={handleKidRateCSVUpload} accept='.csv'>
                <Button variant='info' style={{ marginBottom: 20 }} size='sm'>Cargar Archivo CSV</Button>
            </InputFiles>
            <Button size='sm' style={{ marginBottom: 20 }} type='submit'>Guardar</Button>
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
        </Fragment>
    )
}