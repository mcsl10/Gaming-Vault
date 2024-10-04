import ReactDOM from "react-dom/client"
import { StrictMode } from "react"

import App from "./components/App"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <StrictMode>
    <App />
    </StrictMode>
)