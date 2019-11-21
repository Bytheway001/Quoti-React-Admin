import React from 'react';
import { Container } from 'react-bootstrap';
import {Switch,Route} from 'react-router-dom';
import CrudIndex from '../crud/Index';
import FileEdit from './Edit';
import FileNew from './New';

class Files extends React.Component{
    headers={
        id:'ID',
        company:'COMPAÑIA',
        file_desc:'NOMBRE',
        year:'AÑO',
        lang:'IDIOMA'
    }
    render(){
       return(
        <Container fluid>
        <Switch>
            <Route exact path='/files' render={() => <CrudIndex headers={this.headers} for='files'/>}></Route>
            <Route path='/files/:id/edit' component={FileEdit}/>
            <Route path='/files/new' component={FileNew}/>
        </Switch>
    </Container>
       )

    }
}

export default Files;