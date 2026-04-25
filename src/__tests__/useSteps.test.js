import { describe, it, expect, beforeEach } from 'vitest'
import { useSteps } from '../composables/useSteps'

describe('useSteps', () => {
  let steps

  beforeEach(() => {
    steps = useSteps()
  })

  it('starts at step 1', () => {
    expect(steps.currentStep.value).toBe(1)
  })

  it('allows navigation to step 1 and 2 at any time', () => {
    expect(steps.canGoToStep.value(1)).toBe(true)
    expect(steps.canGoToStep.value(2)).toBe(true)
  })

  it('blocks navigation to step 3 before discussion is complete', () => {
    expect(steps.canGoToStep.value(3)).toBe(false)
  })

  it('navigates to allowed step', () => {
    steps.goToStep(2)
    expect(steps.currentStep.value).toBe(2)
  })

  it('does not navigate to blocked step', () => {
    steps.goToStep(3)
    expect(steps.currentStep.value).toBe(1)
  })

  it('marks discussion as started', () => {
    steps.markDiscussionStarted()
    expect(steps.discussionStarted.value).toBe(true)
  })

  it('marks discussion complete and navigates to step 3', () => {
    steps.markDiscussionComplete()
    expect(steps.discussionComplete.value).toBe(true)
    expect(steps.currentStep.value).toBe(3)
  })

  it('allows navigation to step 3 after discussion complete', () => {
    steps.markDiscussionComplete()
    expect(steps.canGoToStep.value(3)).toBe(true)
  })

  it('resets all state to initial values', () => {
    steps.goToStep(2)
    steps.markDiscussionStarted()
    steps.markDiscussionComplete()
    steps.reset()
    expect(steps.currentStep.value).toBe(1)
    expect(steps.discussionStarted.value).toBe(false)
    expect(steps.discussionComplete.value).toBe(false)
  })
})
