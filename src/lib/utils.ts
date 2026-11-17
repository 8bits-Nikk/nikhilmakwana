import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const mergeClasses = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

const MONTH_YEAR: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
}

export const formatMonthYear = (date: Date) =>
  new Intl.DateTimeFormat('en-US', MONTH_YEAR).format(date)

/** "Nov 2021 — Aug 2025" / "Aug 2025 — Present" */
export const formatDateRange = (
  startDate: Date,
  endDate?: Date,
  currentlyWorkHere?: boolean,
) => {
  const end = currentlyWorkHere
    ? 'Present'
    : endDate
      ? formatMonthYear(endDate)
      : 'NA'

  return `${formatMonthYear(startDate)} — ${end}`
}

/** "3 yrs 9 mos", rounded to whole months. */
export const formatDuration = (startDate: Date, endDate: Date = new Date()) => {
  const totalMonths = Math.max(
    1,
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth()),
  )
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  const parts: string[] = []
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
  if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`)

  return parts.join(' ')
}
