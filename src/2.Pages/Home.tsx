import { useAppStore } from "@shared/store"
import ChatWidget from "@widgets/ChatWidget"
import ChatList from "@widgets/ChatList"
import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Chat } from "@shared/types"
import config from "@shared/config"
import receiveNotification from "@shared/api/receiveNotification"
import deleteNotification from "@shared/api/deleteNotification"

const Home: FC = () => {
    const navigate = useNavigate()

    const { idInstance, apiTokenInstance, addMessage, addUnreadMessage } =
        useAppStore()
    const [selectedChat, setSelectedChat] = useState<Chat | undefined>()

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

            const message = {
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
            <div className="flex flex-col grow border-r-separator border-r-2">
                <ChatList onSelect={setSelectedChat} />
            </div>
            <div className="flex flex-col items-stretch grow">
                <ChatWidget chat={selectedChat} />
            </div>
        </div>
    )
}

export default Home
