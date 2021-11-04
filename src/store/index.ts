import { createStore, createLogger } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { store as profile, ProfileStore, State as ProfileState } from '@/store/modules/profile'
import { store as exception, ExceptionStore, State as ExceptionState } from '@/store/modules/exception'

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []

// Plug in session storage based persistence
plugins.push(createPersistedState({ storage: window.sessionStorage }))

export type RootState = {
  profile: ProfileState,
  exception: ExceptionState
};

export type Store = ProfileStore<RootState> & ExceptionStore<RootState>

export const store = createStore({
  plugins,
  modules: {
    profile,
    exception
  }
})

export function useStore (): Store {
  return store as Store
}
