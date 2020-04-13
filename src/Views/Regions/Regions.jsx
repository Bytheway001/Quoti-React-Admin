import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { API } from '../../utils';
import axios from 'axios';
import { Container } from 'react-bootstrap'
import { List } from '../../Components/List';
import RegionShow from './RegionShow';
import RegionsEdit from './RegionsEdit';
import CrudIndex from '../crud/Index';


const Regions = props =>{
    const headers = [
        {name: 'ID',value: (e) => e.id,filter:'id'},
        {name:'Company',value:(e)=>e.company,filter:'company'},
        {name:'Nombre',value:(e)=>e.name,filter:'name'},

        
    ]

    return (
        <Container fluid>
            <Switch>
                <Route exact path='/regions' render={() => <CrudIndex headers={headers} for='regions' />}></Route>
                <Route exact path='/regions/:id/edit' component={RegionsEdit}></Route>
                <Route exact path='/regions/:id' component={RegionShow}></Route>
                
            </Switch>
        </Container>
    )


}

export default Regions