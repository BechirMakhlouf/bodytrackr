import type { User } from '@supabase/supabase-js'
import type { Gender } from 'entities/UserInfo'
import type { Theme, Unit } from 'entities/UserSettings'
import type { Database } from 'library/powersync/AppSchema'
import type { System, system } from 'library/powersync/system'
import { dateObjectToDateSqlType, uuidv4 } from 'utils/utils'

export type UserInfoRow = Database['users_info']

type KysleyDatabase = typeof system.db

export class UserInfoRepository {
  system: System
  db: KysleyDatabase
  user: User

  constructor(system: System, user: User) {
    this.system = system
    this.db = system.db
    this.user = user
  }

  async get(): Promise<UserInfoRow | null> {
    //const queryResult = await this.db
    //  .selectFrom('users_info')
    //  .selectAll()
    //  .where('user_id', '=', this.user.id)
    //  .executeTakeFirst()
    //
    //return queryResult || null

    return (
      (await this.db
        .selectFrom('users_info')
        .selectAll()
        .where('user_id', '=', this.user.id)
        .executeTakeFirst()) || null
    )
  }

  async upsert(username?: string, gender?: Gender, birthday?: Date) {
    const oldUserInfo = await this.get()

    if (!oldUserInfo) {
      return await this.db
        .insertInto('users_info')
        .values({
          id: uuidv4(),
          user_id: this.user.id,
          gender,
          birthday: birthday && dateObjectToDateSqlType(birthday),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .execute()
    }

    return await this.db
      .updateTable('users_info')
      .set({
        username: username || oldUserInfo.username,
        gender: gender || oldUserInfo.gender,
        birthday: (birthday && dateObjectToDateSqlType(birthday)) || oldUserInfo.birthday,
        updated_at: new Date().toISOString(),
      })
      .execute()
  }

  async delete() {
    return await this.db
      .deleteFrom('users_info')
      .where('id', '=', this.user.id)
      .executeTakeFirst()
  }
}
