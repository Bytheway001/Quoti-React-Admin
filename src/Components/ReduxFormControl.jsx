import React from 'react';
import { FormControl } from 'react-bootstrap';
import {Field} from 'redux-form'
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
const CustomField = ({ input, meta, ...props }) => {
    return <FormControl {...props} {...input} />
};

const CustomChecbox = ({input,meta,...props})=>{
    return <BootstrapSwitchButton {...props} {...input}/>
}

export const ReduxFormControl = (props) => (
    <Field {...props} component={CustomField} />
)

export const ReduxCheckbox = (props)=>(
    <Field {...props} component={CustomChecbox}/>
)
