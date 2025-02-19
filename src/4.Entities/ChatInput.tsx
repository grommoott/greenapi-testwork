import Input from "@shared/ui/Input"
import { FC, useCallback, useState } from "react"

interface Props {
    onAddChat?: (id: string) => void
}

const ChatInput: FC<Props> = ({ onAddChat = () => {} }) => {
    const [query, setQuery] = useState("")

    const addChat = useCallback(() => {
        if (query == "") {
            return
        }

        onAddChat(query)
        setQuery("")
    }, [query, setQuery])

    return (
        <div className="flex flex-row items-center">
            <Input
                value={query}
                onChange={setQuery}
                placeholder="Добавить чат"
            />
            <button
                className="m-2 rounded-full bg-transparent group group-hover:bg-bg-light-hovered group-active:bg-bg-light-active p-2 group-focus-visible:bg-bg-light-hovered duration-100"
                onClick={addChat}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        addChat()
                    }
                }}
            >
                <img
                    draggable={false}
                    src="/add.svg"
                    className="size-8 select-none group-hover:scale-110 group-active:scale-95 duration-200 outline-none group-focus-visible:bg-bg-light-hovered"
                />
            </button>
        </div>
    )
}

export default ChatInput
