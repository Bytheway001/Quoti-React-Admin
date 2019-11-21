import React from 'react';
import {Route,Switch} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import CrudIndex from './Index';
const ListHeaders={
    users:{},
    regions:{id:'ID',name:'NOMBRE'},
    files:{id:'ID',category:'BENEFICIOS',file_desc:'NOMBRE',year:'AÑO',lang:'IDIOMA',company:'COMPAÑIA'}
}

class CrudContainer extends React.Component {
    render() {
        return (
            <Container fluid>
                <Switch>
                    <Route exact path={'/'+this.props.for} render={()=><CrudIndex for={this.props.for} headers={ListHeaders[this.props.for]}/>}/>
                    <Route exact path={'/'+this.props.for+'/:id/edit'} render={this.props.edit}/>
                    <Route exact path={'/'+this.props.for+'/:id/new'} component={this.props.new}/>
                    <Route exact path={'/'+this.props.for+'/:id'} component={this.props.show}/>
                </Switch>
            </Container>
        )
    }
}


export default CrudContainer