import * as Crypto from 'expo-crypto'

export function uuidv4() {
  return Crypto.randomUUID()
}

export function kgToLbs(kg: number) {
  return kg * 2.2046
}
export function lbsToKg(lbs: number) {
  return lbs * 0.4536
}

export function cmToInch(cm: number) {
  return cm * 0.3937
}
export function inchToCm(inch: number) {
  return inch * 2.54
}

export function dateObjectToDateSqlType(date: Date) {
  return date.toISOString().split('T')[0]
}
