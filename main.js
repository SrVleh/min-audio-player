let input = document.querySelector('#file-input');
let songListElement = document.querySelector("#song-list");
let songItem;

if (input) {
    input.addEventListener("change", handleTemplate, false);
}

function handleTemplate() {
    songItem = Array.from(input.files).map((file, index) => {
        return [`
            <div class="song-item">
                <button id="play-btn${index}" class="btn play-btn"></button>
                <button id="pause-btn${index}" class="btn pause-btn"></button>
                <p class="song-title">${ file.name }</p>
                <div class="volume-container">
                    <button class="volume vol-plus" onclick="document.getElementById('audio-player${index}').volume+=.1"></button>
                    <button class="volume vol-minus" onclick="document.getElementById('audio-player${index}').volume-=.1"></button>
                </div>
                <p id="totalTime${index}" class="song-duration"></p>
                <div id="wave-anim${index}" class="boxContainer hide">
                  <div class="box box1"></div>
                  <div class="box box2"></div>
                  <div class="box box3"></div>
                  <div class="box box4"></div>
                  <div class="box box5"></div>
                </div>
                <audio id="audio-player${index}"  preload="metadata" src="${ URL.createObjectURL(file) }"></audio>
            </div>
        `]
    })

    formatAndAssignToHTML(songItem, songListElement);
    getTotalTime()
    addListeners()
}

function addListeners() {
    Array.from(input.files).forEach((file, index) => {
        let playBtn = document.getElementById(`play-btn${index}`)
        playBtn.addEventListener("click", () => {
            playClicked(index)
        })

        let pauseBtn = document.getElementById(`pause-btn${index}`)
        pauseBtn.addEventListener("click", () => {
            pauseClicked(index)
        })
    })
}

function playClicked(id){
    document.getElementById(`audio-player${id}`).play()
    document.getElementById(`wave-anim${id}`).classList.toggle('hide')
}

function pauseClicked(id){
    document.getElementById(`audio-player${id}`).pause()
    document.getElementById(`wave-anim${id}`).classList.toggle('hide')
}

function formatAndAssignToHTML(item, parent) {

    let modifiedItem = item.join("");

    parent.innerHTML = modifiedItem
}

function getTotalTime() {
    songItem.forEach((song, index) => {
        let audioPlayer = document.getElementById("audio-player"+index)
        let totalTime = document.getElementById("totalTime"+index)
        audioPlayer.onloadedmetadata = function() {
            const minutes = parseInt(Math.floor(audioPlayer.duration / 60));
            const seconds = parseInt(audioPlayer.duration - minutes * 60);
            totalTime.innerText = `${minutes}:${seconds}`
        };
    })
}

/*
*/
