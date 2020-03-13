import React from 'react';
import { Row, Col, ListGroup, ListGroupItem, Card, Form, FormLabel, FormGroup, FormControl, FormCheck, Button } from 'react-bootstrap';
import Axios from 'axios';
import { API, APIHEADERS } from '../../utils';
import PropTypes from 'prop-types';
import UserForm from './Form';
class UserEdit extends React.Component {
    state = {
        user: null
    }
    componentDidMount() {
        Axios.get(API + 'users/' + this.props.match.params.id, { headers: APIHEADERS }).then(res => res.data)
            .then(result => {
                this.setState({
                    ...this.state,
                    user: result.data
                })
            })
    }
    render() {
        let user = this.state.user
        return (
            null
            /*
            <Row>
                {user ?
                    <React.Fragment>
                        <Col sm={12}>
                            <h3 className="text-center">Editar Usuario</h3>
                        </Col>
                        <Col sm={12}>
                            <UserForm user={user} />
                        </Col>
                    </React.Fragment>
                    : null
                }
            </Row>

*/

        )
    }
}



export default UserEdit

