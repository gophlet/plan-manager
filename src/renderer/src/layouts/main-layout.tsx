import * as React from 'react'
import { Outlet, useNavigate, useParams } from 'react-router'
import { useToast } from '@renderer/components/kit/toast/toast-context'
import { /*Settings, */ Wallet, RefreshCw, LogOut, BadgeDollarSign } from 'lucide-react'
import { IconButton } from '../components/kit/icon-button'
import { Skeleton } from '../components/kit/skeleton'
import Sidebar from '../components/sidebar'
import SidebarHeader from '../components/sidebar-header'
import { api } from '@renderer/api'
import { DEFAULT_ERROR_DESCRIPTION, RouteName } from '@renderer/constants'
// import { FormPopup } from '../components/kit/form-popup'
// import { Input } from '../components/kit/input'
import { Dialog } from '../components/kit/dialog'
import { cn, formatRaw } from '@renderer/lib/utils'
import { Alert } from '../components/kit/alert'
import { useAuthStore } from '@renderer/store/auth'
import { WalletInfoList } from '@renderer/api/modules/wallet'

const MainLayout = (): React.JSX.Element => {
  const { notify } = useToast()
  const navigate = useNavigate()
  const clearToken = useAuthStore((state) => state.clearToken)
  const params = useParams<{ walletId?: string }>()
  const [activeKey, setActiveKey] = React.useState('')
  const [loadingWallets, setLoadingWallets] = React.useState(false)
  const [wallets, setWallets] = React.useState<WalletInfoList>([])

  const [dialog, setDialog] = React.useState<{
    open: boolean
    title: string
    description: string
    onConfirm: () => void
  }>({ open: false, title: '', description: '', onConfirm: () => {} })

  // const [renamePopup, setRenamePopup] = React.useState<{
  //   open: boolean
  //   walletId: string | null
  //   walletName: string
  // }>({ open: false, walletId: null, walletName: '' })

  const selectedWallet = React.useMemo(() => {
    if (!params.walletId) return null
    return wallets.find((w) => w.walletId === params.walletId) || null
  }, [params.walletId, wallets])

  const fetchWallets = React.useCallback(async () => {
    setLoadingWallets(true)
    try {
      const res = await api.getWallets()
      setWallets(res?.wallets ?? [])
    } catch {
      notify({
        title: '获取钱包失败',
        description: DEFAULT_ERROR_DESCRIPTION,
        variant: 'destructive'
      })
      setWallets([])
    } finally {
      setLoadingWallets(false)
    }
  }, [notify])

  React.useEffect(() => {
    fetchWallets()
  }, [fetchWallets])

  React.useEffect(() => {
    if (selectedWallet) {
      setActiveKey(selectedWallet.walletId)
    } else {
      setActiveKey('')
    }
  }, [selectedWallet])

  const handleSidebarSelect = (key: string): void => {
    const wallet = wallets.find((w) => w.walletId === key)
    if (wallet) {
      navigate(`${RouteName.WALLET}/${wallet.walletId}`)
      setActiveKey(key)
      return
    }
    // if (key === 'settings') {
    //   notify({ title: '设置', description: 'TODO: 跳转设置页面', variant: 'info' })
    //   setActiveKey(key)
    // }
    if (key === 'logout') {
      setDialog({
        open: true,
        title: '注销确认',
        description: '确定退出登录吗？',
        onConfirm: () => {
          setDialog((d) => ({ ...d, open: false }))
          clearToken()
          notify({ title: '已注销', description: '您已成功退出登录', variant: 'success' })
        }
      })
    }
  }

  const sidebarGroupsData = React.useMemo(
    () => [
      {
        title: '钱包列表',
        headerRight: (
          <IconButton
            key="refresh"
            aria-label="刷新钱包"
            disabled={loadingWallets}
            onClick={(e) => {
              e.stopPropagation()
              fetchWallets()
            }}
          >
            <RefreshCw size={16} className={cn(loadingWallets && 'animate-spin')} />
          </IconButton>
        ),
        skeleton: loadingWallets ? (
          <div className="flex flex-col gap-2">
            <Skeleton height={48} radius={6} className="px-3" />
            <Skeleton height={48} radius={6} className="px-3" />
            <Skeleton height={48} radius={6} className="px-3" />
          </div>
        ) : wallets.length === 0 ? (
          <Alert variant="warning" className="text-left">
            暂无钱包数据
          </Alert>
        ) : undefined,
        items: wallets.map((w) => ({
          key: w.walletId,
          icon: <Wallet />,
          label: (
            <div className="flex flex-col gap-1 items-start">
              <span className="w-full truncate">{w.walletName}</span>
              <span className="w-full flex items-center text-xs text-gray-500 gap-1">
                <BadgeDollarSign size={14} />
                <span className="flex-1 truncate">{formatRaw(w.balance)}</span>
              </span>
            </div>
          ),
          route: `${RouteName.WALLET}/${w.walletId}`,
          walletId: w.walletId,
          walletAddress: w.walletAddress
          // menu: [
          //   {
          //     label: '重命名',
          //     onClick: () =>
          //       setRenamePopup({ open: true, walletId: w.walletId, walletName: w.walletName })
          //   },
          //   {
          //     label: '删除',
          //     onClick: () =>
          //       setDialog({
          //         open: true,
          //         title: '删除',
          //         description: `确定要删除 ${w.walletName} 吗？`,
          //         onConfirm: () => {
          //           setDialog((d) => ({ ...d, open: false }))
          //           notify({
          //             title: '删除钱包',
          //             description: `已删除 ${w.walletName}`,
          //             variant: 'success'
          //           })
          //           if (selectedWallet?.walletId === w.walletId) {
          //             navigate(RouteName.DASHBOARD)
          //           } else {
          //             fetchWallets()
          //           }
          //         }
          //       })
          //   }
          // ]
        }))
      },
      {
        title: '系统',
        items: [
          // {
          //   key: 'settings',
          //   icon: <Settings />,
          //   label: '设置'
          // },
          {
            key: 'logout',
            icon: <LogOut />,
            label: '注销'
          }
        ]
      }
    ],
    [loadingWallets, wallets, fetchWallets]
  )
  const sidebarGroups = React.useMemo(
    () =>
      sidebarGroupsData.map((group) => ({
        ...group,
        items: group.items.map((item) => ({ ...item, active: item.key === activeKey }))
      })),
    [activeKey, sidebarGroupsData]
  )
  return (
    <div className="h-full flex bg-gray-50">
      <Sidebar header={<SidebarHeader />} groups={sidebarGroups} onSelect={handleSidebarSelect} />
      <Outlet context={selectedWallet} />
      {/* <FormPopup
        open={renamePopup.open}
        title="重命名钱包"
        initialValues={{ name: renamePopup.walletName }}
        onOpenChange={(open) => setRenamePopup((prev) => ({ ...prev, open }))}
        onSubmit={async (values) => {
          // TODO: 实现重命名逻辑
          setRenamePopup({ open: false, walletId: null, walletName: '' })
          notify({ title: '重命名', description: `已重命名为 ${values.name}`, variant: 'success' })
          await fetchWallets()
        }}
      >
        {(form, handleChange) => (
          <Input
            label="新名称"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="请输入新名称"
            autoFocus
          />
        )}
      </FormPopup> */}
      <Dialog
        open={dialog.open}
        title={dialog.title}
        description={dialog.description}
        onConfirm={dialog.onConfirm}
        onCancel={() => setDialog((d) => ({ ...d, open: false }))}
      />
    </div>
  )
}

export default MainLayout
