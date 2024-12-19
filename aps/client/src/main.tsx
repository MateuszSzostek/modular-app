import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import { persistor, store } from './config/toolkit/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import Head from './meta/Head/Head.tsx'
import './styles/global.scss'
import './styles/typography.scss'
import './config/i18n/i18n.ts' // Import i18n configuration

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorTextBase: 'white',
          colorPrimary: '#8A2BE2',
          colorSuccess: '#00FFFF',
          colorWarning: '#FFD700',
          colorError: '#FF1744',
          colorLink: '#FF69B4',
          fontFamily: 'Exo 2',
          colorBgContainer: '#1C1C1C', // Background color
          controlOutline: 'none', // Removes extra outlines on hover
        },
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Head />
          <Suspense fallback="loading">
            <App />
          </Suspense>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </StrictMode>
)
