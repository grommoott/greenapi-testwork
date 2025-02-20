import config from "@shared/config"
import { InstanceState } from "@shared/types"
import axios from "axios"

const getStateInstance = async (
    idInstance: string,
    apiTokenInstance: string,
): Promise<{ stateInstance: InstanceState }> => {
    const { data } = await axios.get(
        `${config.backendBaseUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
    )

    return data
}

export default getStateInstance
