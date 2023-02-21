import { render } from '@testing-library/react';

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
    const { getByText } = render(
      <ActiveLink href="/" activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );

    const home = getByText('Home');
    expect(home).toBeInTheDocument();
  });

  it('should adds active if the link as currently active', () => {
    const { getByText  } = render(
      <ActiveLink href="/" activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );

    const home = getByText('Home');
    expect(home).toHaveClass('active');
  });
});
