import { describe, it, expect, beforeEach } from 'vitest'
import { useRoles } from '../composables/useRoles'

describe('useRoles - shared state', () => {
  beforeEach(() => {
    useRoles().resetToDefaults()
  })

  it('two instances share the same proponentPrompt ref', () => {
    const a = useRoles()
    const b = useRoles()
    a.proponentPrompt.value = '共享測試'
    expect(b.proponentPrompt.value).toBe('共享測試')
  })

  it('two instances share the same defaultRounds ref', () => {
    const a = useRoles()
    const b = useRoles()
    a.defaultRounds.value = 7
    expect(b.defaultRounds.value).toBe(7)
  })

  it('resetToDefaults from one instance affects the other', () => {
    const a = useRoles()
    const b = useRoles()
    a.defaultRounds.value = 10
    b.resetToDefaults()
    expect(a.defaultRounds.value).toBe(3)
  })
})
