const conversationTracker = new Map<string, string>();

export const conversationrepository = {
  getLastResponseId(conversationId: string) {
    return conversationTracker.get(conversationId) || null
  },

  setResponseId(conversationId: string, responseId: string) {
    conversationTracker.set(conversationId, responseId);
  }
}