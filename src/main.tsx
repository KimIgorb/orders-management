import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux'
import App from './App.tsx'
import './assets/index.css'
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
      >
        <App />
      </SnackbarProvider>
    </Provider>
  </BrowserRouter>
)
