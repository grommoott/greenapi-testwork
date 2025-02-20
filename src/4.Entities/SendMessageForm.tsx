import Input from "@shared/ui/Input"
import { FC, useCallback, useState } from "react"

interface Props {
    onMessage?: (content: string) => void
}

const SendMessageForm: FC<Props> = ({ onMessage = () => {} }) => {
    const [content, setContent] = useState("")

    const sendMessage = useCallback(() => {
        if (content == "") {
            return
        }

        onMessage(content)
        setContent("")
    }, [content, setContent])

    return (
        <div className="flex flex-row items-center">
            <Input
                value={content}
                onChange={setContent}
                placeholder="Введите сообщение"
                onSend={sendMessage}
            />
            <button
                className="m-2 rounded-full bg-transparent group p-2 focus-visible:bg-bg-light-hovered duration-100 outline-none"
                onClick={sendMessage}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        sendMessage()
                    }
                }}
            >
                <img
                    draggable={false}
                    src="/send.svg"
                    className="size-8 select-none group-hover:scale-110 group-active:scale-95 duration-200"
                />
            </button>
        </div>
    )
}

export default SendMessageForm
