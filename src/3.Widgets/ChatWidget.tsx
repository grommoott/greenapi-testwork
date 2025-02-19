import MessageEntity from "@entities/MessageEntity"
import SendMessageForm from "@entities/SendMessageForm"
import sendMessage from "@shared/api/sendMessage"
import { useAppStore } from "@shared/store"
import { Chat } from "@shared/types"
import { FC, useCallback } from "react"

interface Props {
    chat?: Chat
}

const ChatWidget: FC<Props> = ({ chat }) => {
    if (!chat) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-light-text text-center">
                    Выберите чат, чтобы начать переписываться
                </p>
            </div>
        )
    }

    const { addMessage, setMessageId, idInstance, apiTokenInstance } =
        useAppStore()

    const onMessage = useCallback(async (content: string) => {
        if (!idInstance || !apiTokenInstance) {
            return
        }

        const promise = sendMessage(content, chat, idInstance, apiTokenInstance)
        const tmpRandomId = (Math.random() * 10000000).toString()

        addMessage({
            chatId: chat.chatId,
            id: tmpRandomId,
            message: content,
            sender: "",
            timestamp: Math.round(new Date().getTime() / 1000),
        })

        const { idMessage } = await promise

        setMessageId(tmpRandomId, idMessage)
    }, [])

    return (
        <div className="flex flex-col items-stretch justify-between h-full">
            <div className="flex flex-col items-stretch grow">
                {chat.messages.map((message) => (
                    <MessageEntity
                        message={message}
                        key={message.id}
                    />
                ))}
            </div>

            <SendMessageForm onMessage={onMessage} />
        </div>
    )
}

export default ChatWidget
