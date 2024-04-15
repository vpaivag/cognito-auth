import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Amplify } from 'aws-amplify'
import { config } from './lib/awsConfig'
import { ConfirmAccount } from './pages/ConfirmAccount'
import { CognitoProvider } from './contexts/CognitoProvider'
import { Layout } from './pages/Layout'
import { Profile } from './pages/Profile'

Amplify.configure(config)


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <h1>Home</h1>,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'confirm-signup',
        element: <ConfirmAccount />,
      },
      {
        path: 'profile',
        element: <Profile />,
        }
    ],
  },
  
])

function App() {
  return (
    <CognitoProvider>
      <RouterProvider router={router} />
    </CognitoProvider>
  )
}

export default App
