import { NextApiRequest, NextApiResponse } from "next"

export default (request: NextApiRequest, response: NextApiResponse) => {
  console.log(request.query)

  const users = [
    { id:1, name: 'John Doe 1' },
    { id:2, name: 'John Doe 2' },
    { id:3, name: 'John Doe 3' },
  ]

  const userFounded = users.find(user => user.id === Number(request.query.id))

  return response.json(userFounded)
}
