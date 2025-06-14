import { Conf } from 'electron-conf/renderer'
import { AUTH_TOKEN_KEY } from '@renderer/constants'

type ConfType = {
  [AUTH_TOKEN_KEY]: string | undefined
}

const conf = new Conf<ConfType>()

export default {
  getToken: () => conf.get(AUTH_TOKEN_KEY),
  setToken: (token: string) => conf.set(AUTH_TOKEN_KEY, token),
  clearToken: () => conf.delete(AUTH_TOKEN_KEY)
}
