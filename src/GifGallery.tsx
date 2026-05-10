import { useState } from 'react'
import { gifs } from './gif-list'
import './GifGallery.css'

export default function GifGallery() {
  const [isTweetDialogOpen, setIsTweetDialogOpen] = useState(false)

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

  function tweetWithGif(name: string) {
    const ogpSlug = name.replace(/\.gif$/i, '')
    const ogpUrl = `${window.location.origin}/ogp/${ogpSlug}.html`
    const text = `そぽが好きなのは${name} そぽ〜\n`
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(ogpUrl)}`
    window.open(intentUrl, '_blank', 'noopener,noreferrer')
    setIsTweetDialogOpen(false)
  }

  return (
    <div className="gif-gallery-wrap">
      <div className="gallery-description">
        <h1>そぽたん.gif</h1>
        <button
          className="tweet-btn"
          type="button"
          onClick={() => setIsTweetDialogOpen(true)}
        >
          ツイートする
        </button>
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

      {isTweetDialogOpen && (
        <div
          className="tweet-dialog-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tweet-dialog-title"
          onClick={() => setIsTweetDialogOpen(false)}
        >
          <div className="tweet-dialog" onClick={(event) => event.stopPropagation()}>
            <h2 id="tweet-dialog-title">どのgifがすき？</h2>
            <p className="tweet-dialog-subtitle">タップしてえらぶとXがひらきます。</p>
            <div className="tweet-gif-list">
              {gifs.map((name) => (
                <button
                  key={name}
                  type="button"
                  className="tweet-gif-item"
                  onClick={() => tweetWithGif(name)}
                >
                  <img src={`/gif/${name}`} alt={name} />
                  <span>{name}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="tweet-dialog-close"
              onClick={() => setIsTweetDialogOpen(false)}
            >
              とじる
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
