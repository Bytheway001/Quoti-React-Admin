import React from 'react';
import { Container } from 'react-bootstrap';
import {Switch,Route} from 'react-router-dom';
import CrudIndex from '../crud/Index';
import FileEdit from './Edit';
import FileNew from './New';

class Files extends React.Component{
    headers=[
        {name:'ID',value:(e)=>e.id,filter:false},
        {name:'Año',value:(e)=>e.year,filter:'year'},
        {name:'Idioma',value:(e)=>e.lang,filter:'lang'},
        {name:"Compañia",value:(e)=>e.company,filter:'company'},
        {name:"Nombre",value:(e)=>e.file_desc,filter:false}
        
    ]
    /*
    headers={
        id:'ID',
        company:'COMPAÑIA',
        file_desc:'NOMBRE',
        year:'AÑO',
        lang:'IDIOMA'
    }
    */
    render(){
       return(
        <Container fluid>
        <Switch>
            <Route exact path='/files' render={() => <CrudIndex headers={this.headers} for='files'/>}></Route>
            <Route path='/files/:id/edit' component={FileEdit}/>
            <Route path='/files/new' render={(props)=><FileNew {...props}/>}/>
        </Switch>
    </Container>
       )

    }
}

export default Files;