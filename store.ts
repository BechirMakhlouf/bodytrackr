import type { AuthError, Session, User } from '@supabase/supabase-js'
import type { UserInfo } from 'entities/UserInfo'
import { type Theme, type Unit, UserSettings } from 'entities/UserSettings'
import { WeightLog } from 'entities/UserWeight'
import { type System, system } from 'library/powersync/system'
import { UserRepository } from 'repository'
import { create } from 'zustand'

interface Store {
  system: System
  isSignedIn: boolean
  user: User | null
  session: Session | null
  repository: UserRepository | null

  userSettings: UserSettings | null
  userInfo?: UserInfo
  userWeightLog: WeightLog[]

  setUser: (user: User | null) => void
  setWeightLog: (weightLog: WeightLog[]) => void

  signIn: (email: string, password: string) => Promise<AuthError | null>
  signUp: (email: string, password: string) => Promise<AuthError | null>
  signOut: () => Promise<void>

  restoreSession: () => void
  resetApp: () => void
  initApp: () => void
}
export const useAppStore = create<Store>((set) => ({
  system,
  isSignedIn: false,
  session: null,

  repository: null,
  user: null,
  userSettings: null,
  userWeightLog: [],

  setWeightLog: (weightLog: WeightLog[]) => set({ userWeightLog: weightLog }),
  initApp: async () => {
    const sessionResponse = await system.supabaseConnector.client.auth.getSession()

    if (!sessionResponse?.data?.session) {
      set({
        isSignedIn: false,
        user: null,
        session: null,
        repository: null,
      })
      return
    }

    const session = sessionResponse.data.session

    const repository = new UserRepository(system, session)
    const settingsRow = await repository.userSettingsRepo.get()

    const settings = new UserSettings(
      session.user.id,
      settingsRow?.pref_theme as Theme,
      settingsRow?.pref_unit as Unit
    )
    set(() => {
      return {
        session: session,
        user: session.user,
        isSignedIn: true,
        repository: new UserRepository(system, session),
        userSettings: settings,
      }
    })
  },

  setUser: (user: User | null) => {
    set(() => ({ user }))
  },

  restoreSession: async () => {
    const sessionResponse = await system.supabaseConnector.client.auth.getSession()
    if (!sessionResponse?.data?.session) return
    const session = sessionResponse.data.session
    set(() => ({
      session: session,
      user: session.user,
      isSignedIn: true,
      repository: new UserRepository(system, session),
    }))
  },

  signIn: async (email: string, password: string) => {
    const authResult = await system.supabaseConnector.client.auth.signInWithPassword({
      email,
      password,
    })

    if (authResult.data.session === null) {
      return authResult.error
    }
    set((state) => {
      state.initApp()
      return {}
    })
    return null
  },

  signUp: async (email: string, password: string) => {
    const authResult = await system.supabaseConnector.client.auth.signUp({
      email,
      password,
    })

    if (authResult.data === null) {
      return authResult.error
    }
    set((state) => {
      state.initApp()
      return {}
    })
    return null
  },

  resetApp: async () => {
    await system.disconnect()
    set(() => ({ isSignedIn: false, user: null, session: null, repository: null }))
  },

  signOut: async () => {
    set((state) => {
      state.resetApp()
      return { isSignedIn: false }
    })
  },
}))
