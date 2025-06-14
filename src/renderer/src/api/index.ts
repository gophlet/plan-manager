import * as auth from './modules/auth'
import * as wallet from './modules/wallet'
import * as plan from './modules/plan'

export const api = {
  ...auth,
  ...wallet,
  ...plan
}
