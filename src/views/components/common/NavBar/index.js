import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  h1 {
    display: inline-block;
  }

  nav {
    display: inline-block;

    a {
      text-decoration: none;
      margin: 0px 2rem;
    }
  }
`
function NavBar() {
  return (
    <Container>
      <h1>Todo List</h1>
      <nav>
        <NavLink to="/">Todos</NavLink>
        <NavLink to="/tags">Tags</NavLink>
      </nav>
      <hr />
    </Container>
  )
}

export default NavBar
