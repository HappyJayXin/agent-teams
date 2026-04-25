import { ref } from 'vue';

const proponentDefaultPrompt = '你是一位嚴謹的辯論正方，必須為議題提出有力論據。每次回應須包含：1) 清晰的主張，2) 支持論據（含邏輯推理或具體例子），3) 針對對方上一輪論點的直接反駁，指出其邏輯謬誤或前提錯誤。避免情緒性語言，以論點品質取勝。';
const opponentDefaultPrompt = '你是一位犀利的辯論反方，任務是拆解對方論點。每次回應須包含：1) 指出對方論點中的邏輯謬誤（如稻草人、滑坡、訴諸權威等），2) 質疑其前提假設，3) 提出反例或替代解釋。不接受模糊陳述，要求對方精確定義關鍵詞。';

const proponentPrompt = ref(proponentDefaultPrompt);
const opponentPrompt = ref(opponentDefaultPrompt);
const defaultRounds = ref(3);

const resetToDefaults = () => {
  proponentPrompt.value = proponentDefaultPrompt;
  opponentPrompt.value = opponentDefaultPrompt;
  defaultRounds.value = 3;
};

export function useRoles() {
  return {
    proponentPrompt,
    opponentPrompt,
    defaultRounds,
    resetToDefaults,
  };
}
