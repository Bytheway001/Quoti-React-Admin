import React from 'react';
import Axios from 'axios';
import { API } from '../../utils';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { CrudTable } from './Table';
class CrudIndex extends React.Component{
    state={
        resource:[]
    }
    componentDidMount(){
        Axios.get(API+this.props.for).then(res=>res.data).then(result=>{this.setState({resource:result.data})})
    }
    render(){
        let headers= this.props.headers
        let headerkeys = Object.keys(headers)
        return(
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header className='text-center'>LISTADO</Card.Header>
                        <Card.Body>
                            <Button className='my-2' size='sm' as={Link} to={this.props.for+'/new'}>Nuevo</Button>
                           <CrudTable headers={headers} headerkeys={headerkeys} for={this.props.for} resource={this.state.resource}></CrudTable>
                        </Card.Body>
                    </Card>
          
                </Col>
            </Row>
        )
    }
}

export default CrudIndex;