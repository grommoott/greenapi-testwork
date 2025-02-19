import ChatEntity from "@entities/ChatEntity"
import ChatInput from "@entities/ChatInput"
import { useAppStore } from "@shared/store"
import { Chat } from "@shared/types"
import { FC } from "react"

interface Props {
    onSelect?: (chat: Chat) => void
}

const ChatList: FC<Props> = ({ onSelect = () => {} }) => {
    const { chats, unreadMessages, addChat } = useAppStore((store) => store)

    return (
        <div className="flex flex-col h-[100vh]">
            <ChatInput
                onAddChat={(id) => {
                    addChat({
                        chatId: id,
                        avatarUrl: "",
                        messages: [],
                        name: "test",
                    })
                }}
            />

            <div className="flex flex-col items-stretch overflow-scroll">
                {chats.length == 0 && (
                    <div className="flex flex-col items-center">
                        <p className="text-light-text text-center break-words max-w-80">
                            У вас пока что нет чатов, чтобы добавить их введите
                            номер того, кому хотите написать и нажмите кнопку
                            создания чата
                        </p>
                    </div>
                )}{" "}
                {chats.map((chat) => (
                    <ChatEntity
                        chat={chat}
                        onSelect={onSelect}
                        unreadMessagesCount={unreadMessages
                            .map((message) =>
                                message.chatId == chat.chatId
                                    ? (1 as number)
                                    : (0 as number),
                            )
                            .reduce((prev, cur) => prev + cur, 0)}
                        key={chat.chatId}
                    />
                ))}
            </div>
        </div>
    )
}

export default ChatList
