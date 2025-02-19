import { useAppStore } from "@shared/store"
import Input from "@shared/ui/Input"
import { FC, FormEvent, useCallback } from "react"
import { useNavigate } from "react-router"

interface Props {}

const LoginForm: FC<Props> = () => {
    const { idInstance, setIdInstance, apiTokenInstance, setApiTokenInstance } =
        useAppStore((store) => store)

    const navigate = useNavigate()

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            if (!idInstance || !apiTokenInstance) {
                return
            }

            navigate("/")
        },
        [navigate, idInstance, apiTokenInstance],
    )

    return (
        <form
            className="flex flex-col p-6 bg-bg-light items-center rounded-3xl drop-shadow-md"
            onSubmit={onSubmit}
        >
            <h1 className="text-2xl text-main">Вход</h1>
            <Input
                value={idInstance}
                onChange={setIdInstance}
                placeholder="Id instance"
            />
            <Input
                value={apiTokenInstance}
                onChange={setApiTokenInstance}
                placeholder="Api token instance"
                type="password"
            />
            <button className="bg-main py-3 px-6 rounded-full">Войти</button>
        </form>
    )
}

export default LoginForm
