import type { Unit } from './UserSettings'
export interface BodyMeasurementType {
  name: string
  id: BodyMeasurementTypeId
  hasLeft?: boolean
  unit: string
}

export type BodyMeasurementTypeId =
  | 'height'
  | 'torso'
  | 'waist'
  | 'neck'
  | 'arms'
  | 'calves'
  | 'wrists'
  | 'thighs'

export const bodyMeasurementTypes: BodyMeasurementType[] = [
  { name: 'Height', id: 'height', unit: 'cm' },
  { name: 'Torso ', id: 'torso', unit: 'cm' },
  { name: 'Waist', id: 'waist', unit: 'cm' },
  { name: 'Neck', id: 'neck', unit: 'cm' },
  { name: 'Arms', id: 'arms', hasLeft: true, unit: 'cm' },
  { name: 'Calves', id: 'calves', hasLeft: true, unit: 'cm' },
  { name: 'Wrists', id: 'wrists', hasLeft: true, unit: 'cm' },
  { name: 'Thighs', id: 'thighs', hasLeft: true, unit: 'cm' },
]

export const bodyMeasurementTypesMap = new Map<
  BodyMeasurementTypeId,
  BodyMeasurementType
>(bodyMeasurementTypes.map((b) => [b.id, b]))

// export interface BodyMeasurement {
//   user_id: string | null
//   date_at: string | null
//   body_measurement_id: string | null
//   measurement: number | null
//   created_at: string | null
//   updated_at: string | null
// }

export class BodyMeasurement {
  measurement: number
  measurementTypeId: BodyMeasurementTypeId
  date: Date
  unit: Unit
  id: string

  constructor(
    id: string,
    measurement: number,
    date: Date,
    unit: Unit,
    measurementTypeId: BodyMeasurementTypeId
  ) {
    this.id = id
    this.measurement = measurement
    this.date = date
    this.unit = unit
    this.measurementTypeId = measurementTypeId
  }
}
