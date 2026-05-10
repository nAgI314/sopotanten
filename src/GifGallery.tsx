import { gifs } from './gif-list'
import './GifGallery.css'

export default function GifGallery() {
  function downloadFile(src: string) {
    const a = document.createElement('a')
    a.href = src
    const parts = src.split('/')
    a.download = parts[parts.length - 1]
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  function downloadAll() {
    gifs.forEach((name, i) => {
      setTimeout(() => downloadFile(`/gif/${name}`), i * 150)
    })
  }

  return (
    <div className="gif-gallery-wrap">
      <div className="gallery-description">
        <h1>そぽたん.gif</h1>
      </div>
    <div className="gif-gallery">
      {gifs.map((name, idx) => (
        <div key={name} className="cell" data-index={idx}>
          <div className="media-wrap">
            <img src={`/gif/${name}`} alt={name} className="gif" />
          </div>
          <button className="download-btn" onClick={() => downloadFile(`/gif/${name}`)}>
            ダウンロード
          </button>
        </div>
      ))}

      <div className="summary-download">
        <button onClick={downloadAll} className="download-btn">
          まとめてダウンロード
        </button>
      </div>
    </div>
    </div>
  )
}
