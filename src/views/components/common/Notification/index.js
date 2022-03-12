import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'

import notificationActions from '../../../../services/store/actions/notification'
import notificationSelectors from '../../../../services/store/selectors/notification'

function TransitionRight(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide {...props} direction="right" />
}

function Notification() {
  const dispatch = useDispatch()
  const { show, type, message } = useSelector(
    notificationSelectors.selectNotification
  )

  function handleClose() {
    dispatch(notificationActions.hideNotification())
  }

  return (
    <Snackbar
      open={show}
      autoHideDuration={2000}
      onClose={handleClose}
      TransitionComponent={TransitionRight}
    >
      <Alert
        variant="filled"
        elevation={6}
        onClose={handleClose}
        severity={type || 'success'}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
