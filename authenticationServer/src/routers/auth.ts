import { Router, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { registerValidator, loginValidator } from '../middlewares/formValidator'
import { readFile, writeFile } from 'fs/promises'
import { Admin } from '../types'
import matchedData from '../middlewares/matchedData'
import passwordValidator from '../middlewares/passwordValdator'
import passwordEncryptor from '../middlewares/passwordEncryptor'
import adminValidator from '../middlewares/adminValidator'
import jwtSign from '../middlewares/jwtSign'

const router: Router = Router()

router.post(
  '/register',
  [
    matchedData,
    ...registerValidator,
    adminValidator,
    passwordValidator,
    passwordEncryptor,
    jwtSign,
  ],
  async (req: Request, res: Response) => {
    console.log('reached')
    try {
      if (!validationResult(req).isEmpty()) {
        const errors = validationResult(req).array()
        return res.status(400).send({ errors })
      }
      const url = `${__dirname}/../../../db/users.json`
      console.log(url)

      const admins: Admin[] = JSON.parse(await readFile(url, 'utf-8'))

      //get max id in admin db
      const id: number = admins.reduce((acc, cur) => {
        return acc > cur.id ? acc : cur.id
      }, 0)

      const admin: Admin = {
        id: id + 1,
        ...req.body,
        password: res.locals.password,
      }

      admins.push(admin)

      await writeFile(url, JSON.stringify(admins, null, 2))

      res.send({ accessToken: res.locals.accessToken })
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  }
)

router.post(
  '/login',
  [
    matchedData,
    ...loginValidator,
    adminValidator,
    jwtSign,
  ],
  async (req: Request, res: Response) => {
    try {
      if (!validationResult(req).isEmpty()) {
        const errors = validationResult(req).array()
        return res.status(400).send({ errors })
      }
      res.send({ accessToken: res.locals.accessToken })
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  }
)

export default router
