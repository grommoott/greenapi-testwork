import { create } from "zustand"
import { Store } from "./types"

const useAppStore = create<Store>((set) => ({
    idInstance: undefined,
    setIdInstance: (value) => set({ idInstance: value }),

    apiTokenInstance: undefined,
    setApiTokenInstance: (value) => set({ apiTokenInstance: value }),

    chats: [],
    addChat: (chat) => set((state) => ({ chats: state.chats.concat(chat) })),
    addMessage: (message) =>
        set((state) => {
            const chats = state.chats.slice()
            const index = chats.findIndex((ch) => ch.chatId == message.chatId)

            if (index == -1) {
                return {}
            }

            chats[index].messages.push(message)

            return { chats }
        }),
    setMessageId: (tmpId, realId) =>
        set((state) => {
            const chats = state.chats.slice()
            let messageIndex = -1
            const chatIndex = chats.findIndex((ch) => {
                messageIndex = ch.messages.findIndex((msg) => msg.id == tmpId)
                return messageIndex != -1
            })

            if (chatIndex == -1 || messageIndex == -1) {
                return {}
            }

            chats[chatIndex].messages[messageIndex].chatId = realId

            return { chats }
        }),
    removeMessage: (id) =>
        set((state) => {
            const chats = state.chats.slice()
            let messageIndex = -1
            const chatIndex = chats.findIndex((ch) => {
                messageIndex = ch.messages.findIndex((msg) => msg.id == id)
                return messageIndex != -1
            })

            if (chatIndex == -1 || messageIndex == -1) {
                return {}
            }

            chats[chatIndex].messages.splice(messageIndex, 1)

            return { chats }
        }),

    unreadMessages: [],
    addUnreadMessage: (message) =>
        set((state) => ({
            unreadMessages: state.unreadMessages.concat(message),
        })),
    readChat: (chatId) =>
        set((state) => ({
            unreadMessages: state.unreadMessages.filter(
                (msg) => msg.chatId != chatId,
            ),
        })),
}))

export { useAppStore }
