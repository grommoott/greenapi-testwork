import Home from "@pages/Home"
import Login from "@pages/Login"
import { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import { Slide, ToastContainer } from "react-toastify"

const App: FC = () => {
    return (
        <>
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

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                limit={5}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                closeButton={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide}
            />
        </>
    )
}

export default App
