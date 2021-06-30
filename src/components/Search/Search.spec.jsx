import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Search from '.';

describe('<Search />', () => {
  it('should render a Search input with a placeholder "digite seu nome"', () => {
    const { debug } = render(<Search />);
    debug();
    const inputSearch = screen.getByPlaceholderText('digite o nome');
    expect(inputSearch).toBeInTheDocument();
  });
});
