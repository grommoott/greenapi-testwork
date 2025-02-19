import { Chat } from "@shared/types"
import { FC } from "react"

interface Props {
    chat: Chat
    unreadMessagesCount?: number
    onSelect?: (chat: Chat) => void
}

const ChatEntity: FC<Props> = ({
    chat,
    onSelect = () => {},
    unreadMessagesCount = 0,
}) => {
    return (
        <button
            className="px-2 py-4 flex flex-row items-center h-20 bg-bg-light hover:bg-bg-light-hovered active:bg-bg-light-active focus-visible:bg-bg-light-hovered duration-100 outline-none"
            onClick={() => onSelect(chat)}
            onKeyDown={(e) => {
                if (e.key == "Enter") {
                    onSelect(chat)
                }
            }}
        >
            <div className="m-2">
                <img
                    src={chat.avatarUrl}
                    className="size-16 rounded-full object-cover select-none"
                    draggable={false}
                />
            </div>

            <div className="flex flex-col items-start justify-around">
                <p
                    className="text-xl select-none"
                    draggable={false}
                >
                    {chat.name}
                </p>
                <p
                    className="select-none"
                    draggable={false}
                >
                    {chat.messages[chat.messages.length - 1]?.message}
                </p>
            </div>

            <div className="grow" />

            {unreadMessagesCount != 0 && (
                <div className="size-6 flex flex-row items-center jusitfy-center bg-main rounded-full">
                    <p className="text-sm grow">{unreadMessagesCount}</p>
                </div>
            )}
        </button>
    )
}

export default ChatEntity
