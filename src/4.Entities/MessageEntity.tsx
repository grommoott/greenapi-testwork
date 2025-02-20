import { isOursMessage } from "@shared/helpers"
import { Message } from "@shared/types"
import { FC } from "react"

interface Props {
    message: Message
}

const MessageEntity: FC<Props> = ({ message }) => {
    return (
        <div
            className="flex flex-row m-2 p-2 rounded-2xl bg-bg-light h-min drop-shadow-sm max-w-[60%] gap-1"
            style={(() => {
                if (isOursMessage(message)) {
                    return {
                        backgroundColor: "var(--color-main)",
                        borderTopRightRadius: "0.3rem",
                        alignSelf: "end",
                    }
                } else {
                    return {
                        borderTopLeftRadius: "0.3rem",
                        alignSelf: "start",
                    }
                }
            })()}
        >
            <p className="break-all">{message.message}</p>
            <p className="text-xs self-end pt-4 text-light-text">
                {(() => {
                    const date = new Date(message.timestamp * 1000)
                    return `${date.getHours()}:${date.getMinutes()}`
                })()}
            </p>
        </div>
    )
}

export default MessageEntity
