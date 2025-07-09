import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string
  inputClassName?: string
  eyeClassName?: string
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, wrapperClassName, inputClassName, eyeClassName, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false)
    return (
      <div className={cn('relative flex items-center', wrapperClassName)}>
        <input
          ref={ref}
          type={visible ? 'text' : 'password'}
          className={cn(
            'flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition pr-10',
            className,
            inputClassName
          )}
          {...props}
        />
        <button
          type="button"
          tabIndex={-1}
          className={cn(
            'absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700',
            eyeClassName
          )}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? '隐藏密码' : '显示密码'}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
