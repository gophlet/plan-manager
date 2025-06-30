import * as React from 'react'
import { BadgeDollarSign, RefreshCw } from 'lucide-react'
import { api } from '@renderer/api'
import { useToast } from '@renderer/components/kit/toast/toast-context'
import Card from '../components/kit/card'
import { Select, SelectOption } from '../components/kit/select'
import { Input } from '../components/kit/input'
import { Button } from '../components/kit/button'
import { Spinner } from '../components/kit/spinner'
import { DEFAULT_ERROR_DESCRIPTION } from '@renderer/constants'
import { WalletInfoList } from '@renderer/api/modules/wallet'
import { cn } from '@renderer/lib/utils'

const TransferPage: React.FC = () => {
  const { notify } = useToast()
  const [fromAddress, setFromAddress] = React.useState('')
  const [toAddress, setToAddress] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [wallets, setWallets] = React.useState<WalletInfoList>([])
  const [walletsLoading, setWalletsLoading] = React.useState(false)

  const fetchWallets = React.useCallback(async (): Promise<void> => {
    setWalletsLoading(true)
    try {
      const response = await api.getWallets()
      if (response?.wallets) {
        setWallets(response.wallets)
      }
    } catch {
      notify({
        title: '获取钱包失败',
        description: DEFAULT_ERROR_DESCRIPTION,
        variant: 'destructive'
      })
    } finally {
      setWalletsLoading(false)
    }
  }, [notify])

  React.useEffect(() => {
    fetchWallets()
  }, [fetchWallets])

  const walletOptions: SelectOption[] = React.useMemo(
    () =>
      wallets.map((wallet) => ({
        value: wallet.walletAddress,
        label: `${wallet.walletName} (${wallet.walletAddress.slice(0, 6)}...${wallet.walletAddress.slice(-4)})`
      })),
    [wallets]
  )

  const getSelectedWalletBalance = (
    address: string
  ): { balance: string; wallet: WalletInfoList[0] } | null => {
    const wallet = wallets.find((w) => w.walletAddress === address)
    return wallet ? { balance: wallet.balance, wallet } : null
  }

  const selectedWalletInfo = fromAddress ? getSelectedWalletBalance(fromAddress) : null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!fromAddress.trim() || !toAddress.trim() || !amount.trim()) {
      notify({ title: '参数错误', description: '请填写所有字段', variant: 'destructive' })
      return
    }

    const amountNum = Number(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      notify({
        title: '金额不合法',
        description: '请输入大于 0 的有效金额',
        variant: 'destructive'
      })
      return
    }

    if (fromAddress.trim() === toAddress.trim()) {
      notify({
        title: '地址错误',
        description: '转出地址与转入地址不能相同',
        variant: 'destructive'
      })
      return
    }

    if (selectedWalletInfo && Number(selectedWalletInfo.balance) < amountNum) {
      notify({
        title: '余额不足',
        description: `请确保转出钱包资金充足`,
        variant: 'destructive'
      })
      return
    }

    setLoading(true)
    try {
      const res = await api.transfer({
        fromAddress,
        toAddress,
        amount: amountNum
      })
      if (res?.success) {
        notify({ title: '转账成功', description: '资金已转出', variant: 'success' })
        setFromAddress('')
        setToAddress('')
        setAmount('')
        await fetchWallets()
      } else {
        notify({
          title: '转账失败',
          description: DEFAULT_ERROR_DESCRIPTION,
          variant: 'destructive'
        })
      }
    } catch {
      notify({
        title: '转账失败',
        description: DEFAULT_ERROR_DESCRIPTION,
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md p-8 flex flex-col gap-6 items-center">
        <div className="text-2xl font-bold text-gray-900">转账</div>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <Select
            label="转出地址"
            placeholder="请选择或输入转出地址"
            value={fromAddress}
            onChange={setFromAddress}
            options={walletOptions}
            disabled={loading}
            rightContent={
              selectedWalletInfo ? (
                <div className="flex items-center gap-2 hover:bg-gray-200 active:bg-gray-300 p-1 rounded">
                  <div className="flex items-center gap-1">
                    <BadgeDollarSign className="text-gray-600" size={16} />
                    <span className="text-sm text-gray-600">{selectedWalletInfo.balance}</span>
                  </div>
                  <RefreshCw
                    size={16}
                    className={cn('text-gray-400', walletsLoading && 'animate-spin')}
                  />
                </div>
              ) : undefined
            }
            onRightContentClick={selectedWalletInfo ? fetchWallets : undefined}
          />
          <Select
            label="转入地址"
            placeholder="请选择或输入转入地址"
            value={toAddress}
            onChange={setToAddress}
            options={walletOptions}
            disabled={loading}
          />
          <Input
            label="转账金额"
            placeholder="请输入金额"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            <div className="flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Spinner size={20} />
                  <span>转账中...</span>
                </>
              ) : (
                <span>确认转账</span>
              )}
            </div>
          </Button>
        </form>
      </Card>
    </main>
  )
}

export default TransferPage
