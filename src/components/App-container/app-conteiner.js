import React from 'react'
import PropTypes from 'prop-types'
import Search from '../Search/search'
import UserInfo from '../User-info/user-info'
import Actions from '../Actions/actions'
import Repos from '../Repos/repos'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const AppContent = ({
  userinfo,
  repos,
  starred,
  isFetching,
  handleSearch,
  getRepos,
  getStarred,
  show,
  error
}) => (
  <Container 
    className='app 
      bg-dark 
      text-white 
      w-100 
      min-vh-100 
      d-flex 
      flex-column 
      align-items-center 
      justify-content-center' fluid>

      <Row className="justify-content-center align-items-center w-75">
        <Search isDisabled={isFetching} handleSearch={handleSearch} />
      </Row>

      <Row className="justify-content-between w-75">

        <div className="col col-sm-12 col-md-5">
          {!!userinfo &&
            <UserInfo
              userinfo={userinfo}
              error={error}
            />
          }

          {!!userinfo && !error &&
            <Actions getRepos={getRepos} getStarred={getStarred} />
          }
        </div>

        {!!repos.length && (show == 'repos') && !error && 
          <div className="col col-sm-12 col-md-6">
            <Repos
              className='repos'
              title='Repositórios:'
              repos={repos}
            />
          </div>
        }

        {!!starred.length && (show == 'starred') && !error &&
          <div className="col col-sm-12 col-md-6">
              <Repos
                className='starred'
                title='Favoritos:'
                repos={starred}
              />
          </div>
        }

      </Row>

  </Container>
)

AppContent.propTypes = {
  userinfo: PropTypes.object,
  repos: PropTypes.array.isRequired,
  starred: PropTypes.array.isRequired,
  handleSearch: PropTypes.func.isRequired
}

export default AppContent
