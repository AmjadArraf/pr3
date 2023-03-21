import { Router, Request, Response} from 'express'
import { save, find, update } from '../controlers/trips'

const router : Router = Router()
const sendRouter: Router = Router()


router.get('/', async (req:Request, res:Response) => {
    try {
        const team = await find()
        console.log(team)
        team.length ? res.send(team) : res.sendStatus(404)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

router.patch('/:id', async (req:Request, res:Response) => {
    try {
        const isUpdated = await update(req.params.id, req.body)
        isUpdated ? res.send(`Trips followed updated`) : res.send('nothing updated')
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

export {router, sendRouter}