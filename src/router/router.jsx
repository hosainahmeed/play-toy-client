import { createBrowserRouter } from 'react-router-dom'
import Main from '../layout/Main'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Shop from '../pages/Shop/Shop'
import ToyseDetails from '../pages/ToyseDetails/ToyseDetails'
import PrivetRouter from './PrivetRouter'
import WishListPage from '../pages/WishListPage/WishListPage'
import ErrorPage from '../pages/Erropage/ErrorPage'
import CartPage from '../pages/CartPage/CartPage'
import BlogsPage from '../pages/BlogsPage/BlogsPage'
import Payment from '../pages/Payment/Payment'
import PaymentHistory from '../pages/Payment/PaymentHistory'
import UserDashboard from '../pages/dashboard/UserDashboard'
import AddItem from '../AdminPage/AddItem'
import AllUsers from '../pages/User/AllUsers'
import ManageItemPage from '../AdminPage/ManageItemPage'
import UpdateBlogPage from '../AdminPage/UpdateBlogPage'
import BlogPageDetails from '../pages/BlogsPage/BlogPageDetails'
import axios from 'axios'
import UserHome from '../pages/userHome/UserHome'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'resgiter',
        element: <Register></Register>
      },
      {
        path: 'wishList',
        element: (
          <PrivetRouter>
            <WishListPage></WishListPage>
          </PrivetRouter>
        )
      },
      {
        path: '/blogDetails',
        element: (
          <PrivetRouter>
            <BlogPageDetails />
          </PrivetRouter>
        )
      },
      {
        path: 'cart',
        element: (
          <PrivetRouter>
            <CartPage></CartPage>
          </PrivetRouter>
        )
      },
      {
        path: 'shop',
        element: <Shop></Shop>
      },
      {
        path: 'blogs',
        element: (
          <PrivetRouter>
            <BlogsPage></BlogsPage>
          </PrivetRouter>
        )
      },
      {
        path: 'payment',
        element: (
          <PrivetRouter>
            <Payment></Payment>
          </PrivetRouter>
        )
      },
      {
        path: 'history',
        element: (
          <PrivetRouter>
            <PaymentHistory></PaymentHistory>
          </PrivetRouter>
        )
      },
      {
        path: '/toysDetails/:id',
        element: (
          <PrivetRouter>
            <ToyseDetails />
          </PrivetRouter>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/toysDetails/${params.id}`)
            .then(res => res.json())
            .catch(err => {
              console.error('Error fetching toy details:', err)
            })
      },

      {
        path: 'dashboard',
        element: (
          <PrivetRouter>
            <UserDashboard></UserDashboard>
          </PrivetRouter>
        ),
        children: [
          {
            path: '/dashboard/addItem',
            element: (
              <PrivetRouter>
                <AddItem></AddItem>
              </PrivetRouter>
            )
          },
          {
            path: '/dashboard/allUsers',
            element: (
              <PrivetRouter>
                <AllUsers></AllUsers>
              </PrivetRouter>
            )
          },
          {
            path: '/dashboard/manageItem',
            element: (
              <PrivetRouter>
                <ManageItemPage></ManageItemPage>
              </PrivetRouter>
            )
          },
          {
            path: '/dashboard/paymentHistory',
            element: (
              <PrivetRouter>
                <PaymentHistory></PaymentHistory>
              </PrivetRouter>
            )
          },
          {
            path: '/dashboard/myCart',
            element: (
              <PrivetRouter>
                <CartPage></CartPage>
              </PrivetRouter>
            )
          },
          {
            path: '/dashboard/userHome',
            element: (
              <PrivetRouter>
                <UserHome></UserHome>
              </PrivetRouter> 
            )
          },
          {
            path: '/dashboard/blogUpdate',
            element: (
              <PrivetRouter>
                <UpdateBlogPage></UpdateBlogPage>
              </PrivetRouter>
            )
          }
        ]
      }
    ]
  }
])
export default router
