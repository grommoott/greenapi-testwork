import { FC } from "react"

interface Props {
    onChange?: (text: string) => void
    placeholder?: string
    value?: string
    type?: "text" | "password"
    onSend?: () => void
}

const Input: FC<Props> = ({
    onChange = () => {},
    placeholder = "",
    value = "",
    type = "text",
    onSend = () => {},
}) => {
    return (
        <input
            className="grow outline-none bg-bg-light focus-visible:bg-bg-light-active placeholder-light-text rounded-2xl p-2.5 m-2 duration-100 drop-shadow-md"
            placeholder={placeholder}
            value={value}
            type={type}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
                if (e.key == "Enter") {
                    onSend()
                }
            }}
        />
    )
}

export default Input
