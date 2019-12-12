import React,{Fragment} from 'react';
import {Table, FormControl, Button } from 'react-bootstrap';
export const PlanTab = (props) => {
    let {plan,regions} = props
    return (
        <Fragment>
            <Button size='sm' variant='success' className='my-2' type='submit'>Guardar</Button>
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
                            <FormControl size='sm' name='name' value={plan.name} onChange={props.handleMainChange} />
                        </th>
                        <th>
                            <FormControl name='company_id' size='sm' as='select' value={plan.company_id} onChange={props.handleMainChange}>
                                <option disabled value="">Seleccione...</option>
                                <option value='1'>Allianz Care</option>
                                <option value='2'>Vumi Group</option>
                                <option value='3'>Best Doctors Insurance</option>
                                <option value='5'>Bupa Salud</option>
                                <option value='6'>BMI</option>
                            </FormControl>
                        </th>
                        <th>
                            <FormControl size='sm' name='region_id' as='select' value={plan.region_id} onChange={props.handleMainChange}>
                                <option disabled value="">Seleccione...</option>
                                {regions.filter(x => x.company_id == plan.company_id).map((region, k) => {
                                    return (<option key={k} value={region.id}>{region.name}</option>)
                                })}
                            </FormControl>
                        </th>
                        <th>{plan.plan_type}</th>
                        <th>
                            <FormControl name='enabled' size='sm' as='select' value={plan.enabled} onChange={props.handleMainChange}>
                                <option value='1'>Activo</option>
                                <option value='0'>Inactivo</option>
                            </FormControl>
                        </th>
                    </tr>
                </tbody>
            </Table>
            </Fragment>
    )

}
