import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {store} from './store'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import './App.css'
import './reset.css'
import {init} from './utils/api-client.ts'
import ErrorPage from './pages/error/ErrorPage.tsx'
import Home from './pages/home/Home.tsx'
import ResultSearch from './pages/resultSearch/ResultSearch.tsx'
init()
const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <Home />,
  },
  {
    path: 'result/',
    errorElement: <ErrorPage />,
    element: <ResultSearch />,
  },
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
