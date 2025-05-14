
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";

function App() {
  
  return (
    <div className="flex flex-col h-screen">
        <Header  />
      <Outlet />
    </div>
  )
}

export default App
