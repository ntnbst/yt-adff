console.log('Content script loaded')
// Create a MutationObserver instance
let observer = new MutationObserver(detectAds)

// Configuration of the observer
let config = { childList: true, subtree: true }

const PLAYBACK_SPEED = 16
// Start observing the target node for configured mutations
observer.observe(document.body, config)

function detectAds() {
  // Select the progress bar element
  const progressBar = document.querySelector('.ytp-play-progress')
  const hasProgressBarAndisYellow =
    progressBar && window.getComputedStyle(progressBar).backgroundColor === 'rgb(255, 204, 0)'
  // Check if the progress bar exists and its color is yellow
  if (hasProgressBarAndisYellow) {
    // Select the video element
    const videoElement = document.querySelector('.video-stream')
    const isVideoPlaying = videoElement && !videoElement.paused && !videoElement.ended
    // Check if the video element exists and is playing
    if (isVideoPlaying) {
      // Set the playback rate to a high value to speed up the ad
      videoElement.playbackRate = PLAYBACK_SPEED
      // ytp-ad-skip-button-modern ytp-button
      let skipButton = document.querySelector('.ytp-ad-skip-button-modern')
      if (skipButton) {
        skipButton.click()
      }
    }
  }
}

// // Run the detection when the page is loaded and when it changes (AJAX navigation)
// document.addEventListener('DOMContentLoaded', detectAds)
// document.addEventListener('load', detectAds)
// window.onload = function () {
//   detectAds()
// }
