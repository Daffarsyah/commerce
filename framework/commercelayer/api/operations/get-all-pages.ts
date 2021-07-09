export type Page = { url: string }
export type GetAllPagesResult = { pages: Page[] }
import type { CommercelayerConfig } from '../index'

export default function getAllPagesOperation() {
  function getAllPages({
    config,
    preview,
  }: {
    url?: string
    config?: Partial<CommercelayerConfig>
    preview?: boolean
  }): Promise<GetAllPagesResult> {
    return Promise.resolve({
      pages: [],
    })
  }
  return getAllPages
}
