import type { Response } from '@vercel/fetch'
import { ZodError } from 'zod'

export class CommerceAPIError extends Error {
  status: number
  res: Response
  data: any

  constructor(msg: string, res: Response, data?: any) {
    super(msg)
    this.name = 'CommerceApiError'
    this.status = res.status
    this.res = res
    this.data = data
  }
}

export class CommerceNetworkError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'CommerceNetworkError'
  }
}

export const normalizeZodIssues = (issues: ZodError['issues']) =>
  issues.map((e, index) => ({
    message: `Error #${index + 1} ${
      e.path.length > 0 ? `Path: ${e.path.join('.')}, ` : ''
    }Code: ${e.code}, Message: ${e.message}`,
  }))

export const normalizeError = (error: unknown) => {
  if (error instanceof CommerceAPIError) {
    return {
      status: error.status || 500,
      data: error.data || null,
      errors: [
        { message: 'An unexpected error ocurred with the Commerce API' },
      ],
    }
  }

  if (error instanceof ZodError) {
    return {
      status: 400,
      data: null,
      errors: normalizeZodIssues(error.issues),
    }
  }

  return {
    status: 500,
    data: null,
    errors: [{ message: 'An unexpected error ocurred' }],
  }
}
