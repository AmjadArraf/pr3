import express, { Application, Request, Response } from 'express'
import 'dotenv/config'
import { readFile, writeFile } from 'fs/promises'
import { responseError, doesUserExist } from './tools'
import { User } from './types'
import jwtVerify from './middlewares/jwtVerify'
import { save, find, } from './controlers/trips'

const app: Application = express()

const filePath = `${process.cwd()}/../db/users.json`

app.use(express.json())

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Get all Trips from SQL Data Base
app.get('/', [], async (req: Request, res: Response) => {
  try {
    const trip = await find()
    console.log(trip)
    trip.length ? res.send(trip) : res.sendStatus(404)
} catch (error) {
    console.log(error)
    res.status(500)
}
})

// Get specific Trip according to id of trip from SQL Data Base
app.get('/:id', jwtVerify,  async (req: Request, res: Response) => {
  const tripId : string = req.params.toString()

  try {
    const trip = await find(tripId)
    console.log(trip)
    trip.length ? res.send(trip) : res.sendStatus(404)
} catch (error) {
    console.log(error)
    res.status(500)
}
})

// update followed trips for user, add a trip to "followed trips" when follow button is pressed
app.patch(
  '/:id',
  [jwtVerify],
  async (req: Request, res: Response) => {
    try {
      const userId = +req.params.id
      const usSentData = req.body
      const dataArray = usSentData.split(" ")
      const followedID = dataArray[2]
      
      const users: User[] = JSON.parse(await readFile(filePath, 'utf8'))

      if (!doesUserExist(userId, users)) {
        return res.status(404).send(`User ${userId} not found`)
      }

      const updatedFollowed = users.map((user) =>
        user.id === userId ? { ...user.followed, ...followedID } : user
      )

      const updatedUsers: User[] = users.map((user) =>
        user.id === userId ? { ...user, ...updatedFollowed } : user
      )

      await writeFile(filePath, JSON.stringify(updatedUsers, null, 2))

      const [user] = updatedUsers.filter((user) => user.id === userId)
      res.send(user)
    } catch (error) {
      responseError(error, res)
    }
  }
)

// deleted a Trip from a user "followed trips" when unfollow button is pressed
app.delete(
  '/:id',
  [jwtVerify],
  async (req: Request, res: Response) => {
    try {
      const userId = +req.params.id
      const usSentData = req.body
      const dataArray = usSentData.split(" ")
      const followedID = dataArray[2]
      
      const users: User[] = JSON.parse(await readFile(filePath, 'utf8'))

      if (!doesUserExist(userId, users)) {
        return res.status(404).send(`User ${userId} not found`)
      }

      const updatedFollowed = users.map((user) =>
        user.id === userId ? { ...user.followed, ...followedID } : user
      )

      const updatedUsers: User[] = users.map((user) =>
        user.id === userId ? {
          ...user,
          followed: user.followed.filter((id) => id !== followedID),
        }
      : user
      )

      await writeFile(filePath, JSON.stringify(updatedUsers, null, 2))

      const [user] = updatedUsers.filter((user) => user.id === userId)
      res.send(user)
    } catch (error) {
      responseError(error, res)
    }
  }
)

app.use((req: Request, res: Response) =>
  res.status(404).send('Endpoint not supported')
)

const port = +(process.env.APP_PORT || 3009)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
