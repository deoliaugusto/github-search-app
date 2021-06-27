import React from 'react'
import Button from 'react-bootstrap/Button'
import './actions.scss'

const Actions = ({ getRepos, getStarred }) => (
  <div className="actions-component">

    <Button className='bg-primary text-white active' onClick={getRepos}>Repositórios</Button>
    <Button className='bg-warning text-dark active' onClick={getStarred}>Favoritos</Button>

  </div>
)

export default Actions
