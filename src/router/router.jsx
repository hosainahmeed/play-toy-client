import { createBrowserRouter } from "react-router-dom"
import Main from "../layout/Main"
import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import Shop from "../pages/Shop/Shop"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
            path:'register',
            element:<Register></Register>
        },
        {
            path:'cart',
            element:<Register></Register>
        },
        {
            path:'shop',
            element:<Shop></Shop>
        },
    ]
  }
])
export default router
