import * as React from 'react'
import { Popup } from './kit/popup'
import { Input } from './kit/input'
import { Textarea } from './kit/textarea'
import { Button } from './kit/button'
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

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    await onSubmit(form)
  }

  return (
    <Popup open={open} onClose={() => onOpenChange(false)} className="max-w-2xl w-full">
      <div className="max-h-[80vh] overflow-y-auto">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h3 className="text-lg font-bold mb-4">{title}</h3>
          <Section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="计划名称"
              name="planName"
              value={form.planName}
              onChange={handleChange}
              required
            />
            <Textarea
              label="跟随钱包（每行一个）"
              name="followWallets"
              value={form.followWallets}
              onChange={handleChange}
              required
              rows={3}
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
