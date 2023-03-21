import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  const matchedData = ['email', 'password']
  console.log('reached')
  if (req.url === '/register' || req.url === '/register/') matchedData.push('first name', 'last name')
  console.log(matchedData)
  for (const key in req.body) {
    if (!matchedData.includes(key)) {
      return res.status(400).send({ errors: [`Invalid property ${key}`] })
    }
  }
  next()
}
