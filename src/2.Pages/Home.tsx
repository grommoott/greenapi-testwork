import { useAppStore } from "@shared/store"
import ChatWidget from "@widgets/ChatWidget"
import ChatList from "@widgets/ChatList"
import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Chat, Message } from "@shared/types"
import config from "@shared/config"
import receiveNotification from "@shared/api/receiveNotification"
import deleteNotification from "@shared/api/deleteNotification"

const Home: FC = () => {
    const navigate = useNavigate()

    const {
        idInstance,
        apiTokenInstance,
        addMessage,
        addUnreadMessage,
        unreadMessages,
        readChat,
    } = useAppStore()
    const [selectedChat, setSelectedChat] = useState<Chat | undefined>()

    useEffect(() => {
        console.log(unreadMessages)
        if (
            !selectedChat ||
            unreadMessages
                .map((msg) =>
                    msg.chatId == selectedChat.chatId
                        ? (1 as number)
                        : (0 as number),
                )
                .reduce((prev, cur) => prev + cur, 0) == 0
        ) {
            return
        }

        readChat(selectedChat?.chatId)
    }, [selectedChat, unreadMessages])

    useEffect(() => {
        if (!idInstance || !apiTokenInstance) {
            navigate("/login")
            return
        }

        const interval = setInterval(async () => {
            const response = await receiveNotification(
                idInstance,
                apiTokenInstance,
            )

            if (
                !response ||
                response.messageData.typeMessage != "textMessage"
            ) {
                return
            }

            const message: Message = {
                id: response.idMessage,
                chatId: response.senderData.chatId,
                sender: response.senderData.sender,
                timestamp: response.timestamp,
                message: response.messageData.textMessageData.textMessage,
            }

            addMessage(message)
            addUnreadMessage(message)

            await deleteNotification(
                response.receiptId,
                idInstance,
                apiTokenInstance,
            )
        }, config.pollingInterval)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-row items-stretch w-full h-full bg-bg-dark">
            <div className="w-2/5 flex flex-col border-r-separator border-r-1">
                <ChatList onSelect={setSelectedChat} />
            </div>
            <div className="w-3/5 flex flex-col items-stretch">
                <ChatWidget chat={selectedChat} />
            </div>
        </div>
    )
}

export default Home
