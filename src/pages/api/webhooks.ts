import { NextApiRequest, NextApiResponse } from 'next'
import { Readable } from 'stream'
import Stripe from 'stripe'
import { stripe } from '../../services/stripe'
import { saveSubscription } from './_lib/manageSubscription'

async function buffer(Readable: Readable) {
  const chunks = []
  for await (const chunk of Readable) {
    chunks.push(
      typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    )
  }

  return Buffer.concat(chunks)
}

export const config = {
  api: {
    bodyParser: false,
  }
}

const Events = {
  CHECKOUT_COMPLETED: 'checkout.session.completed',
  SUBSCRIPTION_CREATED: 'customer.subscription.created',
  SUBSCRIPTION_UPDATED: 'customer.subscription.updated',
  SUBSCRIPTION_DELETED: 'customer.subscription.deleted',
}

const relevantEvents = new Set([
  Events.CHECKOUT_COMPLETED,
  Events.SUBSCRIPTION_CREATED,
  Events.SUBSCRIPTION_UPDATED,
  Events.SUBSCRIPTION_DELETED,
])

export default async function(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const secret = req.headers['stripe-signature']

    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
      return res.status(400).send(`Webhook error: ${error.message}`)
    }

    const { type } = event
    if (relevantEvents.has(Events.CHECKOUT_COMPLETED)) {
      try {
        switch (type) {
          case Events.SUBSCRIPTION_CREATED:
          case Events.SUBSCRIPTION_CREATED:
          case Events.SUBSCRIPTION_CREATED:
            const subscription = event.data.object as Stripe.Subscription
            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
              type === Events.SUBSCRIPTION_CREATED
            )
          break

          case Events.CHECKOUT_COMPLETED:
            const checkoutSession = event.data.object as Stripe.Checkout.Session
            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true,
            )
          break

          default:
            throw new Error('Unhandled event.')
        }
      } catch (error) {
        res.json({ error: 'Webhook handler failed.' })
      }
    }

    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

