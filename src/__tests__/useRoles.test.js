import { describe, it, expect, beforeEach } from 'vitest'
import { useRoles } from '../composables/useRoles'

describe('useRoles', () => {
  let roles

  beforeEach(() => {
    roles = useRoles()
    roles.resetToDefaults()
  })

  it('has non-empty default proponent prompt', () => {
    expect(roles.proponentPrompt.value.length).toBeGreaterThan(0)
  })

  it('has non-empty default opponent prompt', () => {
    expect(roles.opponentPrompt.value.length).toBeGreaterThan(0)
  })

  it('defaults to 3 rounds', () => {
    expect(roles.defaultRounds.value).toBe(3)
  })

  it('allows updating proponent prompt', () => {
    roles.proponentPrompt.value = '自訂正方提示'
    expect(roles.proponentPrompt.value).toBe('自訂正方提示')
  })

  it('allows updating opponent prompt', () => {
    roles.opponentPrompt.value = '自訂反方提示'
    expect(roles.opponentPrompt.value).toBe('自訂反方提示')
  })

  it('resets prompts and rounds to defaults', () => {
    roles.proponentPrompt.value = '修改過的提示'
    roles.defaultRounds.value = 10
    roles.resetToDefaults()
    expect(roles.proponentPrompt.value).not.toBe('修改過的提示')
    expect(roles.defaultRounds.value).toBe(3)
  })

  it('proponent and opponent prompts are different', () => {
    expect(roles.proponentPrompt.value).not.toBe(roles.opponentPrompt.value)
  })
})
