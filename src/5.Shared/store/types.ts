import { Chat, Message } from "@shared/types"

export type Store = {
    idInstance?: string
    setIdInstance: (value: string) => void

    apiTokenInstance?: string
    setApiTokenInstance: (value: string) => void

    chats: Chat[]
    addChat: (chat: Chat) => void
    addMessage: (message: Message) => void
    removeMessage: (messageId: string) => void

    unreadMessages: Message[]
    addUnreadMessage: (message: Message) => void
}
