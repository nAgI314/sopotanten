import './App.css'
import GifGallery from './GifGallery'
import DisplayGallery from './DisplayGallery'

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const isDisplayPage = path === '/display'

  return (
    <>
      {isDisplayPage ? <DisplayGallery /> : <GifGallery />}
    </>
  )
}

export default App
