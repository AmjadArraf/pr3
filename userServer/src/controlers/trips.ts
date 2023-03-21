import { Trip} from '../interfaces/trip'
import TripModel, {tripSaver} from '../models/trips'

export const save = async (data: Trip): Promise<number | null> => {
    try {
        const {trip_name, trip_info, destination, pic, start_date, end_date, price, followers} = data
        const team = new tripSaver(trip_name, trip_info, destination, pic, start_date, end_date, price, followers)
        const [ res ] = await team.save()
        return res.affectedRows ? res.insertId : null
    } catch (error) {
        console.log(error)
        return null
    }
}

export const find = async (id? : string) : Promise<any> => {
    const [trip] = id ? await TripModel.find(id) : await TripModel.find()
    return trip
}



export const update = async (id: string, data: Trip): Promise<boolean> => {
    const {trip_name} = data
    if(trip_name) return false

    const trip = new TripModel(trip_name)

    const [res] = await trip.update(id, trip_name)
    return res.affectedRows ? true : false
}
