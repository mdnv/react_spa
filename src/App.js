import React, { useEffect, useRef, useState } from 'react'
import lottie from 'lottie-web'
import animation from './static/animation.json'

export default function App(){
  const [show, setShow] = useState(false)
  const _el = useRef(null)

  useEffect(() => {
    if (_el) {
      lottie.loadAnimation({
        container: _el.current,
        renderer: 'svg',
        animationData: animation,
      })
    }
  }, [show])

  const _click = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.play()
    setShow(true)
    setTimeout(() => {setShow(false); audioEl.currentTime = 0;}, 3100)
  }

  return (
    <div>
      <audio className="audio-element">
        <source src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3"></source>
      </audio>
      <p>
        <span
          style={{
            fontWeight: 'bold',
            color: 'purple',
            cursor: 'pointer',
          }}
          onClick={_click}
        >
          Click me
        </span>
        {' to see miracle'}
      </p>
      <p>Now go build something great.</p>
      {show && (
        <div
          id="animation"
          ref={_el}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          }}
        />
      )}
    </div>
  )
}

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
