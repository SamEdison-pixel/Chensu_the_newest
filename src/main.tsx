import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom' // 导入HashRouter
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter> {/* 用HashRouter替代BrowserRouter，无其他配置 */}
      <App />
    </HashRouter>
  </React.StrictMode>,
)
