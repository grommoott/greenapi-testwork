import { Chat } from "@shared/types"
import { FC } from "react"

interface Props {
    chat: Chat
}

const ContactEntity: FC<Props> = ({ chat }) => {
    return (
        <div className="flex flex-row bg-bg-light p-2 drop-shadow-md items-center gap-2">
            <img
                src={chat.avatarUrl}
                className="rounded-full size-12 drop-shadow-md select-none"
                draggable={false}
            />

            <p className="text-lg">{chat.name}</p>
        </div>
    )
}

export default ContactEntity
