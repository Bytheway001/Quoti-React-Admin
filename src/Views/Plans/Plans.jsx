import React from 'react';
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import PlanShow from './PlanShow';
import PlansEdit from './PlansEdit';
import PlansNew from './PlansNew';
import CrudIndex from '../crud/Index';
import { getRegionList } from '../../ducks/regions';
import { connect } from 'react-redux';

const Plans = (props) => {
    const headers = [
        { name: 'ID', value: (e) => e.id, filter: false },
        { name: 'Region', value: (e) => e.region, filter: 'region' },
        { name: 'Nombre', value: (e) => e.name, filter: 'name' }
    ]

    return (
        <Container fluid>
            <Switch>
                <Route exact path='/plans' render={() => <CrudIndex headers={headers} for='plans' />}></Route>
                <Route exact path='/plans/:id/edit' component={PlansEdit} ></Route>
                <Route exact path='/plans/new' render={() => <PlansNew {...props} />}></Route>
                <Route exact path='/plans/:id' component={PlanShow}></Route>
            </Switch>
        </Container>
    )
}

const mapStateToProps = state => ({

    regions: state.regions,

})


const mapDispatchToProps = dispatch => ({
    getRegionList: () => dispatch(getRegionList()),

})
export default connect(mapStateToProps, mapDispatchToProps)(Plans);