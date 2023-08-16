import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Editor from './pages/Editor'
import Blog from './pages/Blog'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import AuthVerify from './services/auth-verify'
import authService from './services/auth.service'
import Uploader from './components/Uploader'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username/write" element={<Editor />} />
        <Route path="/:username/:url" element={<Blog />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/test" element={<Uploader />} />
      </Routes>
    </>
  )
}

export default App
