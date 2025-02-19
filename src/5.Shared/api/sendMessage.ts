import config from "@shared/config"
import { Chat } from "@shared/types"
import axios from "axios"

const sendMessage = async (
    content: string,
    chat: Chat,
    idInstance: string,
    apiTokenInstance: string,
): Promise<{ idMessage: string }> => {
    const { data } = await axios.post(
        `${config.backendBaseUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        {
            chatId: chat.chatId,
            message: content,
        },
    )

    return data
}

export default sendMessage
