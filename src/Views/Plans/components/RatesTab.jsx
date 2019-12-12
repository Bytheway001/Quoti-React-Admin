import React,{ Fragment } from 'react';
import InputFiles from 'react-input-files';
import {Button,Tabs,Tab,Table,FormControl} from 'react-bootstrap'
export const RatesTab = props => {
    let {plan,handleRateCSVUpload,createNewDeductible,handleRateChange,destroyRate}=props
    return (
        <Fragment>
            <InputFiles onChange={handleRateCSVUpload} accept='.csv'>
                <Button variant='info' style={{ marginBottom: 20 }} size='sm'>Cargar Archivo CSV</Button>
            </InputFiles>
            <Button size='sm' style={{ marginBottom: 20 }} type='submit'>Guardar</Button>
            <Tabs className='nav-justified' onSelect={createNewDeductible}>
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
                                                        <td><FormControl name='min_age' data-rate-id={rate.id} value={rate.min_age} size='sm' type='number' onChange={handleRateChange} /></td>
                                                        <td><FormControl name='max_age' data-rate-id={rate.id} value={rate.max_age} size='sm' type='number' onChange={handleRateChange} /></td>
                                                        <td><FormControl name='yearly_price' data-rate-id={rate.id} value={rate.yearly_price} size='sm' type='number' onChange={handleRateChange} /></td>
                                                        <td><FormControl name='biyearly_price' data-rate-id={rate.id} value={rate.biyearly_price?rate.biyearly_price:0} size='sm' type='number' onChange={handleRateChange} /></td>
                                                        <td><Button block data-id={rate.id} onClick={destroyRate} size='sm'>Remove</Button></td>
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
        </Fragment>
    )
}