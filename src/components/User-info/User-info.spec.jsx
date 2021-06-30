import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserInfo from '.';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

describe('<UserInfo />', () => {
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

  it('should show github user information', async () => {
    server.listen();
    const userinfo = await fetch('https://api.github.com/users/jose').then(
      (res) => res.json()
    );
    const { debug } = render(<UserInfo userinfo={userinfo} />);
    debug();
    server.close();
  });

  it('it should show "not found" if user wasnt finded', async () => {
    server.listen();
    const userinfo = await fetch('https://api.github.com/users/abzbr')
      .then((res) => res.json())
      .catch((error) => error);
    const { debug } = render(<UserInfo userinfo={userinfo} error={true} />);
    debug();
    server.close();
  });
});
