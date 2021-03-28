// App.js
import React from 'react'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Room from './pages/Room'
import { AuthProvider } from './AuthService'
import LoggedInRoute from './LoggedInRoute'

import { BrowserRouter as Roter, Switch, Route } from "react-router-dom"

const App = () => {
  return (
    <AuthProvider>
      <Roter>
        <Switch>

          <LoggedInRoute exact path="/" component={Room} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Roter>
    </AuthProvider>
  )
}

export default App
