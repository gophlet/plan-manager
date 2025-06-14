export const AuthEndpoints = {
  login: '/login'
} as const

export const WalletEndpoints = {
  getWallets: '/getWallets'
} as const

export const PlanEndpoints = {
  getPlans: '/getPlans',
  deletePlans: '/deletePlans',
  submitPlan: '/submitPlan',
  switchPlans: '/switchPlans'
} as const
