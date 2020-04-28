import React, { Fragment,  useState } from 'react';
import { FormControl, Button } from 'react-bootstrap'

export const RateRow = ({ deductibles, addRates }) => {
    const [min_age, setMinAge] = useState("");
    const [max_age, setMaxAge] = useState("");
    const [rates, setRates] = useState([]);

    const handleMinAgeChange = (value) => {
        rates.forEach((e) => e.min_age = value);
        setMinAge(value)
    }

    const handleMaxAgeChange = (value) => {
        rates.forEach((e) => e.max_age = value);
        setMaxAge(value)
    }

    const setYearlyRate = (deductible, min_age, max_age, value) => {

        let r = rates.find(r => r.min_age === min_age && r.max_age === max_age && r.deductible === deductible.in)
        if (r) {

            console.log(r)
            r.yearly_price = value
        }
        else {
          
            rates.push({ min_age, max_age, deductible: deductible.in, yearly_price: value })
        }
        setRates([...rates])

    }
    const setBiyearlyRate = (deductible, min_age, max_age, value) => {
        let r = rates.find(r => r.min_age === min_age && r.max_age === max_age && r.deductible === deductible.in)
        if (r) {

            r.biyearly_price = value
        }
        else {
            console.log('Rate not found')
            rates.push({ min_age, max_age, deductible: deductible.in, biyearly_price: value })
        }
        setRates([...rates])
    }




    return (
        <tr style={{ color: 'black' }}>

            <td>
                <FormControl size='sm' min={0} max={99} type='number' onChange={({ target }) => handleMinAgeChange(target.value)} />
            </td>
            <td className='col-right'>
                <FormControl size='sm' min={0} max={99} type='number' onChange={({ target }) => handleMaxAgeChange(target.value)} />
            </td>
            {deductibles.map(x =>
                <Fragment>
                    <th> <FormControl size='sm' min={0} type='number' onChange={({ target }) => setYearlyRate(x, min_age, max_age, target.value)} /></th>
                    <th className='col-right'> <FormControl size='sm' onChange={({ target }) => setBiyearlyRate(x, min_age, max_age, target.value)} min={0} type='number' /></th>
                </Fragment>
            )}
            <td><Button variant='success' onClick={() => addRates(rates)}>Agregar</Button></td>
        </tr>
    )
}

export const RateSetRow = ({ deductibles, rate }) => {

    return (
        <tr style={{ color: 'black' }}>

            <td>
                {rate[0].min_age}
            </td>
            <td className='col-right'>
                {rate[0].max_age}
            </td>
            {deductibles.map(x => {
                var obj = rate.find(r => r.deductible === x.in)
                return (
                    <Fragment>
                        <th>{obj.yearly_price} </th>
                        <th className='col-right'>{obj.biyearly_price}</th>
                    </Fragment>
                )

            }

            )}
            <td></td>
        </tr>
    )
}
