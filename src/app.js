import React from 'react';
import AppContent from './components/App-container/app-conteiner';
import api from 'axios';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userinfo: null,
      repos: [],
      starred: [],
      isFetching: false,
      show: null,
      error: null,
    };
  }

  getGitHubApiUrl(username, type) {
    const internalUser = username ? `${username}` : '';
    const internalType = type ? `/${type}` : '';
    return `https://api.github.com/users/${internalUser}${internalType}`;
  }

  handleSearch(e) {
    let value = e.target.value;
    let keyCode = e.which || e.keyCode;
    let target = e.target;
    const ENTER = 13;

    if (keyCode === ENTER) {
      this.setState({ isFetching: true });
      target.disabled = true;
      api
        .get(this.getGitHubApiUrl(value))
        .then((result) => {
          this.setState({
            userinfo: {
              username: result.data.name,
              photo: result.data.avatar_url,
              login: result.data.login,
              url: result.data.url,
              repos: result.data.public_repos,
              followers: result.data.followers,
              following: result.data.following,
            },
            repos: [],
            starred: [],
            error: false,
          });
          console.log(this.state);
        })
        .catch((error) => {
          this.setState({
            userinfo: {
              username: error.response.data.message,
            },
            error: true,
          });
          console.log(this.state);
        })
        .then(() => {
          this.setState({ isFetching: false });
        });
    }
  }

  getRepos(type) {
    return (e) => {
      const username = this.state.userinfo.login;
      api.get(this.getGitHubApiUrl(username, type)).then((result) => {
        this.setState({
          [type]: result.data.map((repo) => {
            return {
              name: repo.name,
              link: repo.html_url,
            };
          }),
          show: [type],
        });
      });
    };
  }

  render() {
    return (
      <AppContent
        userinfo={this.state.userinfo}
        repos={this.state.repos}
        starred={this.state.starred}
        isFetching={this.state.isFetching}
        handleSearch={(e) => {
          this.handleSearch(e);
        }}
        getRepos={this.getRepos('repos')}
        getStarred={this.getRepos('starred')}
        show={this.state.show}
        error={this.state.error}
      />
    );
  }
}

export default App;
