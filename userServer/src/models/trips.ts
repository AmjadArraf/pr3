import db from '../db'

export default class TripModel {
    constructor(private trip_name: string){
    }

    static async find(id?: string): Promise<any>{
        const query = `
        select * from trips ${id ? `where id = ${id}` : ''}
        `
        return db.execute(query)
    }
    
    async update(id: string, body: string): Promise<any> {
        const query = `
        UPDATE users
        SET name = 'John Doe', age = 30
        WHERE id = 123;
        `

        return await db.execute(query)
    }
}

export class tripSaver {

    constructor(private trip_name: string, private trip_info: string, private destination: string, private pic: string, private start_date: string, private end_date: string, private price: string, private followers: string){
    }
async save(): Promise<any>{

    const query = `
    insert into trips(trip_name, trip_info, destination, pic, start_date, end_date, price, followers)
    value ('${this.trip_name}', '${this.trip_info}', '${this.destination}', '${this.pic}', '${this.start_date}', '${this.end_date}', '${this.price}', '${this.followers}')
`
const res = await db.execute(query)
console.log('res from databse')
console.log(res)
return res
}
}




