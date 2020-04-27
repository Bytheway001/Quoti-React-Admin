import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { Container} from 'react-bootstrap'
import { getUserList, getUserInfo, clearUserInfo, createUser, updateUser, deleteUser } from '../../ducks/user';
import { connect } from 'react-redux';
import { getRegionList } from '../../ducks/regions';
import { getCountryList } from '../../ducks/countries';
import CrudIndex from '../crud/Index';
import { NewUser } from './NewUser';
import UserForm from './Form';
import { UserShow } from './Show';

const Users = (props) => {
    const headers = [
        { name: 'ID', value: (e) => e.id, filter: 'id' },
        { name: 'email', value: (e) => e.email, filter: 'email' },
        { name: 'Nombre(s)', value: (e) => e.first_name, filter: 'first_name' },
        { name: "Apellidos(s)", value: (e) => e.last_name, filter: 'last_name' },
        { name: "Rol", value: (e) => e.role, filter: 'role' },

    ]

    return (
        <Container fluid style={{ marginTop: 30 }}>
            <Switch>
                <Route exact path='/users' render={(matchProps) => <CrudIndex headers={headers} for='users' />} />
                <Route exact path='/users/new' render={(matchProps) => <NewUser />} />
                <Route exact path='/users/:id' render={(matchProps)=><UserShow {...props} id={matchProps.match.params.id}/>}/>
                <Route exact path='/users/:id/edit' render={(matchProps) => <UserForm id={matchProps.match.params.id} getUserInfo={props.getUserInfo} />} />
            </Switch>
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
    createUser: (email, first_name, last_name, role, enabled, license, regions, countries) => dispatch(createUser(email, first_name, last_name, role, enabled, license, regions, countries)),
    updateUser: (id, email, first_name, last_name, role, enabled, license, regions, countries) => dispatch(updateUser(id, email, first_name, last_name, role, enabled, license, regions, countries)),
    deleteUser: (id) => dispatch(deleteUser(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
