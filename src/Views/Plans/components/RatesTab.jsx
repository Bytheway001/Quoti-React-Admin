import React, { Fragment } from 'react';
import InputFiles from 'react-input-files';
import { Button, Tabs, Tab, Table, FormControl } from 'react-bootstrap'

export const RatesTab = ({ rates, onRateChange }) => {
    const deductiblesInUsa = [...new Set(rates.map(rate => rate.deductible))];
    const deductiblesOutUsa = [...new Set(rates.map(rate => rate.deductible_out))];
    const minAges = [...new Set(rates.map(rate => rate.min_age))];
    const maxAges = [...new Set(rates.map(rate => rate.max_age))];
    const findRate = (min, max, ded) => {
        let r = rates.find(x => x.min_age === min && x.max_age === max && x.deductible === ded);
        if (r) {
            return r
        }
        else {
            return "--"
        }
    }



    return (
        <Fragment>

            <Table size='sm' variant='bordered'>
                <thead>

                    <tr >
                        <th style={{ width: '20%' }}>Deducible (World)</th>
                        {deductiblesOutUsa.map((d, k) => (
                            <th key={k} colSpan={2}>{d}</th>
                        ))}
                    </tr>
                    <tr>
                        <th>Deducible (USA)</th>
                        {deductiblesInUsa.map((d, k) => (
                            <th key={k} colSpan={2}>{d}</th>
                        ))}


                    </tr>

                    <tr>
                        <th>Edad</th>
                        {deductiblesOutUsa.map((d, k) => (
                            <Fragment key={k}>
                                <th >Semestral</th>
                                <th >Anual</th>
                            </Fragment>
                        ))}
                    </tr>
                    {
                        minAges.map((age, key) => (
                            <tr key={key}>
                                <th>{age + '-' + maxAges[key]}</th>
                                {
                                    deductiblesInUsa.map((ded, kk) => {
                                        let rate = findRate(age, maxAges[key], ded)
                                       
                                        return (
                                            <Fragment>
                                                <td><FormControl style={{color:rate.eby?'white':'black',background:rate.eby?"red":"white"}} size='sm' value={rate.biyearly_price} onChange={({ target }) => onRateChange(rate.id, target.value,'biyearly')} /></td>
                                                <td><FormControl style={{color:rate.ey?'white':'black',background:rate.ey?"red":"white"}} size='sm' value={rate.yearly_price} onChange={({ target }) => onRateChange(rate.id, target.value,'yearly')} /></td>
                                            </Fragment>
                                        )
                                    })
                                }
                            </tr>
                        ))
                    }
                </thead>

            </Table>

        </Fragment>
    )
}