import type { Unit } from './UserSettings'

export class WeightLog {
  weight: number
  date: Date
  unit: Unit
  id: string

  constructor(id: string, weight: number, date: Date, unit: Unit) {
    this.id = id
    this.weight = weight
    this.date = date
    this.unit = unit
  }
}
