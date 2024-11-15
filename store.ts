import type { AuthError, Session, User } from '@supabase/supabase-js'
import { type System, system } from 'library/powersync/system'
import { UserRepository } from 'repository'
import { create } from 'zustand'

interface Store {
  system: System
  isSignedIn: boolean
  user: User | null
  session: Session | null
  repository: UserRepository | null
  setUser: (user: User | null) => void
  signIn: (email: string, password: string) => Promise<AuthError | null>
  signUp: (email: string, password: string) => Promise<AuthError | null>
  restoreSession: () => void

  resetApp: () => void
  initApp: () => void
  signOut: () => Promise<void>
}

export const useAppStore = create<Store>((set) => ({
  system,

  isSignedIn: false,
  user: null,
  session: null,
  repository: null,
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
    set((state) => {
      state.system.init()
      return {
        session: session,
        user: session.user,
        isSignedIn: true,
        repository: new UserRepository(system, session),
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
      return {}
    })
  },
}))
