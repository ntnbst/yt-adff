// document.addEventListener('DOMContentLoaded', function () {
//   var speedBtn = document.getElementById('speed-btn')
//   var speedBtnTextValue = speedBtn.textContent
//   speedBtn.addEventListener('click', function () {
//     speedBtnTextValue = speedBtnTextValue.replace('x', '')
//     speedBtnTextValue =
//       Number(speedBtnTextValue) >= 512 ? '1x' : Number(speedBtnTextValue) * 2 + 'x'
//     speedBtn.textContent = speedBtnTextValue
//     chrome.storage.sync.set({ playbackSpeed: speedBtnTextValue }, function () {
//       console.log('Playback speed saved')
//     })
//   })
// })
