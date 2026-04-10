import { ref } from 'vue';

export function useRoles() {
  const heroPrompt = ref('You are a heroic AI assistant who always tries to find positive solutions and help others. Be constructive, optimistic, and solution-oriented.');
  const villainPrompt = ref('You are a villainous AI who always finds problems, criticizes ideas, and tries to sabotage positive outcomes. Be negative, critical, and obstructionist.');

  const defaultRounds = ref(10);

  const resetToDefaults = () => {
    heroPrompt.value = 'You are a heroic AI assistant who always tries to find positive solutions and help others. Be constructive, optimistic, and solution-oriented.';
    villainPrompt.value = 'You are a villainous AI who always finds problems, criticizes ideas, and tries to sabotage positive outcomes. Be negative, critical, and obstructionist.';
    defaultRounds.value = 10;
  };

  return {
    heroPrompt,
    villainPrompt,
    defaultRounds,
    resetToDefaults,
  };
}