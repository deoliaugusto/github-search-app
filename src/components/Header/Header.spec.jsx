import { render, screen } from '@testing-library/react';
import Header from '.';
import '@testing-library/jest-dom/extend-expect';

describe('<Header />', () => {
  it(`should render the heading with provided title`, () => {
    const { debug } = render(<Header />);
    debug();
    const title = 'Github';
    const header = screen.getByRole('heading', { name: /github/i });
    expect(header).toHaveTextContent(`${title}`);
  });

  it('should render a small with provided subtitle', () => {
    render(<Header />);
    const subtitle = 'buscar por usuário';
    const small = screen.getByText(/buscar por usuário/i);
    expect(small).toHaveTextContent(subtitle);
  });
});
