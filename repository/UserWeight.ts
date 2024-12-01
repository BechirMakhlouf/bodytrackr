import type { User } from '@supabase/supabase-js'
import type { Unit } from 'entities/UserSettings'
import { WeightLog } from 'entities/UserWeight'
import type { Database } from 'library/powersync/AppSchema'
import type { System, system } from 'library/powersync/system'
import { kgToLbs, uuidv4 } from 'utils/utils'

export type UserWeightRow = Database['users_weight']
type KysleyDatabase = typeof system.db

export function userWeightRowToUserWeight(
  userWeightRows: UserWeightRow[],
  prefUnit?: Unit
) {
  return userWeightRows.map(
    (row) =>
      new WeightLog(
        row.id,
        prefUnit === 'imperial' ? kgToLbs(row.weight_kg!) : row.weight_kg!,
        new Date(row.date_at!),
        prefUnit || 'metric'
      )
  )
}

export class UserWeightRepository {
  system: System
  db: KysleyDatabase
  user: User

  constructor(system: System, user: User) {
    this.system = system
    this.db = system.db
    this.user = user
  }

  async *watch(weightUnit?: Unit) {
    for await (const queryResult of this.system.powersync.watch(
      `select * FROM users_weight WHERE user_id = '${this.user.id}' ORDER BY date_at DESC;`
    ))
      yield queryResult.rows?._array.map((r) => r) as UserWeightRow[]
  }

  async get(date_at: Date): Promise<UserWeightRow | null> {
    return (
      (await this.db
        .selectFrom('users_weight')
        .selectAll()
        .where('date_at', '=', date_at.toISOString().split('T')[0])
        .where('user_id', '=', this.user.id)
        .executeTakeFirst()) || null
    )
  }
  async getAll(): Promise<UserWeightRow[]> {
    return await this.db
      .selectFrom('users_weight')
      .selectAll()
      .where('user_id', '=', this.user.id)
      .execute()
  }

  async upsert(weightKg: number, dateAt: Date) {
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

  //async upsert(userWeight: UserWeight) {
  //  const oldWeight = await this.get(new Date(userWeight.date_at!))
  //
  //  if (!oldWeight) {
  //    return await this.db.insertInto('users_weight').values(userWeight).execute()
  //  }
  //
  //  return await this.db
  //    .updateTable('users_weight')
  //    .set(userWeight)
  //    .where('id', '=', oldWeight.id)
  //    .executeTakeFirst()
  //}

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
