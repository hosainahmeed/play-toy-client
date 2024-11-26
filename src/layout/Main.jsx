import { Outlet, useLocation } from "react-router-dom"
import Header from "../pages/Sheard/Header"
import Footer from "../pages/Sheard/Footer";

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
        <Footer></Footer>
    </div>
  )
}

export default Main