import { FC } from "react"

interface Props {
    onChange?: (text: string) => void
    placeholder?: string
    value?: string
    type?: "text" | "password"
}

const Input: FC<Props> = ({
    onChange = () => {},
    placeholder = "",
    value = "",
    type = "text",
}) => {
    return (
        <input
            className="grow outline-none bg-bg-light focus-visible:bg-bg-light-active placeholder-light-text rounded-2xl p-2.5 m-2"
            placeholder={placeholder}
            value={value}
            type={type}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}

export default Input
