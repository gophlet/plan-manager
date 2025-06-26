import React from 'react'
import { useOutletContext, useParams } from 'react-router'
import PlanPage from './plan-page'

const PlanPageWrapper: React.FC = () => {
  // throw new Error('Test error boundary')

  const wallet = useOutletContext<{
    walletId: string
    walletAddress: string
    walletName: string
  } | null>()
  const params = useParams()
  if (!wallet || wallet.walletId !== params.walletId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">未找到钱包信息</div>
    )
  }
  return (
    <PlanPage
      walletId={wallet.walletId}
      walletName={wallet.walletName}
      walletAddress={wallet.walletAddress}
    />
  )
}

export default PlanPageWrapper
