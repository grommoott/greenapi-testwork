export type Message = {
    id: string,
    chatId: string,
    message: string,
    sender: string,
    timestamp: number,
}

export type Chat = {
    name: string,
    avatarUrl: string,
    chatId: string,
    messages: Message[]
}
