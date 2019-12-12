import React from 'react';
import Axios from 'axios';
import { API } from '../../utils';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
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
                            <Table size='sm'>
                                <thead>
                                    <tr>
                                        {headerkeys.map((key,index)=><td key={index}>{headers[key]}</td>)}
                                        <td colSpan={3}>ACCIONES</td>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        this.state.resource.map((element,index)=>{
                                            return(
                                                <tr key={index}>
                                                    {
                                                        headerkeys.map((key,index)=>{
                                                            return(
                                                                <td key={key}>{element[key]}</td>
                                                            )
                                                        })
                                                    }
                                                    <td><Link to={'/'+this.props.for+'/'+element.id}>Ver</Link></td>
                                                    <td><Link to={'/'+this.props.for+'/'+element.id+'/edit'}>Editar</Link></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
          
                </Col>
            </Row>
        )
    }
}

export default CrudIndex;