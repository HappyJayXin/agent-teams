import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.stubEnv('VITE_LLM_API_KEY', 'valid-key-longer-than-10-chars')
vi.stubEnv('VITE_LLM_BASE_URL', 'https://api.example.com/v1')
vi.stubEnv('VITE_LLM_DEFAULT_MODEL', 'test-model')

const { useApiService } = await import('../services/apiService')

describe('useApiService - getAiResponse', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sends system message with rolePrompt and user message', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ choices: [{ message: { content: '回應' } }] }),
    })
    const { getAiResponse } = useApiService()
    await getAiResponse('你是正方', '討論主題')

    const [, options] = fetch.mock.calls[0]
    const body = JSON.parse(options.body)
    expect(body.messages).toEqual([
      { role: 'system', content: '你是正方' },
      { role: 'user', content: '討論主題' },
    ])
  })

  it('returns the content from the API', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ choices: [{ message: { content: '正方論點' } }] }),
    })
    const { getAiResponse } = useApiService()
    const result = await getAiResponse('你是正方', '討論主題')
    expect(result).toBe('正方論點')
  })

  it('returns null when API fails', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500 })
    const { getAiResponse } = useApiService()
    const result = await getAiResponse('你是正方', '討論主題')
    expect(result).toBeNull()
  })
})
