import type { User } from '@supabase/supabase-js'
import type { Theme, Unit } from 'entities/UserSettings'
import type { Database } from 'library/powersync/AppSchema'
import type { System, system } from 'library/powersync/system'
import { uuidv4 } from 'utils/utils'

export type UserSettingsRow = Database['users_settings']

type KysleyDatabase = typeof system.db

export class UserSettingsRepository {
  system: System
  db: KysleyDatabase
  user: User

  constructor(system: System, user: User) {
    this.system = system
    this.db = system.db
    this.user = user
  }

  async get(): Promise<UserSettingsRow | null> {
    //const queryResult = await this.db
    //  .selectFrom('users_settings')
    //  .selectAll()
    //  .where('user_id', '=', this.user.id)
    //  .executeTakeFirst()
    //
    //return queryResult || null
    return (
      (await this.db
        .selectFrom('users_settings')
        .selectAll()
        .where('user_id', '=', this.user.id)
        .executeTakeFirst()) || null
    )
  }

  async upsert(prefUnit?: Unit, prefTheme?: Theme) {
    const oldSettings = this.get()

    if (!oldSettings) {
      return await this.db
        .insertInto('users_settings')
        .values({
          id: uuidv4(),
          user_id: this.user.id,
          deleted: 0,
          pref_unit: prefUnit || 'metric',
          pref_theme: prefTheme || 'auto',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .execute()
    }

    return await this.db
      .updateTable('users_settings')
      .set({
        pref_unit: prefUnit || 'metric',
        pref_theme: prefTheme || 'auto',
        updated_at: new Date().toISOString(),
      })
      .execute()
  }

  async delete() {
    return await this.db
      .deleteFrom('users_settings')
      .where('id', '=', this.user.id)
      .executeTakeFirst()
  }
}
