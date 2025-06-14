import * as React from 'react'
import { Popup } from './kit/popup'
import { Input } from './kit/input'
import { Textarea } from './kit/textarea'
import { Button } from './kit/button'
import Section from './kit/section'

export interface BigFormPopupProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const BigFormPopup: React.FC<BigFormPopupProps> = ({ open: openProp, onOpenChange }) => {
  const [open, setOpen] = React.useState(!!openProp)
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    desc: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    setOpen(false)
    onOpenChange?.(false)
    // TODO: add form submission logic here
  }

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
          onOpenChange?.(true)
        }}
      >
        打开表单
      </Button>
      <Popup
        open={open}
        onClose={() => {
          setOpen(false)
          onOpenChange?.(false)
        }}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h3 className="text-lg font-bold mb-4">表单示例</h3>
          <Section className="flex flex-col gap-4">
            <Input
              label="名称"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="请输入名称"
            />
            <Input
              label="邮箱"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="请输入邮箱"
            />
          </Section>
          <Section>
            <Textarea
              label="描述"
              id="desc"
              name="desc"
              value={form.desc}
              onChange={handleChange}
              placeholder="请输入描述"
            />
          </Section>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false)
                onOpenChange?.(false)
              }}
            >
              取消
            </Button>
            <Button type="submit">提交</Button>
          </div>
        </form>
      </Popup>
    </>
  )
}

export default BigFormPopup
