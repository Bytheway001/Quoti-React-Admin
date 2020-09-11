import React, { Fragment } from 'react';
import { Table, FormControl } from 'react-bootstrap';

/* Converts a long string into paragraphs */
function linearize(string) {
    let result = string.split('\\').map(x => (
        <p className='m-0'>{x}</p>
    ))
    return result;
}

export const BenefitsTab = ({ benefits }) => {
  
    const list = [...new Set(benefits.map(benefit => benefit.name))]

    return (
        <Fragment>
            <Table size='sm' variant='bordered'>
                <thead>
                    <tr>
                        <th style={{ width: '50%' }}>Beneficio</th>
                        <th>Descripcion</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((benefitName, key) => (
                        <tr>
                            <th>{benefitName}</th>
                            <td>
                                <FormControl className='table-form-control' as='textarea' autosize={true} style={{whiteSpace:'pre-line'}}>
                                    {
                                        benefits.find(x => x.name === benefitName).description
                                    }
                                </FormControl>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Fragment>
    )
}
