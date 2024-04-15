import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Amplify } from 'aws-amplify'
import { config } from './lib/awsConfig'
import { ConfirmAccount } from './pages/ConfirmAccount'
import { CognitoProvider } from './contexts/CognitoProvider'
import { Layout } from './pages/Layout'
import { Protected } from './pages/Protected'
import { isAuthenticatedStore } from './stores/auth'
import { WithCognito } from './components/AuthRoute'

Amplify.configure(config)


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        loader: () => {
          console.log('isAuthenticatedStore.state', isAuthenticatedStore.state);
          if (!isAuthenticatedStore.state) {
            return null;
          }
          return null;
        },
        element: <h1>Home</h1>,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        loader: () => {
          console.log('isAuthenticatedStore.state', isAuthenticatedStore.state);
          if (!isAuthenticatedStore.state) {
            return null;
          }
          return redirect('/');
        },
        element: <Signup />,
      },
      {
        path: 'confirm-signup',
        element: <ConfirmAccount />,
      },
      {
        path: 'protected',
        // loader: () => {
        //   if (!isAuthenticatedStore.state) {
        //     return redirect('/login')
        //   }
        //   return null;
        // },
        element: <WithCognito><Protected /></WithCognito>,
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
