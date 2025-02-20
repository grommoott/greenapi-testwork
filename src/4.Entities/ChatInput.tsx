import getContactInfo from "@shared/api/getContactInfo"
import { useAppStore } from "@shared/store"
import { Chat } from "@shared/types"
import Input from "@shared/ui/Input"
import Loading from "@shared/ui/Loading"
import { FC, useCallback, useState } from "react"
import { toast } from "react-toastify"

interface Props {
    onAddChat?: (chat: Chat) => void
}

const ChatInput: FC<Props> = ({ onAddChat = () => {} }) => {
    const [query, setQuery] = useState("")
    const [isLoading, setLoading] = useState(false)

    const { idInstance, apiTokenInstance } = useAppStore()

    const addChat = useCallback(async () => {
        if (query == "" || !idInstance || !apiTokenInstance) {
            return
        }

        setLoading(true)

        let editedQuery = query

        if (editedQuery.startsWith("8")) {
            editedQuery = "7" + editedQuery.slice(1)
        } else if (editedQuery.startsWith("+")) {
            editedQuery = editedQuery.slice(1)
        }

        const chatId = `${editedQuery}@c.us`

        try {
            const contactInfo = await getContactInfo(
                chatId,
                idInstance,
                apiTokenInstance,
            )

            const name =
                contactInfo.contactName || contactInfo.name || "+" + editedQuery

            onAddChat({
                avatarUrl: contactInfo.avatarUrl,
                chatId,
                messages: [],
                name,
            })
        } catch (e) {
            toast.warn(
                "Произошла ошибка, возможно введён неправильный номер или у пользователя нет WhatsApp",
            )
        } finally {
            setLoading(false)
            setQuery("")
        }
    }, [query, setQuery])

    return (
        <div className="flex flex-row items-center">
            <Input
                value={query}
                onChange={setQuery}
                placeholder="Добавить чат"
                onSend={addChat}
            />
            {isLoading && <Loading />}
            <button
                className="m-2 rounded-full group hover:bg-bg-light-hovered active:bg-bg-light-active p-2 focus-visible:bg-bg-light-hovered duration-100 outline-none"
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
                    className="size-8 select-none group-hover:scale-110 group-active:scale-95 group-focus-visible:scale-110 duration-200 outline-none"
                />
            </button>
        </div>
    )
}

export default ChatInput
