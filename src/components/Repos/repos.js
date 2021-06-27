import React from 'react'
import {PropTypes} from 'prop-types'
import ListGroup from 'react-bootstrap/ListGroup'

const Repos = ({className, title, repos}) => (
  <div className={className}>
    <h2>{title}</h2>
    <ListGroup variant="flush">
      {repos.map((repo, index) => (
        <ListGroup.Item className='bg-dark pl-0' key={index}>
          <a className='text-white text-truncate d-block' href={repo.link}>{repo.name}</a>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
)

Repos.defaultProps = {
  className: ''
}

Repos.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  repos: PropTypes.array
}

export default Repos
