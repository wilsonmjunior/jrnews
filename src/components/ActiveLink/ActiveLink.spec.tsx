import { render, screen } from '@testing-library/react';

import { ActiveLink } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return { asPath: '/' }
    }
  }
})

describe('ActiveLink Component', () => {
  it('should renders correctly', () => {
    render(
      <ActiveLink href="/" activeClassName='active'>
        <p>Home</p>
      </ActiveLink>
    );

    const home = screen.getByText('Home');
    expect(home).toBeInTheDocument();
  });

  it('should adds active if the link as currently active', () => {
    render(
      <ActiveLink href="/" activeClassName='active'>
        <p>Home</p>
      </ActiveLink>
    );

    const home = screen.getByText('Home');
    expect(home).toHaveClass('active');
  });
});
