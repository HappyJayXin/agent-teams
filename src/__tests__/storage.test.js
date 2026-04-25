import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getHistory, clearHistory } from '../utils/storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  describe('getHistory', () => {
    it('returns empty array when no history stored', () => {
      expect(getHistory()).toEqual([])
    })

    it('returns parsed history from localStorage', () => {
      const data = [{ id: '1', topic: '測試主題' }]
      localStorage.setItem('discussionHistory', JSON.stringify(data))
      expect(getHistory()).toEqual(data)
    })

    it('returns empty array when localStorage contains invalid JSON', () => {
      localStorage.setItem('discussionHistory', 'invalid-json')
      expect(getHistory()).toEqual([])
    })
  })

  describe('clearHistory', () => {
    it('removes discussionHistory from localStorage', () => {
      localStorage.setItem('discussionHistory', JSON.stringify([{ id: '1' }]))
      clearHistory()
      expect(localStorage.getItem('discussionHistory')).toBeNull()
    })

    it('returns true on success', () => {
      expect(clearHistory()).toBe(true)
    })
  })
})
