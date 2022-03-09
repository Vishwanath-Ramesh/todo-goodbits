import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  .errorboundary {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #cfcfcf;
    height: 100vh;
    width: 100%;
  }

  .errorboundary__container {
    display: flex;
    flex-direction: column;
    padding: 1em;
    min-width: 30%;
    width: 500px;
    min-height: 40%;
    height: 70%;
    background-color: #f3f3f3;
    overflow-y: auto;
  }

  .errorboundary__logo {
    align-self: center;
    padding: 1rem;
  }

  .errorboundary__header {
    display: flex;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .errorboundary__erroricon {
    margin-right: 0.5rem;
  }

  .errorboundary__header .MuiSvgIcon-root {
    color: #f56d4f;
  }

  .errorboundary__message {
    font-size: 1.2rem;
    font-weight: 400;
    padding: 0.8rem 0rem;
  }

  .errorboundary__details {
    font-weight: 600;
    border: 0px;
  }

  .errorboundary__summary {
    border: 1px solid grey;
    font-weight: normal;
    padding: 0.5rem;
    margin: 0.5rem 0rem;
    height: 100%;
    overflow-y: scroll;
  }

  .errorboundary__summary > summary {
    font-weight: 600;
  }

  .errorboundary__summary > p {
    margin: 0;
  }
`
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    const { error, errorInfo } = this.state
    const { children } = this.props

    if (errorInfo) {
      return (
        <Container className="errorboundary">
          <div className="errorboundary__container">
            <span className="errorboundary__logo">Logo</span>
            <span className="errorboundary__header">
              <span className="errorboundary__erroricon">X</span>
              <span className="errorboundary__title">Something went wrong</span>
            </span>
            <span className="errorboundary__message">
              {error && error.message}
            </span>
            <details
              open
              className="errorboundary__details"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              <div className="errorboundary__summary">
                <summary>{error && error.toString()}</summary>
                <p>{errorInfo.componentStack}</p>
              </div>
            </details>
          </div>
        </Container>
      )
    }

    return children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
}

export default ErrorBoundary
