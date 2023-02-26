import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'

import styles from './styles.module.scss'
import { useCallback } from 'react'

export function SignInButton() {
  const { data: session } = useSession()

  const handleSignIn =  useCallback(async() => {
    try {
      await signIn('github',  {
        redirect: true,
      })
    } catch (error) {
      console.log('Error: ', error)
    }
  }, [])

  return session ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub color="#04D361" />
      {session.user.name}
      <FiX color="#737380" />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={handleSignIn}
    >
      <FaGithub color="#EBA417" />
      Sign In with GitHub
    </button>
  )
}
