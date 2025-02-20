export type Message = {
    id: string
    chatId: string
    message: string
    sender: string
    timestamp: number
}

export type Chat = {
    name: string
    avatarUrl: string
    chatId: string
    messages: Message[]
}

export const InstanceStates = {
    NotAuthorized: "notAuthorized",
    Authorized: "authorized",
    Blocked: "blockd",
    SleepMode: "sleepMode",
    Starting: "starting",
    YellowCard: "yellowCard",
} as const

export type InstanceState = (typeof InstanceStates)[keyof typeof InstanceStates]
