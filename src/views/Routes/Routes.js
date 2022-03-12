import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import NavBar from '../components/common/NavBar'

import Spinner from '../components/common/Spinner'

const PageNotFound = lazy(() => import('../pages/PageNotFound'))
const Tags = lazy(() => import('../pages/Tags'))
const Home = lazy(() => import('../pages/Home'))

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner show />}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/tags" component={Tags} />
          <Route path="/404" component={PageNotFound} />
          <Redirect to="/404" />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default Routes
