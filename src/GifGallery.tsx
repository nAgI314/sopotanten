import { useEffect, useRef, useState } from 'react'
import { gifs } from './gif-list'
import './GifGallery.css'

export default function GifGallery() {
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const [showFloating, setShowFloating] = useState(false)

  useEffect(() => {
    function onScroll() {
      // Show floating download button on desktop when user scrolls down a bit
      const isDesktop = window.matchMedia('(min-width: 768px)').matches
      const scrolled = window.scrollY > 30
      setShowFloating(isDesktop && scrolled)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  function downloadFile(src: string) {
    const a = document.createElement('a')
    a.href = src
    // extract filename
    const parts = src.split('/')
    a.download = parts[parts.length - 1]
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  function downloadAll() {
    gifs.forEach((name, i) => {
      // small timeout to ensure multiple downloads are triggered sequentially
      setTimeout(() => downloadFile(`/gif/${name}`), i * 150)
    })
  }

  return (
    <div className="gif-gallery" ref={galleryRef}>
      {gifs.map((name, idx) => (
        <div key={name} className="cell" data-index={idx}>
          <div className="media-wrap">
            <img src={`/gif/${name}`} alt={name} className="gif" />
          </div>
          <div className="mobile-action">
            <button
              className="download-btn"
              onClick={() => downloadFile(`/gif/${name}`)}
            >
              ダウンロード
            </button>
          </div>
        </div>
      ))}

      {/* Desktop: non-fixed summary download button shown after slight scroll */}
      <div className={`summary-download ${showFloating ? 'visible' : ''}`}>
        <button onClick={downloadAll} className="download-btn">
          まとめてダウンロード
        </button>
      </div>
    </div>
  )
}
