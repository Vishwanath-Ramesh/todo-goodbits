import React from 'react'

import Notification from '../views/components/common/Notification'
import ErrorBoundary from '../views/pages/ErrorBoundary'
import Routes from '../views/Routes/Routes'

const App = () => {
  return (
    <ErrorBoundary>
      <Routes />
      <Notification />
    </ErrorBoundary>
  )
}

export default App
