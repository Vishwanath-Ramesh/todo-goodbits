import React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import PropTypes from 'prop-types'

function Spinner({ show }) {
  return (
    <Backdrop
      sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={show}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

Spinner.defaultProps = {
  show: false,
}

Spinner.propTypes = {
  show: PropTypes.bool,
}

export default Spinner
