import * as React from 'react'
import { Button } from '@renderer/components/kit/button'
import { IconButton } from '@renderer/components/kit/icon-button'
import { Switch } from '@renderer/components/kit/switch'
import { api } from '@renderer/api'
import { useToast } from '@renderer/components/kit/toast/toast-context'
import { Edit2, Trash2, Copy, RefreshCw } from 'lucide-react'
import { cn, copyToClipboard } from '@renderer/lib/utils'
import { Dialog } from '@renderer/components/kit/dialog'
import FixedHeaderTable, { FixedHeaderTableColumn } from '../components/fixed-header-table'
import { Checkbox } from '@renderer/components/kit/checkbox'
import PlanFormPopup, { PlanFormValues } from '../components/plan-form-popup'
import { DEFAULT_ERROR_DESCRIPTION } from '@renderer/constants'

type Plan = {
  planId: string
  planName: string
  isActive: boolean
  followWallets: string[]
  buyAmount: number
  buyJito: number
  sellJito: number
  minFA: number
  maxFA: number
  up: number
  down: number
}

const PlanPage: React.FC<{
  walletId: string
  walletName: string
  walletAddress: string
}> = ({ walletId, walletName, walletAddress }) => {
  const { notify } = useToast()
  const [plans, setPlans] = React.useState<Plan[]>([])
  const [loading, setLoading] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>([])
  const [showEdit, setShowEdit] = React.useState(false)
  const [showCreate, setShowCreate] = React.useState(false)
  const [switching, setSwitching] = React.useState<string[]>([])
  const [deleting, setDeleting] = React.useState<string[]>([])
  const [confirmDeleteId, setConfirmDeleteId] = React.useState<string | null>(null)
  const [confirmBatchDelete, setConfirmBatchDelete] = React.useState(false)
  const [editPlan, setEditPlan] = React.useState<Plan | null>(null)

  const defaultPlanForm: PlanFormValues = {
    planName: '',
    followWallets: '',
    buyAmount: '0.3',
    buyJito: '0.001',
    sellJito: '0.001',
    minFA: '0.9',
    maxFA: '29.99',
    up: '0.2',
    down: '0.2'
  } as const

  const fetchPlans = React.useCallback(() => {
    setLoading(true)
    api
      .getPlans({ walletId })
      .then((res) => {
        setSelected([])
        setPlans(res?.plans ?? [])
      })
      .catch(() => {
        setPlans([])
        notify({
          title: '加载失败',
          description: DEFAULT_ERROR_DESCRIPTION,
          variant: 'destructive'
        })
      })
      .finally(() => setLoading(false))
  }, [notify, walletId])

  React.useEffect(() => {
    fetchPlans()
  }, [fetchPlans])

  const handleSelect = (planId: string, checked: boolean): void => {
    setSelected((prev) => (checked ? [...prev, planId] : prev.filter((id) => id !== planId)))
  }

  const handleSwitch = React.useCallback(
    async (planId: string): Promise<void> => {
      setSwitching((prev) => [...prev, planId])
      try {
        const res = await api.switchPlans({ planIds: [planId] })
        if (res?.success) {
          setPlans((prev) =>
            prev.map((p) => (p.planId === planId ? { ...p, isActive: !p.isActive } : p))
          )
          notify({ title: '切换成功', description: '计划已切换', variant: 'success' })
        } else {
          notify({
            title: '切换失败',
            description: DEFAULT_ERROR_DESCRIPTION,
            variant: 'destructive'
          })
        }
      } catch {
        notify({
          title: '切换失败',
          description: DEFAULT_ERROR_DESCRIPTION,
          variant: 'destructive'
        })
      } finally {
        setSwitching((prev) => prev.filter((id) => id !== planId))
      }
    },
    [notify]
  )

  const handleBatchSwitch = async (): Promise<void> => {
    setSwitching((prev) => [...prev, ...selected])
    try {
      const res = await api.switchPlans({ planIds: selected })
      if (res?.success) {
        setPlans((prev) =>
          prev.map((p) => (selected.includes(p.planId) ? { ...p, isActive: !p.isActive } : p))
        )
        notify({ title: '批量切换成功', description: '计划已批量切换', variant: 'success' })
      } else {
        notify({
          title: '批量切换失败',
          description: DEFAULT_ERROR_DESCRIPTION,
          variant: 'destructive'
        })
      }
    } catch {
      notify({
        title: '批量切换失败',
        description: DEFAULT_ERROR_DESCRIPTION,
        variant: 'destructive'
      })
    } finally {
      setSwitching((prev) => prev.filter((id) => !selected.includes(id)))
    }
  }

  const handleDelete = async (planId: string): Promise<void> => {
    setDeleting((prev) => [...prev, planId])
    try {
      const res = await api.deletePlans({ planIds: [planId] })
      if (res?.success) {
        setPlans((prev) => prev.filter((p) => p.planId !== planId))
        notify({ title: '删除成功', description: '计划已删除', variant: 'success' })
      } else {
        notify({
          title: '删除失败',
          description: DEFAULT_ERROR_DESCRIPTION,
          variant: 'destructive'
        })
      }
    } catch {
      notify({
        title: '删除失败',
        description: DEFAULT_ERROR_DESCRIPTION,
        variant: 'destructive'
      })
    } finally {
      setDeleting((prev) => prev.filter((id) => id !== planId))
    }
  }

  const handleBatchDelete = async (): Promise<void> => {
    setDeleting((prev) => [...prev, ...selected])
    try {
      const res = await api.deletePlans({ planIds: selected })
      if (res?.success) {
        setPlans((prev) => prev.filter((p) => !selected.includes(p.planId)))
        setSelected((prev) => prev.filter((id) => !selected.includes(id)))
        notify({ title: '删除成功', description: '计划已全部删除', variant: 'success' })
      } else {
        notify({
          title: '删除失败',
          description: DEFAULT_ERROR_DESCRIPTION,
          variant: 'destructive'
        })
      }
    } catch {
      notify({
        title: '删除失败',
        description: DEFAULT_ERROR_DESCRIPTION,
        variant: 'destructive'
      })
    } finally {
      setDeleting((prev) => prev.filter((id) => !selected.includes(id)))
      setConfirmBatchDelete(false)
    }
  }

  const followWalletsLengthColClass = 'hidden [@media(min-width:1024px)]:table-cell'
  const buyAmountColClass = 'hidden [@media(min-width:680px)]:table-cell'
  const upDownColClass = 'hidden [@media(min-width:800px)]:table-cell'
  const detailColClass = 'hidden [@media(min-width:968px)]:table-cell'

  const tableColumns: FixedHeaderTableColumn<Plan>[] = [
    {
      key: 'select',
      title: (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={selected.length === plans.length && plans.length > 0}
            onChange={(e) => setSelected(e.target.checked ? plans.map((p) => p.planId) : [])}
            aria-label="全选"
          />
        </div>
      ),
      render: (row) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={selected.includes(row.planId)}
            onChange={(e) => handleSelect(row.planId, e.target.checked)}
            aria-label="选择计划"
          />
        </div>
      ),
      className: 'w-[64px] text-center'
    },
    {
      key: 'planName',
      title: '计划名称',
      className: 'w-auto min-w-[120px] max-w-[320px] truncate text-left',
      render: (row) => row.planName
    },
    {
      key: 'followWalletsLength',
      title: '跟随钱包数量',
      className: cn('text-center', followWalletsLengthColClass),
      render: (row) => row.followWallets.length
    },
    {
      key: 'buyAmount',
      title: '买入数量',
      className: cn(buyAmountColClass, 'text-right'),
      render: (row) => row.buyAmount
    },
    {
      key: 'buyJito',
      title: '买入 Jito',
      className: cn(detailColClass, 'text-right'),
      render: (row) => row.buyJito
    },
    {
      key: 'sellJito',
      title: '卖出 Jito',
      className: cn(detailColClass, 'text-right'),
      render: (row) => row.sellJito
    },
    {
      key: 'faRange',
      title: 'FA 区间',
      className: cn(detailColClass, 'text-center'),
      render: (row) => `${row.minFA}~${row.maxFA}`
    },
    {
      key: 'up',
      title: '止盈比例',
      className: cn(upDownColClass, 'text-right'),
      render: (row) => row.up
    },
    {
      key: 'down',
      title: '止损比例',
      className: cn(upDownColClass, 'text-right'),
      render: (row) => row.down
    },
    {
      key: 'actions',
      title: '操作',
      className: 'p-3 text-center',
      render: (row) => (
        <div className="flex items-center justify-center gap-2 mr-1">
          <IconButton
            aria-label="编辑"
            onClick={() => {
              setEditPlan(row)
              setShowEdit(true)
            }}
          >
            <Edit2 size={18} />
          </IconButton>
          <IconButton
            aria-label="删除"
            onClick={() => setConfirmDeleteId(row.planId)}
            disabled={deleting.includes(row.planId)}
          >
            <Trash2 size={18} />
          </IconButton>
          <Switch
            checked={row.isActive}
            onCheckedChange={() => handleSwitch(row.planId)}
            disabled={switching.includes(row.planId)}
          />
        </div>
      )
    }
  ]

  const handleCreatePlan = async (values: PlanFormValues): Promise<void> => {
    try {
      await api.submitPlan({
        walletId: walletId,
        planName: values.planName,
        followWallets: values.followWallets
          .split('\n')
          .map((w) => w.trim())
          .filter(Boolean),
        buyAmount: Number(values.buyAmount),
        buyJito: Number(values.buyJito),
        sellJito: Number(values.sellJito),
        minFA: Number(values.minFA),
        maxFA: Number(values.maxFA),
        up: Number(values.up),
        down: Number(values.down)
      })
      setShowCreate(false)
      fetchPlans()
      notify({ title: '创建成功', description: '计划已创建', variant: 'success' })
    } catch {
      notify({
        title: '创建失败',
        description: DEFAULT_ERROR_DESCRIPTION,
        variant: 'destructive'
      })
    }
  }

  const handleEditPlan = async (values: PlanFormValues): Promise<void> => {
    if (!editPlan) return
    try {
      await api.submitPlan({
        planId: editPlan.planId,
        walletId: walletId,
        planName: values.planName,
        followWallets: values.followWallets
          .split('\n')
          .map((w) => w.trim())
          .filter(Boolean),
        buyAmount: Number(values.buyAmount),
        buyJito: Number(values.buyJito),
        sellJito: Number(values.sellJito),
        minFA: Number(values.minFA),
        maxFA: Number(values.maxFA),
        up: Number(values.up),
        down: Number(values.down)
      })
      setShowEdit(false)
      setEditPlan(null)
      fetchPlans()
      notify({ title: '编辑成功', description: '计划已更新', variant: 'success' })
    } catch {
      notify({
        title: '编辑失败',
        description: DEFAULT_ERROR_DESCRIPTION,
        variant: 'destructive'
      })
    }
  }

  return (
    <main className="flex-1 p-8 flex flex-col items-center bg-gray-50">
      <div className="flex flex-col gap-6 h-fit max-h-full w-full max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-lg font-bold text-gray-900 flex items-center gap-1">
              {walletName}
              <IconButton
                aria-label="刷新计划列表"
                className="ml-1"
                disabled={loading}
                onClick={fetchPlans}
              >
                <RefreshCw size={16} className={cn(loading && 'animate-spin')} />
              </IconButton>
            </div>
            <div className="text-xs text-gray-500 break-all flex items-center gap-1">
              {walletAddress}
              <IconButton
                aria-label="复制钱包地址"
                className="ml-1"
                onClick={() => {
                  copyToClipboard(walletAddress)
                  notify({
                    title: '已复制',
                    description: '钱包地址已复制到剪贴板',
                    variant: 'success'
                  })
                }}
              >
                <Copy size={14} />
              </IconButton>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              disabled={!selected.length}
              onClick={() => setConfirmBatchDelete(true)}
            >
              批量删除
            </Button>
            <Button variant="outline" disabled={!selected.length} onClick={handleBatchSwitch}>
              批量切换
            </Button>
            <Button onClick={() => setShowCreate(true)}>创建计划</Button>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-xl shadow-md border border-gray-200 p-0 overflow-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-400">加载中...</div>
          ) : plans.length === 0 ? (
            <div className="p-8 text-center text-gray-400">暂无计划</div>
          ) : (
            <FixedHeaderTable
              columns={tableColumns}
              data={plans}
              rowKey={(row) => row.planId}
              className="flex flex-col h-fit max-h-full text-sm"
            />
          )}
        </div>
      </div>
      <Dialog
        open={!!confirmDeleteId}
        title="确认删除"
        description="确定要删除该计划吗？"
        confirmText="确认"
        cancelText="取消"
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={() => {
          if (confirmDeleteId) handleDelete(confirmDeleteId)
          setConfirmDeleteId(null)
        }}
      />
      <Dialog
        open={confirmBatchDelete}
        title="批量删除"
        description={`确定要删除选中的 ${selected.length} 个计划吗？`}
        confirmText="确认"
        cancelText="取消"
        onCancel={() => setConfirmBatchDelete(false)}
        onConfirm={handleBatchDelete}
      />
      {showEdit && editPlan && (
        <PlanFormPopup
          open={showEdit}
          onOpenChange={(open) => {
            setShowEdit(open)
            if (!open) setEditPlan(null)
          }}
          title="编辑计划"
          initialValues={{
            planName: editPlan.planName,
            followWallets: editPlan.followWallets.join('\n'),
            buyAmount: String(editPlan.buyAmount),
            buyJito: String(editPlan.buyJito),
            sellJito: String(editPlan.sellJito),
            minFA: String(editPlan.minFA),
            maxFA: String(editPlan.maxFA),
            up: String(editPlan.up),
            down: String(editPlan.down)
          }}
          onSubmit={handleEditPlan}
        />
      )}
      {showCreate && (
        <PlanFormPopup
          open={showCreate}
          onOpenChange={setShowCreate}
          title="创建计划"
          initialValues={defaultPlanForm}
          onSubmit={handleCreatePlan}
        />
      )}
    </main>
  )
}

export default PlanPage
