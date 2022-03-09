import React from 'react'

import ErrorBoundary from '../views/pages/ErrorBoundary'
import Routes from '../views/Routes/Routes'

const App = () => {
  return (
    <ErrorBoundary>
      <Routes />
    </ErrorBoundary>
  )
}

export default App
