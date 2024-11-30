import { NavLink, Outlet } from 'react-router-dom'
import {
  HomeOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  ShopOutlined,
  PlusOutlined,
  TeamOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import { Layout, Menu, Typography, Badge, Button } from 'antd'
import useCart from '../../Components/Hook/useCart'
import useAdmin from '../../Components/Hook/useAdmin'

const { Header, Sider, Content } = Layout
const { Title } = Typography

const UserDashboard = () => {
  const { cart } = useCart()
  const [isAdmin] = useAdmin()

  return (
    <Layout>
      <Sider
        collapsible
        breakpoint='md'
        collapsedWidth='80'
        style={{
          overflow: 'auto'
        }}
      >
        <div
          className='hidden md:block'
          style={{ padding: '16px', textAlign: 'center', color: '#fff' }}
        >
          <Title level={4} style={{ color: 'white', margin: 0 }}>
            Play Toy
          </Title>
          <p>We Make your kid smile.</p>
        </div>
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
          {isAdmin ? (
            <>
              <Menu.Item key='1' icon={<HomeOutlined />}>
                <NavLink to='/dashboard/adminHome'>Admin Home</NavLink>
              </Menu.Item>
              <Menu.Item key='2' icon={<PlusOutlined />}>
                <NavLink to='/dashboard/addItem'>Add Items</NavLink>
              </Menu.Item>
              <Menu.Item key='3' icon={<WalletOutlined />}>
                <NavLink to='/dashboard/manageItem'>Manage Items</NavLink>
              </Menu.Item>
              <Menu.Item key='4' icon={<TeamOutlined />}>
                <NavLink to='/dashboard/allUsers'>All Users</NavLink>
              </Menu.Item>
              <Menu.Item key='5' icon={<TeamOutlined />}>
                <NavLink to='/dashboard/blogUpdate'>Update Blog Page</NavLink>
              </Menu.Item>
              <Menu.Item key='6' icon={<TeamOutlined />}>
                <NavLink to='/dashboard/paymentHistory'>
                  Payment History
                </NavLink>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key='6' icon={<HomeOutlined />}>
                <NavLink to='/dashboard/userHome'>User Home</NavLink>
              </Menu.Item>
              <Menu.Item key='7' icon={<WalletOutlined />}>
                <NavLink to='/dashboard/paymentHistory'>
                  Payment History
                </NavLink>
              </Menu.Item>
              <Menu.Item key='8'>
                <NavLink to='/dashboard/myCart'>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <ShoppingCartOutlined /> My Cart
                    </div>
                    <Badge count={cart?.length || 0} />
                  </div>
                </NavLink>
              </Menu.Item>
            </>
          )}
          <Menu.Divider />
          <Menu.Item key='9' icon={<HomeOutlined />}>
            <NavLink to='/'>Home</NavLink>
          </Menu.Item>
          <Menu.Item key='10' icon={<AppstoreOutlined />}>
            <NavLink to='/shop'>shop</NavLink>
          </Menu.Item>
          <Menu.Item key='11' icon={<ShopOutlined />}>
            <NavLink to='/blogs'>Blogs</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10
          }}
        >
          <Button type='text' icon={<MenuFoldOutlined />} />
          <Title level={5} style={{ margin: 0 }}>
            Dashboard
          </Title>
        </Header>
        <Content
          style={{
            padding: '2px',
            background: '#fff',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default UserDashboard
