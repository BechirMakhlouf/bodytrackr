import type { User } from '@supabase/supabase-js'
import { BodyMeasurement, type BodyMeasurementTypeId } from 'entities/BodyMeasurements'
import type { Unit } from 'entities/UserSettings'
import type { Database } from 'library/powersync/AppSchema'
import type { System, system } from 'library/powersync/system'
import { cmToInch, dateObjectToDateSqlType, uuidv4 } from 'utils/utils'

export type BodyMeasurementsCmRow = Database['users_body_measurements_cm']

type KysleyDatabase = typeof system.db

export function bodyMeasurementRowToBodyMeasurement(
  bodyMeasurementCm: BodyMeasurementsCmRow[],
  prefUnit?: Unit
) {
  return bodyMeasurementCm.map(
    (row) =>
      new BodyMeasurement(
        row.id,
        prefUnit === 'imperial' ? cmToInch(row.measurement!) : row.measurement!,
        new Date(row.date_at!),
        prefUnit || 'metric',
        row.body_measurement_id! as BodyMeasurementTypeId
      )
  )
}

export class BodyMeasurementsRepository {
  system: System
  db: KysleyDatabase
  user: User
  bodyMeasurementTypeId: BodyMeasurementTypeId

  async *watch(weightUnit?: Unit) {
    console.log(this.bodyMeasurementTypeId)
    console.log(this.bodyMeasurementTypeId)
    console.log(this.bodyMeasurementTypeId)
    for await (const queryResult of this.system.powersync.watch(
      `SELECT * FROM users_body_measurements_cm 
        WHERE body_measurement_id = '${this.bodyMeasurementTypeId}'
        AND user_id = '${this.user.id}'
        ORDER BY date_at DESC;`
    ))
      yield queryResult.rows?._array.map((r) => r) as BodyMeasurementsCmRow[]
  }

  constructor(system: System, user: User, bodyMeasurementTypeId: BodyMeasurementTypeId) {
    this.system = system
    this.db = system.db
    this.user = user
    this.bodyMeasurementTypeId = bodyMeasurementTypeId
  }

  async get(dateAt: Date): Promise<BodyMeasurementsCmRow | null> {
    return (
      (await this.db
        .selectFrom('users_body_measurements_cm')
        .selectAll()
        .where('user_id', '=', this.user.id)
        .where('date_at', '=', dateObjectToDateSqlType(dateAt))
        .where('body_measurement_id', '=', this.bodyMeasurementTypeId)
        .executeTakeFirst()) || null
    )
  }

  async getAll(): Promise<BodyMeasurementsCmRow[]> {
    return await this.db
      .selectFrom('users_body_measurements_cm')
      .selectAll()
      .where('body_measurement_id', '=', this.bodyMeasurementTypeId)
      .where('user_id', '=', this.user.id)
      .execute()
  }

  async upsert(measurement: number, dateAt: Date) {
    const oldMeasurement = await this.get(dateAt)

    if (!oldMeasurement) {
      return await this.db
        .insertInto('users_body_measurements_cm')
        .values({
          id: uuidv4(),
          user_id: this.user.id,
          date_at: dateObjectToDateSqlType(dateAt),
          measurement,
          body_measurement_id: this.bodyMeasurementTypeId,
          updated_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        })
        .execute()
    }

    return await this.db
      .updateTable('users_body_measurements_cm')
      .set({
        user_id: this.user.id,
        date_at: dateObjectToDateSqlType(dateAt),
        measurement,
        body_measurement_id: this.bodyMeasurementTypeId,
        updated_at: new Date().toISOString(),
      })
      .where('id', '=', oldMeasurement.id)
      .executeTakeFirst()
  }

  async delete_at(date_at: Date) {
    return await this.db
      .deleteFrom('users_body_measurements_cm')
      .where('date_at', '=', dateObjectToDateSqlType(date_at))
      .where('body_measurement_id', '=', this.bodyMeasurementTypeId)
      .where('user_id', '=', this.user.id)
      .executeTakeFirst()
  }

  async delete(id: string) {
    return await this.db
      .deleteFrom('users_body_measurements_cm')
      .where('id', '=', id)
      .executeTakeFirst()
  }
}
