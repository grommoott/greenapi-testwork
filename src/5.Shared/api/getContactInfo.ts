import config from "@shared/config"
import axios from "axios"

type Response = {
    avatarUrl: string
    name?: string
    contactName?: string
}

const getContactInfo = async (
    chatId: string,
    idInstance: string,
    apiTokenInstance: string,
): Promise<Response> => {
    const { data } = await axios.post(
        `${config.backendBaseUrl}/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
        { chatId },
    )

    return {
        avatarUrl: data.avatar,
        name: data.name,
        contactName: data.contactName,
    }
}

export default getContactInfo
