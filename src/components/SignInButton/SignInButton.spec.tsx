import { render, screen } from "@testing-library/react"
import { useSession } from "next-auth/react"
import { SignInButton } from '.'

jest.mock('next-auth/react')


describe('SignInButton Component', () => {
  it('should renders correctly when user is not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'loading',
    })

    render(<SignInButton />)

    expect(screen.getByText('Sign In with GitHub')).toBeInTheDocument()
  })

  it('should renders correctly when user is authenticated', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValue({
      data: {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        expires: 'fake-expires',
      },
      status: 'authenticated',
    })

    render(<SignInButton />)

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  })
})
