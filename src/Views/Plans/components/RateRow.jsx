import React, { Fragment } from 'react';
import { FormControl, Button } from 'react-bootstrap'
import { useState } from 'react';
export const RateRow = ({ deductibles, updateRates, rate, index, isNew }) => {
    const [rateGroup,setRateGroup]=useState();


    const setMinAge = (value)=>{
        rate = rateGroup.filter(x=>x.min_age!==value);
        console.log(rate);
    }
    
    return (
        <tr style={{ color: 'black' }}>

            <td>
                <FormControl size='sm' min={0} max={99} type='number' onChange={({target})=>setMinAge(target.value)} />
            </td>
            <td className='col-right'>
                <FormControl size='sm' min={0} max={99} type='number' />
            </td>
            {deductibles.map(x =>
                <Fragment>
                    <th> <FormControl size='sm' min={0} type='number' /></th>
                    <th className='col-right'> <FormControl size='sm' min={0} type='number' /></th>
                </Fragment>
            )}
            <td><Button variant='success' onClick={sendRate}>Agregar</Button></td>
        </tr>
    )
}

