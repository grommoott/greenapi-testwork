import LoginForm from "@widgets/LoginForm"
import { FC } from "react"

const Login: FC = () => {
    return (
        <div className="bg-bg-dark h-full w-full flex flex-col items-center justify-center">
            <div className="grow-[1]" />
            <LoginForm />
            <div className="grow-[2]" />
        </div>
    )
}

export default Login
