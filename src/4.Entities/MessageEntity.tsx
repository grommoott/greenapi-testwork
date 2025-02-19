import { isOursMessage } from "@shared/helpers"
import { Message } from "@shared/types"
import { FC } from "react"

interface Props {
    message: Message
}

const MessageEntity: FC<Props> = ({ message }) => {
    return (
        <div
            className="m-2 p-2 rounded-2xl bg-bg-light h-min drop-shadow-sm max-w-[60%]"
            style={(() => {
                if (isOursMessage(message)) {
                    return {
                        backgroundColor: "var(--color-main)",
                        borderTopRightRadius: "0.5rem",
                        alignSelf: "end",
                    }
                } else {
                    return {
                        borderTopLeftRadius: "0.5rem",
                        alignSelf: "start",
                    }
                }
            })()}
        >
            <p className="break-all">{message.message}</p>
        </div>
    )
}

export default MessageEntity
