import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import  CrudTable  from './Table';
import { useEffect } from 'react';
import { crudList } from '../../ducks/crud';
import { connect } from 'react-redux';


const CrudIndex = ({ headers, resourceName,getList,list }) => {

    useEffect(() => {
        getList(resourceName);

    }, [getList,resourceName])
    let headerKeys = Object.keys(headers)
    return (
        <Row id='crudIndex'>
            <Col sm={12}>
                <Card>
                    <Card.Header className='text-center'>LISTADO</Card.Header>
                    <Card.Body>
                        <Button className='my-2' size='sm' as={Link} to={resourceName}>Nuevo</Button>
                        <CrudTable headers={headers} headerkeys={headerKeys} resourceName={resourceName} resourceList={list}></CrudTable>
                    </Card.Body>
                </Card>

            </Col>
        </Row>
    )
}

const mapStateToProps = state => (
    {   
        list:state.crud.list
    }
)

const mapDispatchToProps = dispatch => (
    {
        getList:(resourceName)=>dispatch(crudList(resourceName))
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(CrudIndex);