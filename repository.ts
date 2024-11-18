import type { Session, User } from '@supabase/supabase-js'
import type { Database } from 'library/powersync/AppSchema'
import type { System, system } from 'library/powersync/system'
import { UserSettingsRepository } from 'repository/UserSettings'
import { UserWeightRepository } from 'repository/UserWeight'
import { uuidv4 } from 'utils/utils'

export type UserWeight = Database['users_weight']

type KysleyDatabase = typeof system.db

export class UserRepository {
  system: System
  user: User
  session: Session
  userWeightRepo: UserWeightRepository
  userSettingsRepo: UserSettingsRepository

  constructor(system: System, session: Session) {
    this.system = system
    this.session = session
    this.user = session.user
    this.userWeightRepo = new UserWeightRepository(this.system, this.user)
    this.userSettingsRepo = new UserSettingsRepository(this.system, this.user)
  }
}
