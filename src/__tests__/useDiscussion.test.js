import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.stubEnv('VITE_LLM_API_KEY', 'valid-key-longer-than-10-chars')
vi.stubEnv('VITE_LLM_BASE_URL', 'https://api.example.com/v1')
vi.stubEnv('VITE_LLM_DEFAULT_MODEL', 'test-model')

function makeFetchResponse(content) {
  return {
    ok: true,
    json: async () => ({ choices: [{ message: { content } }] }),
  }
}

const { useDiscussion } = await import('../composables/useDiscussion')

describe('useDiscussion - input validation', () => {
  let discussion

  beforeEach(() => {
    discussion = useDiscussion()
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sets error when topic is empty and does not call API', async () => {
    discussion.topic.value = ''
    await discussion.startDiscussion()
    expect(discussion.apiError.value).toBeTruthy()
    expect(fetch).not.toHaveBeenCalled()
  })

  it('sets error when topic is only whitespace', async () => {
    discussion.topic.value = '   '
    await discussion.startDiscussion()
    expect(discussion.apiError.value).toBeTruthy()
    expect(fetch).not.toHaveBeenCalled()
  })
})

describe('useDiscussion - discussion flow', () => {
  let discussion

  beforeEach(() => {
    discussion = useDiscussion()
    discussion.topic.value = '人工智慧對社會的影響'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('resets conversation and rounds before starting', async () => {
    // seed old state
    discussion.conversation.value = [{ role: 'proponent', content: '舊內容', timestamp: '' }]
    discussion.topic.value = '新主題'

    // 3 rounds + 1 summary
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce(makeFetchResponse('正方第1輪'))
      .mockResolvedValueOnce(makeFetchResponse('反方第1輪'))
      .mockResolvedValueOnce(makeFetchResponse('正方第2輪'))
      .mockResolvedValueOnce(makeFetchResponse('摘要'))
    )

    await discussion.startDiscussion()
    expect(discussion.conversation.value[0].content).toBe('正方第1輪')
  })

  it('alternates roles: proponent then opponent', async () => {
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce(makeFetchResponse('正方論點'))
      .mockResolvedValueOnce(makeFetchResponse('反方論點'))
      .mockResolvedValueOnce(makeFetchResponse('摘要'))
    )
    // set maxRounds to 2 via defaultRounds
    const { useRoles } = await import('../composables/useRoles')
    useRoles().defaultRounds.value = 2

    discussion = useDiscussion()
    discussion.topic.value = '測試主題'
    await discussion.startDiscussion()

    expect(discussion.conversation.value[0].role).toBe('proponent')
    expect(discussion.conversation.value[1].role).toBe('opponent')
  })

  it('sets discussionComplete to true after all rounds finish', async () => {
    const { useRoles } = await import('../composables/useRoles')
    useRoles().defaultRounds.value = 2

    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce(makeFetchResponse('正方'))
      .mockResolvedValueOnce(makeFetchResponse('反方'))
      .mockResolvedValueOnce(makeFetchResponse('摘要內容'))
    )

    discussion = useDiscussion()
    discussion.topic.value = '測試主題'
    await discussion.startDiscussion()

    expect(discussion.discussionComplete.value).toBe(true)
  })

  it('stores summary after generateSummary', async () => {
    const { useRoles } = await import('../composables/useRoles')
    useRoles().defaultRounds.value = 2

    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce(makeFetchResponse('正方'))
      .mockResolvedValueOnce(makeFetchResponse('反方'))
      .mockResolvedValueOnce(makeFetchResponse('這是摘要'))
    )

    discussion = useDiscussion()
    discussion.topic.value = '測試主題'
    await discussion.startDiscussion()

    expect(discussion.summary.value).toBe('這是摘要')
  })
})

describe('useDiscussion - saveConversation', () => {
  let discussion

  beforeEach(() => {
    discussion = useDiscussion()
    // reset conversation
    discussion.conversation.value = []
  })

  it('does not trigger download when conversation is empty', () => {
    const createObjectURL = vi.fn()
    vi.stubGlobal('URL', { createObjectURL, revokeObjectURL: vi.fn() })
    discussion.saveConversation()
    expect(createObjectURL).not.toHaveBeenCalled()
    vi.unstubAllGlobals()
  })
})
