export type User = {
    id: number
    email?: string
    first_name: string
    last_name: string
    avater: string
    role: string
    followed: Array<string>
}

export enum Role  {
    ADMIN = 'admin',
    USER = 'user'
}


export type Admin = {
  id: number
  email: string
  username: string
  password: string
  role: Role
}
