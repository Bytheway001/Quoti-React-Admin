import React from 'react'
import { Switch, Route,Link } from 'react-router-dom';
import { API } from '../../utils';
import axios from 'axios';
import { Container, Col, Row, Table } from 'react-bootstrap'
import { List } from '../../Components/List';
import RegionShow from './RegionShow';
import RegionsEdit from './RegionsEdit';

class Regions extends React.Component {

    state = {
        regions: []
    }
    componentDidMount() {
        axios.get(API + 'regions').then(res => res.data)
            .then(result => {
                this.setState({
                    ...this.state,
                    regions: result.data
                })
            })
    }

    render() {
        return (
            <Container fluid>
                <Switch>
                    <Route exact path='/regions' render={() => <List data={this.state.regions} path='/regions' />}></Route>
                    <Route exact path='/regions/:id/edit' component={RegionsEdit}></Route>
                    <Route exact path='/regions/:id' component={RegionShow}></Route>
                    
                </Switch>
            </Container>
        )
    }
}

export default Regions