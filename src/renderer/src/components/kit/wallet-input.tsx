import * as React from 'react'
import { cn, genId } from '../../lib/utils'

export interface WalletInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: React.ReactNode
  labelClassName?: string
  wrapperClassName?: string
  maxWallets?: number
  onChange?: (value: string) => void
}

export const WalletInput = React.forwardRef<HTMLTextAreaElement, WalletInputProps>(
  (
    {
      className,
      label,
      labelClassName,
      wrapperClassName,
      id,
      maxWallets = 10,
      onChange,
      value = '',
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? genId('wallet-textarea') : undefined)
    const [error, setError] = React.useState<string>('')
    const setExceededError = (): void => {
      setError(`最多只能添加 ${maxWallets} 个钱包地址`)
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const newValue = e.target.value
      const lines = newValue.split('\n').filter((line) => line.trim() !== '')
      const totalLines = newValue.split('\n').length
      const prevLines = (value as string).split('\n')

      if (lines.length >= maxWallets && totalLines > prevLines.length) {
        setExceededError()
        return
      }
      if (lines.length > maxWallets) {
        setExceededError()
        return
      }
      setError('')
      onChange?.(newValue)
    }

    const walletCount = React.useMemo(() => {
      const lines = (value as string).split('\n').filter((line) => line.trim() !== '')
      return lines.length
    }, [value])

    return label ? (
      <div className={cn('flex flex-col gap-2', wrapperClassName)}>
        <div className="flex items-center justify-between">
          <label
            htmlFor={textareaId}
            className={cn('text-sm font-medium text-gray-700', labelClassName)}
          >
            {label}
          </label>
          <span
            className={cn('text-xs', walletCount > maxWallets ? 'text-red-500' : 'text-gray-500')}
          >
            {walletCount}/{maxWallets}
          </span>
        </div>
        <textarea
          id={textareaId}
          className={cn(
            'flex min-h-[120px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition resize-none font-mono',
            error ? 'border-red-300 focus-visible:ring-red-500' : 'border-gray-300',
            className
          )}
          ref={ref}
          value={value}
          onChange={handleChange}
          placeholder="每行输入一个钱包地址..."
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    ) : (
      <div className="flex flex-col gap-2">
        <textarea
          className={cn(
            'flex min-h-[120px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition resize-none font-mono',
            error ? 'border-red-300 focus-visible:ring-red-500' : 'border-gray-300',
            className
          )}
          ref={ref}
          id={textareaId}
          value={value}
          onChange={handleChange}
          placeholder="每行输入一个钱包地址..."
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    )
  }
)
WalletInput.displayName = 'WalletInput'

export default WalletInput
