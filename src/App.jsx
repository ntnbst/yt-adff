import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(1)
  const [isChecked, setIsChecked] = useState(false)

  // useEffect(() => {
  //   chrome?.runtime?.sendMessage({ count: count, isChecked: isChecked }, function (response) {
  //     console.log(response.farewell)
  //   })
  // }, [count, isChecked])

  const handleChangeCount = async () => {
    if (count >= 16) {
      setCount(1)
    } else {
      setCount((count) => count * 2)
    }
  }

  const changeColorOnClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const progressBar = document.querySelector('.ytp-play-progress')
        const hasProgressBarAndNormal = progressBar && isChecked
        // Check if the progress bar exists and its color is yellow
        if (hasProgressBarAndNormal) {
          // Select the video element
          const videoElement = document.querySelector('.video-stream')
          const isVideoPlaying = videoElement && !videoElement.paused && !videoElement.ended
          // Check if the video element exists and is playing
          if (isVideoPlaying) {
            videoElement.playbackRate = count
            // let skipButton = document.querySelector('.ytp-ad-skip-button-modern')
            // if (skipButton) {
            //   skipButton.click()
            // }
          }
        }
      },
    })
  }

  return (
    <>
      <div id='popup-container' style={{ position: 'relative' }}>
        <span
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            background: '#fff',
            color: '#000',
            padding: '2px 6px',
            marginLeft: '8px',
            fontSize: '13px',
            borderRadius: '3px',
          }}
        >
          v1.2
        </span>
        <div className='brand'>
          <h3 style={{ color: 'rgb (198, 140, 32)', margin: '0' }}>YT AD FF</h3>
          <img src='icon.png' height='30' width='30' />
        </div>

        <div style={{ marginBottom: 32, display: 'flex', gap: 8, alignItems: 'center' }}>
          <label className='playback-speed-label' htmlFor='normalVideoCheck'>
            FF Normal Video?
          </label>

          <input
            onChange={() => setIsChecked(!isChecked)}
            type='checkbox'
            name='normalVideoCheck'
            id='normalVideoCheck'
          />
        </div>

        <div style={{ display: ' flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <label className='playback-speed-label'>Playback speed:</label>
          <button onClick={handleChangeCount} id='speed-btn'>
            {count}x
          </button>
        </div>
        <button id='apply-btn' onClick={() => changeColorOnClick()}>
          APPLY
        </button>
      </div>
    </>
  )
}

export default App
