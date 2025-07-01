import * as React from 'react'
import { Popup } from './kit/popup'
import { Input } from './kit/input'
import { Button } from './kit/button'
import { WalletInput } from './kit/wallet-input'
import Section from './kit/section'

export interface PlanFormPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  initialValues: PlanFormValues
  loading?: boolean
  onSubmit: (values: PlanFormValues) => void | Promise<void>
}

export interface PlanFormValues {
  planName: string
  followWallets: string
  buyAmount: string
  buyJito: string
  sellJito: string
  minFA: string
  maxFA: string
  up: string
  down: string
}

export const PlanFormPopup: React.FC<PlanFormPopupProps> = ({
  open,
  onOpenChange,
  title,
  initialValues,
  loading,
  onSubmit
}) => {
  const [form, setForm] = React.useState<PlanFormValues>(initialValues)
  React.useEffect(() => {
    if (open) setForm(initialValues)
  }, [open, initialValues])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleWalletChange = (value: string): void => {
    setForm((prev) => ({ ...prev, followWallets: value }))
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    await onSubmit(form)
  }

  return (
    <Popup open={open} onClose={() => onOpenChange(false)} className="max-w-4xl w-full">
      <div className="h-fit max-h-[90vh] overflow-y-auto">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h3 className="text-lg font-bold mb-4">{title}</h3>
          <div className="space-y-4">
            <Section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="计划名称"
                name="planName"
                value={form.planName}
                onChange={handleChange}
                required
              />
              <Input
                label="买入数量"
                name="buyAmount"
                value={form.buyAmount}
                onChange={handleChange}
                required
                type="number"
              />
              <Input
                label="买入 Jito"
                name="buyJito"
                value={form.buyJito}
                onChange={handleChange}
                required
                type="number"
              />
              <Input
                label="卖出 Jito"
                name="sellJito"
                value={form.sellJito}
                onChange={handleChange}
                required
                type="number"
              />
              <Input
                label="最小 FA"
                name="minFA"
                value={form.minFA}
                onChange={handleChange}
                required
                type="number"
              />
              <Input
                label="最大 FA"
                name="maxFA"
                value={form.maxFA}
                onChange={handleChange}
                required
                type="number"
              />
              <Input
                label="止盈比例"
                name="up"
                value={form.up}
                onChange={handleChange}
                required
                type="number"
              />
              <Input
                label="止损比例"
                name="down"
                value={form.down}
                onChange={handleChange}
                required
                type="number"
              />
            </Section>
            <Section className="grid grid-cols-1 gap-4">
              <WalletInput
                label="跟随钱包"
                value={form.followWallets}
                onChange={handleWalletChange}
                required
                maxWallets={10}
              />
            </Section>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit" disabled={loading}>
              提交
            </Button>
          </div>
        </form>
      </div>
    </Popup>
  )
}

export default PlanFormPopup
