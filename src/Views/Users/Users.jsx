import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap'
import Form from './Form';
import List from './List';
import { getUserList, getUserInfo, clearUserInfo, createUser, updateUser, deleteUser } from '../../ducks/user';
import { connect } from 'react-redux';
import { getRegionList } from '../../ducks/regions';
import { getCountryList } from '../../ducks/countries';

export const Users = (props) => {
    return (
        <Container fluid style={{ marginTop: 30 }}>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Switch>
                                <Route exact path='/users' render={(matchProps) => <List {...props} />} />
                                <Route exact path='/users/new' render={(matchProps) => <Form {...props} />} />
                                <Route exact path='/users/:id/edit' render={(matchProps) => <Form {...props} {...matchProps} />} />
                            </Switch>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    users: state.users,
    regions: state.regions,
    countries: state.countries
})

const mapDispatchToProps = dispatch => ({
    getUserList: () => dispatch(getUserList()),
    getRegionList: () => dispatch(getRegionList()),
    getCountryList: () => dispatch(getCountryList()),
    getUserInfo: (id) => dispatch(getUserInfo(id)),
    clearUserInfo: () => dispatch(clearUserInfo()),
    createUser: (email, first_name,last_name, role, enabled,license, regions, countries) => dispatch(createUser(email, first_name,last_name, role, enabled,license, regions, countries)),
    updateUser: (id, email, first_name, last_name, role, enabled, license, regions, countries) => dispatch(updateUser(id, email, first_name, last_name, role, enabled, license, regions, countries)),
    deleteUser: (id) => dispatch(deleteUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
