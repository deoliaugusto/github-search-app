import '@testing-library/jest-dom/extend-expect';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import * as searchUserMk from './search-user';

const server = setupServer(
  ...[
    rest.get('https://api.github.com/users/jose', (req, res, ctx) => {
      return res(
        ctx.json({
          username: 'jose',
          photo: 'cuecaszorba.jpg',
          repos: ['jailson', 'tião', 'bola', 'tibuca'],
          followers: 42,
          following: 23,
        })
      );
    }),
    rest.get('https://api.github.com/users/abzbr', (req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json({
          username: 'not found',
        })
      );
    }),
  ]
);

const original = searchUserMk.searchUser;

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.restoreHandlers;
  searchUserMk.searchUser = original;
});
afterAll(() => {
  server.close();
});

it('should fetch data from an api', async () => {
  const mockSearchUser = jest.spyOn(searchUserMk, 'searchUser');
  const data = await mockSearchUser('https://api.github.com/users/jose');
  expect(data).toEqual({
    username: 'jose',
    photo: 'cuecaszorba.jpg',
    repos: ['jailson', 'tião', 'bola', 'tibuca'],
    followers: 42,
    following: 23,
  });
  expect(mockSearchUser).toHaveBeenCalledTimes(1);
});

it('should fetch data from not found user in an api', async () => {
  const mockSearchUser = jest.spyOn(searchUserMk, 'searchUser');
  const data = await mockSearchUser('https://api.github.com/users/abzbr');
  expect(data).toEqual({
    username: 'not found',
  });
  expect(mockSearchUser).toHaveBeenCalledTimes(1);
});
