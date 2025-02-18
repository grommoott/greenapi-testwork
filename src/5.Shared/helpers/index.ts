import { Message } from "@shared/types";

export function isOursMessage(message: Message): boolean {
    return message.chatId == message.sender
}
