import { FC } from "react"

interface Props {
    className?: string
}

const Loading: FC<Props> = ({ className = "" }) => {
    return (
        <svg
            width={20}
            height={20}
            xmlns="http://www.w3.org/2000/svg"
            className="loading-circle"
        >
            <circle
                r={8}
                cx={10}
                cy={10}
                className={`fill-transparent stroke-2 stroke-light-text ${className}`}
                strokeDasharray="24 15"
                strokeLinecap="round"
            />
        </svg>
    )
}

export default Loading
