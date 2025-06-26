export const AuthEndpoint = {
  LOGIN: '/login'
} as const

export const WalletEndpoint = {
  GET_WALLETS: '/getWallets'
} as const

export const PlanEndpoint = {
  GET_PLANS: '/getPlans',
  DELETE_PLANS: '/deletePlans',
  SUBMIT_PLAN: '/submitPlan',
  SWITCH_PLANS: '/switchPlans'
} as const
