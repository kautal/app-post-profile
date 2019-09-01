import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import App from './App'
import AddEmployee from './pages/AddEmployee'
import EditEmployee from './pages/EditEmployee'
import Login from './pages/Login'
import * as serviceWorker from './serviceWorker'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

const components = (
    <BrowserRouter>
        <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/' exact component={App} />
            <Route path='/tambah' component={AddEmployee} />
            <Route path='/edit/:id' component={EditEmployee} />
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(components, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
