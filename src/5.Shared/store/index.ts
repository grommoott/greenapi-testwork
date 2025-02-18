import { create } from "zustand";
import { Store } from "./types";

const useStore = create<Store>((set) => ({
    idInstance: undefined,
    setIdInstance: (value) => set({ idInstance: value }),

    apiTokenInstance: undefined,
    setApiTokenInstance: (value) => set({ apiTokenInstance: value }),

    chats: [],
    addChat: (chat) => set((state) => ({ chats: state.chats.concat(chat) })),
    addMessage: (message) => set((state) => {
        const chats = state.chats.slice()
        const index = chats.findIndex((ch) => ch.chatId == message.chatId)

        if (index == -1) {
            return {}
        }

        chats[index].messages.push(message)

        return { chats }
    }),
    removeMessage: (messageId) => set((state) => {
        const chats = state.chats.slice()
        let messageIndex = -1
        const chatIndex = chats.findIndex(ch => {
            messageIndex = ch.messages.findIndex(msg => msg.id == messageId)
            return messageIndex != -1
        })

        if (chatIndex == -1 || messageIndex == -1) {
            return {}
        }

        chats[chatIndex].messages.splice(messageIndex, 1)

        return { chats }
    }),

    unreadMessages: [],
    addUnreadMessage: (message) => set((state) => ({ unreadMessages: state.unreadMessages.concat(message) }))
}))

export { useStore }
