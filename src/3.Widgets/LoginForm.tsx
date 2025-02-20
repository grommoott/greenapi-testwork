import getStateInstance from "@shared/api/getStateInstance"
import { useAppStore } from "@shared/store"
import { InstanceStates } from "@shared/types"
import Input from "@shared/ui/Input"
import Loading from "@shared/ui/Loading"
import { FC, FormEvent, useCallback, useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

interface Props {}

const LoginForm: FC<Props> = () => {
    const { idInstance, setIdInstance, apiTokenInstance, setApiTokenInstance } =
        useAppStore((store) => store)
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            if (!idInstance || !apiTokenInstance) {
                return
            }

            setLoading(true)

            try {
                const { stateInstance } = await getStateInstance(
                    idInstance,
                    apiTokenInstance,
                )

                switch (stateInstance) {
                    case InstanceStates.Authorized:
                        navigate("/")
                        break

                    case InstanceStates.NotAuthorized:
                        toast.error(
                            <p>
                                Инстанс не авторизован. Узнать как авторизовать
                                его можно{" "}
                                <a
                                    target="_blank"
                                    href="https://green-api.com/docs/before-start/#qr"
                                >
                                    здесь
                                </a>
                            </p>,
                        )
                        break

                    case InstanceStates.Blocked:
                        toast.error("Инстанс заблокирован")
                        break

                    case InstanceStates.SleepMode:
                        toast.error("Инстанс в спящем режиме")
                        break

                    case InstanceStates.Starting:
                        toast.error(
                            "Инстанс запускается, повторите попытку входа позже",
                        )
                        break

                    case InstanceStates.YellowCard:
                        toast.warn(
                            "Инстанс получил жёлтую карточку, отправка сообщений полностью или частично приостановлена",
                        )
                        navigate("/")
                        break
                }
            } catch (e) {
                toast.error(
                    "Произошла ошибка, возможно вы ввели неправильные данные",
                )
            } finally {
                setLoading(false)
            }
        },
        [navigate, idInstance, apiTokenInstance],
    )

    return (
        <form
            className="flex flex-col p-6 bg-bg-light-dark items-center rounded-3xl drop-shadow-md"
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
            <div className="h-4" />
            <button className="bg-main py-3 px-6 rounded-full drop-shadow-md flex flex-row items-center gap-2">
                <p>Войти</p>
                {isLoading && <Loading className="stroke-text" />}
            </button>
        </form>
    )
}

export default LoginForm
