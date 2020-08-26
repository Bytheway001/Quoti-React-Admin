import React from 'react';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CrudTable from './Table';
import { useEffect } from 'react';
import { crudList } from '../../ducks/crud';
import { connect } from 'react-redux';

const CrudIndex = ({ headers, resourceName, getList, list, loading }) => {
    useEffect(() => {
        getList(resourceName);

    }, [getList, resourceName])
    let headerKeys = Object.keys(headers)
    return (
        <Row id='crudIndex'>
            <Col sm={12}>
                <Button className='my-2' size='sm' as={Link} to={'/' + resourceName + '/new'}>Nuevo</Button>
                {
                    !loading ?
                        <CrudTable headers={headers} headerkeys={headerKeys} resourceName={resourceName} resourceList={list}></CrudTable>
                        :
                        <Row>
                            <Col sm={12} className='text-center'>
                                <Spinner animation='border' />
                            </Col>

                        </Row>

                }
            </Col>
        </Row>
    )
}

const mapStateToProps = state => (
    {
        list: state.crud.list,
        loading: state.crud.loading,
    }
)

const mapDispatchToProps = dispatch => (
    {
        getList: (resourceName) => dispatch(crudList(resourceName))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(CrudIndex);