import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'

import Wrap from './WEB/Wrap'
import "./locales/i18n0"; // 다국어 설정 파일 임포트

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <Wrap />
  </React.StrictMode>,
)
