import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faEdit, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const TableActions = (props) => (
    <td>
        <ButtonGroup className='w-100'>
            <Button variant='success' size='sm' as={Link} to={props.resource + '/' + props.id}><FontAwesomeIcon icon={faEye} /></Button>
            <Button variant='info' size='sm' as={Link} to={props.resource + '/' + props.id + '/edit'}><FontAwesomeIcon icon={faEdit} /></Button>
            <Button variant='danger' onClick={()=>props.onDelete(props.id)} size='sm'><FontAwesomeIcon icon={faTimes} /></Button>
        </ButtonGroup>
    </td>
)