import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
import { Session } from '../../types/next-auth.types'

import styles from './styles.module.scss'

export function SubscribeButton() {
  const { data: session } = useSession() as { data: Session }
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      await signIn('github')
    }

    if (session.activeSubscription) {
      router.push('/posts');
      return;
    }

    try {
      // create checkout session
      const response = await api.post('/checkout/subscribe')
      const { sessionId } = response.data
      const stripe = await getStripeJs()
      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}
