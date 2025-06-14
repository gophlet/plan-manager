import React, { useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react'
import { cn } from '@renderer/lib/utils'

export interface FixedHeaderTableColumn<T> {
  key: string
  title: React.ReactNode
  render?: (row: T, rowIndex: number) => React.ReactNode
  className?: string
  hide?: boolean
}

export interface FixedHeaderTableProps<T> {
  columns: FixedHeaderTableColumn<T>[]
  data: T[]
  rowKey: (row: T, rowIndex: number) => React.Key
  className?: string
  style?: React.CSSProperties
  renderRow?: (row: T, rowIndex: number, cells: React.ReactNode[]) => React.ReactNode
  onSync?: () => void
}

export interface FixedHeaderTableRef {
  syncColumnWidths: () => void
}

function FixedHeaderTableInner<T extends Record<string, unknown>>(
  { columns, data, rowKey, className, style, renderRow, onSync }: FixedHeaderTableProps<T>,
  ref: React.ForwardedRef<FixedHeaderTableRef>
): React.ReactElement {
  const theadRef = useRef<HTMLTableSectionElement>(null)
  const tbodyRef = useRef<HTMLTableSectionElement>(null)
  const scrollBodyRef = useRef<HTMLDivElement>(null)
  const colWidths = useRef<number[]>([])
  const resizeObserver = useRef<ResizeObserver | null>(null)

  const visibleColumns = columns.filter((col) => !col.hide)

  const syncColumnWidths = useCallback(() => {
    if (!tbodyRef.current || !theadRef.current) return
    const bodyRows = Array.from(tbodyRef.current.rows)
    const colCount = visibleColumns.length
    const maxWidths: number[] = Array(colCount).fill(0)

    bodyRows.forEach((row) => {
      Array.from(row.cells).forEach((cell, i) => {
        maxWidths[i] = Math.max(maxWidths[i], cell.offsetWidth)
      })
    })

    const headRow = theadRef.current.rows[0]
    if (headRow) {
      Array.from(headRow.cells).forEach((cell, i) => {
        maxWidths[i] = Math.max(maxWidths[i], cell.offsetWidth)
      })
    }

    Array.from(headRow?.cells || []).forEach((cell, i) => {
      cell.style.width = maxWidths[i] + 'px'
    })

    bodyRows.forEach((row) => {
      Array.from(row.cells).forEach((cell, i) => {
        cell.style.width = maxWidths[i] + 'px'
      })
    })
    colWidths.current = maxWidths
    onSync?.()
  }, [visibleColumns, onSync])

  useEffect(() => {
    syncColumnWidths()
    if (resizeObserver.current) resizeObserver.current.disconnect()
    resizeObserver.current = new ResizeObserver(() => {
      syncColumnWidths()
    })
    if (scrollBodyRef.current) resizeObserver.current.observe(scrollBodyRef.current)
    window.addEventListener('resize', syncColumnWidths)
    return () => {
      resizeObserver.current?.disconnect()
      window.removeEventListener('resize', syncColumnWidths)
    }
  }, [data, visibleColumns, syncColumnWidths])

  useImperativeHandle(ref, () => ({ syncColumnWidths }), [syncColumnWidths])

  useEffect(() => {
    const scroll = (e: Event): void => {
      if (!theadRef.current || !scrollBodyRef.current) return
      theadRef.current.parentElement!.scrollLeft = (e.target as HTMLDivElement).scrollLeft
    }
    const body = scrollBodyRef.current
    body?.addEventListener('scroll', scroll)
    return () => body?.removeEventListener('scroll', scroll)
  }, [])

  return (
    <div className={cn('w-full relative', className)} style={style}>
      <div className="overflow-hidden shadow-sm">
        <table className="w-full table-auto border-b border-gray-200 bg-gray-50">
          <thead ref={theadRef}>
            <tr className="p-3 font-medium text-gray-700 whitespace-nowrap text-left">
              {visibleColumns.map((col) => (
                <th key={col.key} className={col.className}>
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      <div ref={scrollBodyRef} className="overflow-y-auto overflow-x-auto max-h-[420px] w-full">
        <table className="w-full table-auto">
          <tbody ref={tbodyRef}>
            {data.map((row, rowIndex) => {
              const cells = visibleColumns.map((col) => {
                let content: React.ReactNode = null
                if (col.render) {
                  content = col.render(row, rowIndex)
                } else if (col.key in row) {
                  content = row[col.key as keyof T] as React.ReactNode
                }
                return (
                  <td key={col.key} className={col.className}>
                    {content}
                  </td>
                )
              })
              return renderRow ? (
                renderRow(row, rowIndex, cells)
              ) : (
                <tr
                  key={rowKey(row, rowIndex)}
                  className="p-3 border-t border-gray-100 align-middle whitespace-nowrap text-left hover:bg-gray-50 transition"
                >
                  {cells}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const FixedHeaderTable = forwardRef(FixedHeaderTableInner) as <T extends Record<string, unknown>>(
  props: FixedHeaderTableProps<T> & { ref?: React.ForwardedRef<FixedHeaderTableRef> }
) => React.ReactElement | null

export default FixedHeaderTable
