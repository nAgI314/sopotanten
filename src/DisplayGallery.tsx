import { gifs } from './gif-list'
import './DisplayGallery.css'

export default function DisplayGallery() {
  const leftGifs = gifs.slice(0, 2)
  const rightGifs = gifs.slice(2, 4)

  return (
    <div className="display-gallery">
      <div className="desktop-layout">
        <div className="gif-column">
          {leftGifs.map((name, idx) => (
            <div key={name} className="cell" data-index={idx}>
              <div className="media-wrap">
                <img src={`/gif/${name}`} alt={name} className="gif" />
              </div>
            </div>
          ))}
        </div>

        <div className="cursor-lab">
          <h2 className="cursor-lab-title">カーソルお試しエリア</h2>

          <div className="cursor-item">
            <div className="cursor-item-head">
              <img
                src="/cursor_by_nukanoto/pointer.png"
                alt="grabable cursor sample"
                className="cursor-sample"
              />
              <span>grabable</span>
            </div>
            <div className="cursor-test-area cursor-grabable">ここで試せます</div>
          </div>

          <div className="cursor-item">
            <div className="cursor-item-head">
              <img
                src="/cursor_by_nukanoto/row-resize.png"
                alt="row resize cursor sample"
                className="cursor-sample"
              />
              <span>縦 resize</span>
            </div>
            <div className="cursor-test-area cursor-row-resize">ここで試せます</div>
          </div>

          <div className="cursor-item">
            <div className="cursor-item-head">
              <img
                src="/cursor_by_nukanoto/col-resize.png"
                alt="column resize cursor sample"
                className="cursor-sample"
              />
              <span>横 resize</span>
            </div>
            <div className="cursor-test-area cursor-col-resize">ここで試せます</div>
          </div>

          <div className="cursor-item">
            <div className="cursor-item-head">
              <img
                src="/cursor_by_nukanoto/not-allowed.png"
                alt="forbidden cursor sample"
                className="cursor-sample"
              />
              <span>forbidden</span>
            </div>
            <div className="cursor-test-area cursor-forbidden">ここで試せます</div>
          </div>
        </div>

        <div className="gif-column">
          {rightGifs.map((name, idx) => (
            <div key={name} className="cell" data-index={idx + 2}>
              <div className="media-wrap">
                <img src={`/gif/${name}`} alt={name} className="gif" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mobile-layout">
        {gifs.map((name, idx) => (
          <div key={name} className="cell" data-index={idx}>
            <div className="media-wrap">
              <img src={`/gif/${name}`} alt={name} className="gif" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
