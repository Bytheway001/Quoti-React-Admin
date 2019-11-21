import React from 'react';
import Axios from 'axios';
import { API, APIHEADERS } from '../../utils';
import { Row, Col, Table, Container, Card, Button } from 'react-bootstrap';
import { Link, Switch, Route } from 'react-router-dom';
import PlanShow from './PlanShow';
import PlansEdit from './PlansEdit';
import PlansNew from './PlansNew';
import CrudIndex from '../crud/Index';

class Plans extends React.Component {
    headers={
        id:'ID',
        region:'REGION',
        name:'NOMBRE',
        plan_type:'TIPO DE PLAN',
        enabled:'ACTIVO?'
    }
    render() {
        return (
            <Container fluid>
                <Switch>
                    <Route exact path='/plans' render={() => <CrudIndex headers={this.headers} for='plans' />}></Route>
                    <Route exact path='/plans/:id/edit' component={PlansEdit} ></Route>
                    <Route exact path='/plans/new' component={PlansNew}></Route>
                    <Route exact path='/plans/:id' component={PlanShow}></Route>
                </Switch>
            </Container>
        )
    }
}
export default Plans