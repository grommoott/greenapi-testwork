import ContactEntity from "@entities/ContactEntity"
import MessageEntity from "@entities/MessageEntity"
import SendMessageForm from "@entities/SendMessageForm"
import sendMessage from "@shared/api/sendMessage"
import { useAppStore } from "@shared/store"
import { Chat } from "@shared/types"
import { FC, useCallback } from "react"
import { toast } from "react-toastify"

interface Props {
    chat?: Chat
}

const ChatWidget: FC<Props> = ({ chat }) => {
    const {
        addMessage,
        setMessageId,
        idInstance,
        apiTokenInstance,
        removeMessage,
    } = useAppStore()

    const onMessage = useCallback(
        async (content: string) => {
            if (!chat || !idInstance || !apiTokenInstance) {
                return
            }

            const tmpRandomId =
                new Date().getTime().toString() +
                (Math.random() * 10000000).toString()

            addMessage({
                chatId: chat.chatId,
                id: tmpRandomId,
                message: content,
                sender: "",
                timestamp: Math.round(new Date().getTime() / 1000),
            })

            try {
                const { idMessage } = await sendMessage(
                    content,
                    chat,
                    idInstance,
                    apiTokenInstance,
                )

                setMessageId(tmpRandomId, idMessage)
            } catch (e) {
                toast.error("Произошла ошибка, сообщение не было отправлено")
                removeMessage(tmpRandomId)
            }
        },
        [chat],
    )

    if (!chat) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-light-text text-center">
                    Выберите чат, чтобы начать переписываться
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-stretch justify-between h-full">
            <ContactEntity chat={chat} />

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
