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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement:<ErrorPage></ErrorPage>,
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
        path: 'cart',
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
        path: 'shop',
        element: <Shop></Shop>
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
      }
    ]
  }
])
export default router
