import { Outlet, useLocation } from "react-router-dom"
import Header from "../pages/Sheard/Header"

function Main() {
  const location = useLocation();
  const visual =
    location.pathname.toLowerCase() === "/login" || location.pathname.toLowerCase() === "/register";
  if (visual) {
    return <Outlet></Outlet>;
  }
  return (
    <div className="max-w-screen-2xl mx-auto px-2">
        <Header></Header>
        <Outlet></Outlet>
        <nav>footer</nav>
    </div>
  )
}

export default Main