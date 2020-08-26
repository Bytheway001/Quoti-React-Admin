import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl, Container, Row, Col } from 'react-bootstrap'
import Users from './Views/Users/Users';
import Plans from './Views/Plans/Plans';
import './application.scss'
import Regions from './Views/Regions/Regions';

import Files from './Views/Files/Files';




class App extends React.Component {
  render() {
    return (
      <BasicLayout>
        <Switch>
          <Route path='/users' component={() => <Users />} />
          <Route path='/regions' component={() => <Regions />} />
          <Route path='/files' component={() => <Files />} />
          <Route path='/plans' component={() => <Plans />} />
        </Switch>
      </BasicLayout>

    )
  }
}

const Sidebar = (props) => (
  <div className='sidebar'>
    <ul>
      <li><Link to='/users'>Usuarios</Link></li>
      <li><Link to='/files'>Documentos</Link></li>
      <li><Link to='/regions'>Regiones</Link></li>
      <li><Link to='/plans'>Planes</Link></li>
      <li><Link to='/companies'>Compañias</Link></li>
    </ul>
  </div>
)

const TopBar = () => (
  <Navbar>
    <Navbar.Brand href="#">Admin Tool</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link href="#home">Test user</Nav.Link>
        <Nav.Link href="#link">Avatar</Nav.Link>

      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

const BasicLayout = (props) => (
  <Container className='p-0 h-100' fluid>
    <Row noGutters>
      <Col sm={2}>
        <Sidebar className='h-100' />
      </Col>
      <Col sm={10}>
        <TopBar />
        <div style={{ paddingTop: 50 }}>
          {props.children}
        </div>
      </Col>
    </Row>
  </Container>



)

export default App;
