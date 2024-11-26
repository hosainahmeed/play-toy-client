import { Outlet } from "react-router-dom"


function Main() {
  return (
    <div className="max-w-screen-2xl mx-auto">
        <nav>nav</nav>
        <Outlet></Outlet>
        <nav>footer</nav>
    </div>
  )
}

export default Main