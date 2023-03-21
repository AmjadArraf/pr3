import express, { Application, Request, Response } from 'express'
import 'dotenv/config'
import authRouter from './routers/auth'
import cors from 'cors'


const app: Application = express()

app.use(express.json())
app.use(cors());
app.use('/auth', authRouter)

app.use((req: Request, res: Response) => {
  res.sendStatus(404).send(`Resource ${req.url} not supported!`)
})

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is listening on port ${process.env.APP_PORT}`)
})
