// id column (text) is automatically included
//user_id: column.text,
//username: column.text,
//gender: column.text,
//birthday: column.text,
//created_at: column.text,
//updated_at: column.text,

export function createRandomUsername(): string {
  return 'user_' + (new Date().getTime() % 100_000)
}

export type Gender = 'female' | 'male' | 'other' | 'unknown'

export interface IUserInfo {
  userId: string
  username: string
  gender: Gender
  birthday?: Date
}

export class UserInfo implements IUserInfo {
  userId: string
  username: string
  gender: Gender
  birthday?: Date

  constructor(userId: string, username: string, gender: Gender, birthday: Date) {
    this.userId = userId
    this.birthday = birthday
    this.gender = gender
    this.username = username
  }
}
