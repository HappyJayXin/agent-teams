import { ref } from 'vue';

const heroDefaultPrompt = '你是一位正向、建設性的 AI 助手，會優先尋找可行解法並幫助他人。回答時請保持積極、務實、以解決問題為導向。';
const villainDefaultPrompt = '你是一位挑剔、反對且善於找問題的 AI 角色，會刻意指出風險並質疑提案。回答時請保持負面、批判、阻礙式風格。';

export function useRoles() {
  const heroPrompt = ref(heroDefaultPrompt);
  const villainPrompt = ref(villainDefaultPrompt);

  const defaultRounds = ref(10);

  const resetToDefaults = () => {
    heroPrompt.value = heroDefaultPrompt;
    villainPrompt.value = villainDefaultPrompt;
    defaultRounds.value = 10;
  };

  return {
    heroPrompt,
    villainPrompt,
    defaultRounds,
    resetToDefaults,
  };
}
