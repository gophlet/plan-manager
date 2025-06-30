import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn, genId } from '../../lib/utils'
import { CloseButton } from './close-button'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  label?: React.ReactNode
  labelClassName?: string
  wrapperClassName?: string
  className?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  options?: SelectOption[]
  allowCustomInput?: boolean
  disabled?: boolean
  rightContent?: React.ReactNode
  onRightContentClick?: () => void
  id?: string
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      label,
      labelClassName,
      wrapperClassName,
      placeholder = '请选择或输入',
      value = '',
      onChange,
      options = [],
      allowCustomInput = true,
      disabled = false,
      rightContent,
      onRightContentClick,
      id,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState('')
    const [selectedTag, setSelectedTag] = React.useState<SelectOption | null>(null)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const selectId = id || (label ? genId('select') : undefined)

    React.useEffect(() => {
      if (value) {
        const existingOption = options.find((opt) => opt.value === value)
        if (existingOption) {
          setSelectedTag(existingOption)
          setInputValue('')
        } else {
          setSelectedTag(null)
          setInputValue(value)
        }
      } else {
        setSelectedTag(null)
        setInputValue('')
      }
    }, [value, options])

    React.useEffect(() => {
      if (!isOpen) return

      const handleClickOutside = (event: MouseEvent): void => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      const handleEsc = (e: KeyboardEvent): void => {
        if (e.key === 'Escape') setIsOpen(false)
      }

      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEsc)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleEsc)
      }
    }, [isOpen])

    const handleOptionClick = (option: SelectOption): void => {
      setSelectedTag(option)
      setInputValue('')
      setIsOpen(false)
      onChange?.(option.value)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value
      setInputValue(newValue)
      setSelectedTag(null)
      if (allowCustomInput) {
        onChange?.(newValue)
      }
    }

    const handleInputFocus = (): void => {
      if (options.length > 0) {
        setIsOpen(true)
      }
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter' && allowCustomInput) {
        setIsOpen(false)
        onChange?.(inputValue)
      }
    }

    const handleTagRemove = (): void => {
      setSelectedTag(null)
      setInputValue('')
      onChange?.('')
      inputRef.current?.focus()
    }

    const handleDropdownToggle = (): void => {
      if (disabled) return
      if (options.length > 0) {
        setIsOpen(!isOpen)
      }
      if (!isOpen) {
        inputRef.current?.focus()
      }
    }

    const filteredOptions = options.filter(
      (option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.value.toLowerCase().includes(inputValue.toLowerCase())
    )

    return label ? (
      <div className={cn('flex flex-col gap-2', wrapperClassName)}>
        <label
          htmlFor={selectId}
          className={cn('text-sm font-medium text-gray-700', labelClassName)}
        >
          {label}
        </label>
        <div className="relative" ref={dropdownRef}>
          <div
            className={cn(
              'relative flex h-10 w-full rounded-md border border-gray-300 bg-background ring-offset-background focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition',
              disabled && 'cursor-not-allowed opacity-50',
              className
            )}
            ref={ref}
            {...props}
          >
            {selectedTag ? (
              <div className="flex items-center px-3 py-2 flex-1">
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-sm font-medium">
                  {selectedTag.label}
                  <CloseButton
                    iconSize={12}
                    className="ml-1 -mr-1 p-0.5 text-blue-600 hover:text-blue-800"
                    onClick={handleTagRemove}
                    disabled={disabled}
                  />
                </span>
              </div>
            ) : (
              <input
                ref={inputRef}
                id={selectId}
                type="text"
                value={inputValue}
                placeholder={placeholder}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onKeyDown={handleInputKeyDown}
                disabled={disabled}
                className="flex-1 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none"
              />
            )}

            <div className="flex items-center">
              {rightContent && (
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={onRightContentClick}
                  disabled={disabled}
                >
                  {rightContent}
                </button>
              )}
              {options.length > 0 && (
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={handleDropdownToggle}
                  disabled={disabled}
                >
                  <ChevronDown
                    size={16}
                    className={cn('transition-transform', isOpen && 'rotate-180')}
                  />
                </button>
              )}
            </div>
          </div>

          {isOpen && filteredOptions.length > 0 && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  onClick={() => handleOptionClick(option)}
                >
                  <div className="font-medium">{option.label}</div>
                  {option.value !== option.label && (
                    <div className="text-xs text-gray-500 mt-1">{option.value}</div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    ) : (
      <div className="relative" ref={dropdownRef}>
        <div
          className={cn(
            'relative flex h-10 w-full rounded-md border border-gray-300 bg-background ring-offset-background focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition',
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
          ref={ref}
          {...props}
        >
          {selectedTag ? (
            <div className="flex items-center px-3 py-2 flex-1">
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-sm font-medium">
                {selectedTag.label}
                <CloseButton
                  iconSize={12}
                  className="ml-1 -mr-1 p-0.5 text-blue-600 hover:text-blue-800"
                  onClick={handleTagRemove}
                  disabled={disabled}
                />
              </span>
            </div>
          ) : (
            <input
              ref={inputRef}
              id={selectId}
              type="text"
              value={inputValue}
              placeholder={placeholder}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={handleInputKeyDown}
              disabled={disabled}
              className="flex-1 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none"
            />
          )}

          <div className="flex items-center">
            {rightContent && (
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={onRightContentClick}
                disabled={disabled}
              >
                {rightContent}
              </button>
            )}
            {options.length > 0 && (
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={handleDropdownToggle}
                disabled={disabled}
              >
                <ChevronDown
                  size={16}
                  className={cn('transition-transform', isOpen && 'rotate-180')}
                />
              </button>
            )}
          </div>
        </div>

        {isOpen && filteredOptions.length > 0 && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                onClick={() => handleOptionClick(option)}
              >
                <div className="font-medium">{option.label}</div>
                {option.value !== option.label && (
                  <div className="text-xs text-gray-500 mt-1">{option.value}</div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }
