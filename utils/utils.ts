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
