import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

// inject env before importing the module
vi.stubEnv('VITE_LLM_API_KEY', 'valid-key-longer-than-10-chars')
vi.stubEnv('VITE_LLM_BASE_URL', 'https://api.example.com/v1')
vi.stubEnv('VITE_LLM_DEFAULT_MODEL', 'test-model')

const { useLlmApi } = await import('../services/llmApi')

describe('useLlmApi - validateApiKey', () => {
  it('returns true when API key is longer than 10 chars', () => {
    const { validateApiKey } = useLlmApi()
    expect(validateApiKey()).toBe(true)
  })
})

describe('useLlmApi - callLlmApi', () => {
  let llm

  beforeEach(() => {
    llm = useLlmApi()
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sets isLoading to false after successful call', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ choices: [{ message: { content: '回應內容' } }] }),
    })
    await llm.callLlmApi([{ role: 'user', content: 'hello' }])
    expect(llm.isLoading.value).toBe(false)
  })

  it('returns content from API response', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ choices: [{ message: { content: '測試回應' } }] }),
    })
    const result = await llm.callLlmApi([{ role: 'user', content: 'hello' }])
    expect(result).toBe('測試回應')
  })

  it('sets error and returns null when response is not ok', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 401 })
    const result = await llm.callLlmApi([{ role: 'user', content: 'hello' }])
    expect(result).toBeNull()
    expect(llm.error.value).toContain('401')
  })

  it('sets error and returns null when fetch throws', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))
    const result = await llm.callLlmApi([{ role: 'user', content: 'hello' }])
    expect(result).toBeNull()
    expect(llm.error.value).toBe('Network error')
  })

  it('clears previous error before new call', async () => {
    llm.error.value = '舊錯誤'
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ choices: [{ message: { content: 'ok' } }] }),
    })
    await llm.callLlmApi([])
    expect(llm.error.value).toBeNull()
  })

  it('sends correct Authorization header', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ choices: [{ message: { content: 'ok' } }] }),
    })
    await llm.callLlmApi([])
    const [, options] = fetch.mock.calls[0]
    expect(options.headers['Authorization']).toBe('Bearer valid-key-longer-than-10-chars')
  })

  it('sends messages in request body', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ choices: [{ message: { content: 'ok' } }] }),
    })
    const messages = [{ role: 'system', content: 'sys' }, { role: 'user', content: 'msg' }]
    await llm.callLlmApi(messages)
    const [, options] = fetch.mock.calls[0]
    expect(JSON.parse(options.body).messages).toEqual(messages)
  })
})
