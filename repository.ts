import type { Session, User } from '@supabase/supabase-js'
import type { Database } from 'library/powersync/AppSchema'
import type { System, system } from 'library/powersync/system'
import { uuidv4 } from 'utils/utils'

export type UserWeight = Database['users_weight']

type KysleyDatabase = typeof system.db

class UserWeightRepository {
  system: System
  db: KysleyDatabase
  user: User

  constructor(system: System, user: User) {
    this.system = system
    this.db = system.db
    this.user = user
  }

  async *watch() {
    for await (const result of this.system.powersync.watch(
      'select * from users_weight ORDER BY date_at DESC;'
    )) {
      const values = result.rows?._array.map((r) => r as UserWeight)
      yield values as UserWeight[]
    }
  }
  async get(date_at: Date): Promise<UserWeight | null> {
    return (
      (await this.db
        .selectFrom('users_weight')
        .selectAll()
        .where('date_at', '=', date_at.toISOString().split('T')[0])
        .where('user_id', '=', this.user.id)
        .executeTakeFirst()) || null
    )
  }
  async getAll(): Promise<UserWeight[]> {
    return await this.db
      .selectFrom('users_weight')
      .selectAll()
      .where('user_id', '=', this.user.id)
      .execute()
  }

  async upsert_v2(weightKg: number, dateAt: Date) {
    const oldWeight = await this.get(dateAt)

    if (!oldWeight) {
      return await this.db
        .insertInto('users_weight')
        .values({
          id: uuidv4(),
          user_id: this.user.id,
          date_at: dateAt.toISOString().split('T')[0],
          weight_kg: weightKg,
          updated_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        })
        .execute()
    }

    return await this.db
      .updateTable('users_weight')
      .set({
        user_id: this.user.id,
        date_at: dateAt.toISOString().split('T')[0],
        weight_kg: weightKg,
        updated_at: new Date().toISOString(),
      })
      .where('id', '=', oldWeight.id)
      .executeTakeFirst()
  }

  async upsert(userWeight: UserWeight) {
    const oldWeight = await this.get(new Date(userWeight.date_at!))

    if (!oldWeight) {
      return await this.db.insertInto('users_weight').values(userWeight).execute()
    }

    return await this.db
      .updateTable('users_weight')
      .set(userWeight)
      .where('id', '=', oldWeight.id)
      .executeTakeFirst()
  }

  async delete_at(date_at: Date) {
    return await this.db
      .deleteFrom('users_weight')
      .where('date_at', '=', date_at.toISOString().split('T')[0])
      .where('user_id', '=', this.user.id)
      .executeTakeFirst()
  }

  async delete(id: string) {
    return await this.db
      .deleteFrom('users_weight')
      .where('id', '=', id)
      .executeTakeFirst()
  }
}

export class UserRepository {
  system: System
  user: User
  session: Session
  userWeightRepo: UserWeightRepository

  constructor(system: System, session: Session) {
    this.system = system
    this.session = session
    this.user = session.user
    this.userWeightRepo = new UserWeightRepository(this.system, this.user)
  }
}
