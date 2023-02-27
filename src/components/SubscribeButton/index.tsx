import { signIn, useSession } from 'next-auth/react'

import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'

import styles from './styles.module.scss'

export function SubscribeButton() {
  const { data: session } = useSession()

  async function handleSubscribe() {
    if (!session) {
      await signIn('github')
    }

    // if (status === 'authenticated') {
    //   return push('/posts')
    // }

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
