import { NextApiRequest, NextApiResponse } from "next"

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query)

  const users = [
    { id:1, name: 'John Doe 1' },
    { id:2, name: 'John Doe 2' },
    { id:3, name: 'John Doe 3' },
  ]

  const userFounded = users.find(user => user.id === Number(req.query.id))

  return res.json(userFounded)
}
