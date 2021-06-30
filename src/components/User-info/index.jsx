import React from 'react';
import { PropTypes } from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Figure from 'react-bootstrap/Figure';

const UserInfo = ({ userinfo, error }) => (
  <div>
    <Figure>
      {!error && (
        <Figure.Image
          alt={userinfo.username}
          src={userinfo.photo}
          className="img-fluid rounded border border-secondary"
        />
      )}
      <Figure.Caption className="bg-secondary p-2">
        <h4 className="text-white">{userinfo.username}</h4>
      </Figure.Caption>
    </Figure>

    {!error && (
      <ListGroup className="mb-3" variant="flush">
        <ListGroup.Item className="bg-dark text-white p-0 py-1">
          Repositórios: {userinfo.repos}
        </ListGroup.Item>
        <ListGroup.Item className="bg-dark text-white p-0 py-1">
          Seguidores: {userinfo.followers}
        </ListGroup.Item>
        <ListGroup.Item className="bg-dark text-white p-0 py-1">
          Seguindo: {userinfo.following}
        </ListGroup.Item>
      </ListGroup>
    )}
  </div>
);

UserInfo.propTypes = {
  userinfo: PropTypes.object,
};

export default UserInfo;
