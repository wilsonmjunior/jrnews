import { fireEvent, render, screen } from "@testing-library/react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"

import { SubscribeButton } from "."

jest.mock('next-auth/react')

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}))

describe('SubscriptionButton Component', () => {
  it('should renders correctly', () => {
    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    })

    render(<SubscribeButton />)

    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('should redirects user to sign in when not authenticated', () => {
    const signInMocked = jest.mocked(signIn)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled();
  })

  it('should redirects to posts when user already has a subscription', () => {
    const useRouterMocked = jest.mocked(useRouter)
    const useSessionMocked = jest.mocked(useSession)

    const pushMocked = jest.fn()
    useRouterMocked.mockImplementation(() => ({
      push: pushMocked,
      pathname: '/',
    } as any))

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com'
        },
        expires: 'fake-expires',
      },
      status: 'authenticated',
    });

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(pushMocked).toHaveBeenCalledWith('/posts');
  })
})
