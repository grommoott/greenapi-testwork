import Home from "@pages/Home"
import Login from "@pages/Login"
import { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router"

const App: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
