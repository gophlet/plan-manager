import * as React from 'react'
import { BadgeDollarSign, RefreshCw } from 'lucide-react'
import { api } from '@renderer/api'
import { useToast } from '@renderer/components/kit/toast/toast-context'
import Card from '../components/kit/card'
import { Select, SelectOption } from '../components/kit/select'
import { Input } from '../components/kit/input'
import { Button } from '../components/kit/button'
import { Spinner } from '../components/kit/spinner'
import { Switch } from '../components/kit/switch'
import { DEFAULT_ERROR_DESCRIPTION, Transaction } from '@renderer/constants'
import { WalletInfoList } from '@renderer/api/modules/wallet'
import { cn } from '@renderer/lib/utils'
import EmojiBackground from '../components/emoji-background'
import { TransactionType } from '@renderer/api/modules/swap'

const swapEmojis = ['🔄', '💱', '🔀', '🪙', '⚖️', '🏦']

const SwapPage: React.FC = () => {
  const { notify } = useToast()
  const [walletId, setWalletId] = React.useState('')
  const [mint, setMint] = React.useState('')
  const [amountOrPercent, setAmountOrPercent] = React.useState('')
  const [type, setType] = React.useState<TransactionType>(Transaction.BUY)
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
        value: wallet.walletId,
        label: `${wallet.walletName} (${wallet.walletAddress.slice(0, 6)}...${wallet.walletAddress.slice(-4)})`
      })),
    [wallets]
  )

  const getSelectedWalletInfo = (id: string): WalletInfoList[0] | null => {
    return wallets.find((w) => w.walletId === id) || null
  }

  const selectedWalletInfo = walletId ? getSelectedWalletInfo(walletId) : null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!walletId.trim() || !mint.trim() || !amountOrPercent.trim()) {
      notify({ title: '参数错误', description: '请填写所有字段', variant: 'destructive' })
      return
    }

    const amountOrPercentNum = Number(amountOrPercent)
    if (isNaN(amountOrPercentNum) || amountOrPercentNum <= 0) {
      notify({
        title: type === Transaction.BUY ? '买入数量不合法' : '卖出百分比不合法',
        description:
          type === Transaction.BUY ? '请输入大于 0 的买入数量' : '请输入 0 ~ 100 之间的百分比',
        variant: 'destructive'
      })
      return
    }

    if (type === Transaction.SELL && amountOrPercentNum > 100) {
      notify({
        title: '卖出百分比不合法',
        description: '卖出百分比不能超过 100%',
        variant: 'destructive'
      })
      return
    }

    setLoading(true)
    try {
      const res = await api.swap({
        walletId,
        mint,
        amountOrPercent: amountOrPercentNum,
        type
      })
      if (res?.success) {
        notify({
          title: '兑换成功',
          description: `${type === Transaction.BUY ? '买入' : '卖出'}操作已完成`,
          variant: 'success'
        })
        setWalletId('')
        setMint('')
        setAmountOrPercent('')
        await fetchWallets()
      } else {
        notify({
          title: '兑换失败',
          description: DEFAULT_ERROR_DESCRIPTION,
          variant: 'destructive'
        })
      }
    } catch {
      notify({
        title: '兑换失败',
        description: DEFAULT_ERROR_DESCRIPTION,
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleTypeToggle = (checked: boolean): void => {
    setType(checked ? Transaction.SELL : Transaction.BUY)
    setAmountOrPercent('')
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <EmojiBackground emojis={swapEmojis} />
      <Card className="w-full max-w-md p-8 flex flex-col gap-6 items-center z-1">
        <div className="text-2xl font-bold text-gray-900">兑换</div>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <Select
            label="选择钱包"
            placeholder="请选择或输入兑换操作的钱包 ID"
            value={walletId}
            onChange={setWalletId}
            options={walletOptions}
            disabled={loading}
            rightContent={
              selectedWalletInfo ? (
                <div className="flex items-center gap-2 hover:bg-gray-200 active:bg-gray-300 p-1 rounded">
                  <div className="flex items-center gap-1">
                    <BadgeDollarSign className="text-gray-600" size={16} />
                    <span className="text-sm text-gray-600 font-mono">
                      {selectedWalletInfo.balance}
                    </span>
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

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">交易类型</label>
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'text-sm',
                  type === Transaction.BUY ? 'text-green-600 font-medium' : 'text-gray-500'
                )}
              >
                买入
              </span>
              <Switch
                checked={type === Transaction.SELL}
                onCheckedChange={handleTypeToggle}
                disabled={loading}
              />
              <span
                className={cn(
                  'text-sm',
                  type === Transaction.SELL ? 'text-red-600 font-medium' : 'text-gray-500'
                )}
              >
                卖出
              </span>
            </div>
          </div>

          <Input
            label="代币"
            placeholder="请输入代币合约地址"
            value={mint}
            onChange={(e) => setMint(e.target.value)}
            disabled={loading}
          />

          <Input
            label={type === Transaction.BUY ? '买入数量' : '卖出百分比 (%)'}
            placeholder={type === Transaction.BUY ? '请输入买入数量' : '请输入卖出百分比 (0-100)'}
            type="number"
            value={amountOrPercent}
            onChange={(e) => setAmountOrPercent(e.target.value)}
            disabled={loading}
            min={type === Transaction.SELL ? '0' : undefined}
            max={type === Transaction.SELL ? '100' : undefined}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            <div className="flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Spinner size={20} />
                  <span>兑换中...</span>
                </>
              ) : (
                <span>确认{type === Transaction.BUY ? '买入' : '卖出'}</span>
              )}
            </div>
          </Button>
        </form>
      </Card>
    </main>
  )
}

export default SwapPage
