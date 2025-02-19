import config from "@shared/config"
import axios from "axios"

const deleteNotification = async (
    receiptId: number,
    idInstance: string,
    apiTokenInstance: string,
): Promise<{ result: boolean }> => {
    const { data } = await axios.delete(
        `${config.backendBaseUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
    )

    return data
}

export default deleteNotification
