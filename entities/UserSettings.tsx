export type Theme = 'dark' | 'light' | 'auto'
export type Unit = 'metric' | 'imperial'

export class UserSettings {
  userId: string
  prefTheme: Theme
  prefUnit: Unit

  constructor(userId: string, prefTheme?: Theme, prefUnit?: Unit) {
    this.userId = userId
    this.prefTheme = prefTheme || 'auto'
    this.prefUnit = prefUnit || 'metric'
  }
}
