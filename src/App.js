import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Users from './Views/Users/Users';
import Plans from './Views/Plans/Plans';
import './application.scss'
import Regions from './Views/Regions/Regions';

import Files from './Views/Files/Files';
const styles = {
  sidebar: {
    flex: 1,

   


  },
  page: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    maxHeight: '100vh',
    minHeight: '100vh',
  },
  content: {
    padding: 20,
    flex: 5,
    overflowY: 'scroll'

  }
}



class App extends React.Component {
  render() {
    return (
      <BasicLayout>
        <Switch>
          <Route path='/users' component={()=><Users/>} />
          <Route path='/regions' component={() => <Regions />} />
          <Route path='/files' component={() => <Files />} />
          <Route path='/plans' component={() => <Plans />} />
        </Switch>
      </BasicLayout>

    )
  }
}

const Sidebar = (props) => (
  <div style={styles.sidebar} className='sidebar'>
    <ul>
      <li><Link to='/users'>Usuarios</Link></li>
      <li><Link to='/files'>Documentos</Link></li>
      <li><Link to='/regions'>Regiones</Link></li>
      <li><Link to='/plans'>Planes</Link></li>
      <li><Link to='/companies'>Compañias</Link></li>
    </ul>
  </div>
)

const BasicLayout = (props) => (
  <div style={styles.page}>
    <Sidebar />
    <div style={styles.content}>
      {props.children}
    </div>
  </div>

)

export default App;
