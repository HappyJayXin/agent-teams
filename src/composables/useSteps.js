import { ref, computed } from 'vue';

export function useSteps() {
  const currentStep = ref(1);
  const discussionStarted = ref(false);
  const discussionComplete = ref(false);

  const canGoToStep = computed(() => (step) => {
    if (step === 1) return true;
    if (step === 2) return true;
    if (step === 3) return discussionComplete.value;
    return false;
  });

  const goToStep = (step) => {
    if (canGoToStep.value(step)) currentStep.value = step;
  };

  const markDiscussionStarted = () => {
    discussionStarted.value = true;
  };

  const markDiscussionComplete = () => {
    discussionComplete.value = true;
    currentStep.value = 3;
  };

  const reset = () => {
    currentStep.value = 1;
    discussionStarted.value = false;
    discussionComplete.value = false;
  };

  return {
    currentStep,
    discussionStarted,
    discussionComplete,
    canGoToStep,
    goToStep,
    markDiscussionStarted,
    markDiscussionComplete,
    reset
  };
}
