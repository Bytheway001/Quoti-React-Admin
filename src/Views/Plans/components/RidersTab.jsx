import React from 'react';
import {Tabs,Tab,Table,FormCheck} from 'react-bootstrap';
export const RidersTab = props => {
    let {plan,handleEndosoConfigChange,createNewEndoso}= props
    return (
        <Tabs className='nav-justified' onSelect={createNewEndoso}>
            {
                plan.endosos.map((endoso, k) => {
                    return (
                        <Tab key={k} eventKey={'endoso_' + k} style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} title={endoso.name}>
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
                                    {endoso.endoso_configs.map((ec, k) => {
                                        return (
                                            <tr key={k}>
                                                <td>{ec.deductible}</td>
                                                <td><FormCheck name='avaliable' data-endoso={endoso.id} data-id={ec.id} checked={ec.avaliable === 1} onClick={handleEndosoConfigChange} /></td>
                                                <td><FormCheck name='selected' data-endoso={endoso.id} data-id={ec.id} checked={ec.selected === 1} onClick={handleEndosoConfigChange} /></td>
                                                <td><FormCheck name='included' data-endoso={endoso.id} data-id={ec.id} checked={ec.included === 1} onClick={handleEndosoConfigChange} /></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>

                            </Table>
                        </Tab>
                    )
                })
            }
            <Tab eventKey='newEndoso' style={{ border: '#4E5D6C 1px solid', borderTop: 'none', padding: 20 }} title={'+'} />
        </Tabs>
    )
}