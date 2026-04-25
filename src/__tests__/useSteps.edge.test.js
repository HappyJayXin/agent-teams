import { describe, it, expect, beforeEach } from 'vitest'
import { useSteps } from '../composables/useSteps'

describe('useSteps - edge cases', () => {
  let steps

  beforeEach(() => {
    steps = useSteps()
  })

  it('blocks navigation to step 0', () => {
    expect(steps.canGoToStep.value(0)).toBe(false)
  })

  it('blocks navigation to step 4', () => {
    expect(steps.canGoToStep.value(4)).toBe(false)
  })

  it('can freely navigate between steps 1 2 3 after discussion complete', () => {
    steps.markDiscussionComplete()
    steps.goToStep(1)
    expect(steps.currentStep.value).toBe(1)
    steps.goToStep(2)
    expect(steps.currentStep.value).toBe(2)
    steps.goToStep(3)
    expect(steps.currentStep.value).toBe(3)
  })

  it('does not change step when navigating to invalid step', () => {
    steps.goToStep(2)
    steps.goToStep(99)
    expect(steps.currentStep.value).toBe(2)
  })
})
