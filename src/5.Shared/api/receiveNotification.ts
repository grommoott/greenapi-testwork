import config from "@shared/config"
import axios from "axios"

type Response =
    | {
          receiptId: number
          timestamp: number
          senderData: {
              chatId: string
              sender: string
          }
          idMessage: string
          messageData: {
              typeMessage: "textMessage"
              textMessageData: {
                  textMessage: string
              }
          }
      }
    | undefined

const receiveNotification = async (
    idInstance: string,
    apiTokenInstance: string,
): Promise<Response> => {
    const { data } = await axios.get(
        `${config.backendBaseUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
    )

    if (!data) {
        return undefined
    }

    return {
        receiptId: data.receiptId,
        timestamp: data.timestamp,
        senderData: {
            chatId: data.body.senderData.chatId,
            sender: data.body.senderData.sender,
        },
        idMessage: data.body.idMessage,
        messageData: {
            typeMessage: "textMessage",
            textMessageData: {
                textMessage: data.body.messageData.textMessageData.textMessage,
            },
        },
    }
}

export default receiveNotification
