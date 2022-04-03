const musicContainer = document.querySelector('.music-contaniner')
const playButton = document.querySelector('#play')
const prevButton = document.querySelector('#prev')
const nextButton = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')


const songs = ['song1', 'song2', 'song3']
let songIndex = 2;
loadSong(songs[songIndex])
function loadSong(song) {
    title.innerText = song;
    console.log(song);
    audio.src = `music/${song}.mp3`
    cover.src = 'images/image0.jpeg'
}
function playSong() {
    musicContainer.classList.add('play')
    playButton.innerHTML = '||'
    audio.play()
}
function pauseSong() {
    musicContainer.classList.remove('play')
    playButton.innerHTML = '>>'
    audio.pause()
}
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}
function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}



playButton.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    }
    else {
        playSong()
    }
})
prevButton.addEventListener('click', prevSong)
nextButton.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)
