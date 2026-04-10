export function saveToHistory(conversationData) {
  try {
    const history = JSON.parse(localStorage.getItem('discussionHistory') || '[]');
    history.push(conversationData);
    localStorage.setItem('discussionHistory', JSON.stringify(history));
    return true;
  } catch (error) {
    console.error('Failed to save to history:', error);
    return false;
  }
}

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem('discussionHistory') || '[]');
  } catch (error) {
    console.error('Failed to get history:', error);
    return [];
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem('discussionHistory');
    return true;
  } catch (error) {
    console.error('Failed to clear history:', error);
    return false;
  }
}