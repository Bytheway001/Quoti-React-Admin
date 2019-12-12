import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
<<<<<<< Updated upstream

ReactDOM.render(<App />, document.getElementById('root'));
=======
import { BrowserRouter as Router } from 'react-router-dom'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './ducks/user';
import RegionReducer from './ducks/regions';
import CountryReducer from './ducks/countries';
import { reducer as formReducer } from 'redux-form'
const middleware = [thunk];
const rootReducer = combineReducers({
    users: userReducer,
    regions:RegionReducer,
    countries:CountryReducer,
    form:formReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    ,
    document.getElementById('root'));
>>>>>>> Stashed changes

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
