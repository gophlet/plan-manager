import * as auth from './modules/auth'
import * as wallet from './modules/wallet'
import * as plan from './modules/plan'
import * as transfer from './modules/transfer'

export const api = {
  ...auth,
  ...wallet,
  ...plan,
  ...transfer
}
