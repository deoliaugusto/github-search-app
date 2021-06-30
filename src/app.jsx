import React, { useReducer } from 'react';
import AppContent from './components/App-container';
import { searchUser } from './Utils/search-user';
import { getGitHubApiUrl } from './Utils/search-user';

export const App = () => {
  const userinfoInitialState = {
    userinfo: null,
    repos: [],
    starred: [],
    isFetching: false,
    show: null,
    error: null,
  };

  const userMergeState = (state, action) => {
    switch (action.type) {
      case 'fetchSuccess': {
        return {
          ...state,
          ...action.payload,
        };
      }
      case 'fetchError': {
        return {
          ...state,
          userInfo: action.payload.userinfo,
          error: action.payload.error,
        };
      }
      case 'isFetching': {
        return {
          ...state,
          isFetching: action.payload,
        };
      }
      case 'updateRepo': {
        const repotype = action.payload.show;
        return {
          ...state,
          [repotype]: action.payload[repotype],
          show: action.payload.show,
        };
      }
      default:
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(userMergeState, userinfoInitialState);

  const handleSearch = (e) => {
    let value = e.target.value;
    let keyCode = e.which || e.keyCode;
    let target = e.target;
    const ENTER = 13;

    if (keyCode === ENTER) {
      dispatch({ type: 'isFetching', payload: true });
      target.disabled = true;
      searchUser(getGitHubApiUrl(value))
        .then((result) => {
          dispatch({
            type: 'fetchSuccess',
            payload: {
              userinfo: {
                username: result.name,
                photo: result.avatar_url,
                login: result.login,
                url: result.url,
                repos: result.public_repos,
                followers: result.followers,
                following: result.following,
              },
              repos: [],
              starred: [],
              error: false,
            },
          });
        })
        .catch((error) => {
          dispatch({
            type: 'fechtError',
            payload: {
              userinfo: {
                username: error.message,
              },
              error: true,
            },
          });
        })
        .then(() => {
          dispatch({ type: 'isFetching', payload: false });
        });
    }
  };

  const getRepos = (repoType) => {
    return (e) => {
      const username = state.userinfo.login;
      searchUser(getGitHubApiUrl(username, repoType)).then((result) => {
        dispatch({
          type: 'updateRepo',
          payload: {
            [repoType]: result.map((repo) => {
              return {
                name: repo.name,
                link: repo.html_url,
              };
            }),
            show: [repoType],
          },
        });
      });
    };
  };

  return (
    <AppContent
      userinfo={state.userinfo}
      repos={state.repos}
      starred={state.starred}
      isFetching={state.isFetching}
      handleSearch={(e) => {
        handleSearch(e);
      }}
      getRepos={getRepos('repos')}
      getStarred={getRepos('starred')}
      show={state.show}
      error={state.error}
    />
  );
};

export default App;
