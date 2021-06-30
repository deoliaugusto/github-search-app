export const searchUser = async (url) => {
  const user = await fetch(url);
  return user.json();
};

export const getGitHubApiUrl = (username, type) => {
  const internalUser = username ? `${username}` : '';
  const internalType = type ? `/${type}` : '';
  return `https://api.github.com/users/${internalUser}${internalType}`;
};
