import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Spinner from '../components/common/Spinner'

const PageNotFound = lazy(() => import('../pages/PageNotFound'))
const Home = lazy(() => import('../pages/Home'))

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner show />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/404" component={PageNotFound} />
          <Redirect to="/404" />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default Routes
