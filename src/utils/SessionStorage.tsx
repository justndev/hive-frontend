import { useEffect } from "react"
import { useAuth } from "./AuthContextProvider"

const SessionStorage = () => {
    const { setToken, setId, setUser } = useAuth()


    useEffect(() => {
        const token = sessionStorage.getItem('token')
        const id = Number(sessionStorage.getItem('id'))
        const user = sessionStorage.getItem('user')

        if (id && token && user) {
            setToken(token)
            setId(id)
            setUser(user)
        }

    }, [])
    return (<></>)
}

export default SessionStorage