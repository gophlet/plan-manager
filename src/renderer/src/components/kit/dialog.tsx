import * as React from 'react'
import { Popup } from './popup'
import { Button } from './button'

interface DialogProps {
  open: boolean
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  title = '提示',
  description = '',
  confirmText = '确认',
  cancelText = '取消',
  onConfirm,
  onCancel
}) => {
  return (
    <Popup open={open} onClose={onCancel} closeOnBackdropClick>
      <div className="font-bold text-base mb-2">{title}</div>
      {description && <div className="text-sm text-gray-700 mb-4">{description}</div>}
      <div className="flex justify-end gap-2 mt-2">
        <Button variant="outline" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </Popup>
  )
}
