let listOfImages = [
    "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9de33d5-f786-406b-866c-4e8086819787_1280x720.jpeg",
    "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdb64cd7f-5b94-4cb4-a532-09fed651d48c_1280x720.jpeg",
    "https://media.istockphoto.com/id/1193307437/vector/voice_recgn_4.jpg?s=612x612&w=0&k=20&c=pL0GswbfQ1g-a1UC9bB2ae5e9hBowVfhzPUjndBEgGo=",
    "https://images.nightcafe.studio/jobs/vRpVPDPFYTtLg6QVpOtt/vRpVPDPFYTtLg6QVpOtt_4x.jpg?tr=w-9999,c-at_max",
    "https://images.nightcafe.studio/jobs/HGjF23bXBMeIWa8CN7Xq/HGjF23bXBMeIWa8CN7Xq_4x.jpg?tr=w-9999,c-at_max"
]

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
                <div class="container">
                    <button id="play-btn${index}" class="btn play-btn"></button>
                    <button id="pause-btn${index}" class="btn pause-btn"></button>
                </div>
                <p class="song-title">${ file.name }</p>
                <div class="container">
                    <button id="volume-up${index}" class="btn vol-plus"></button>
                    <button id="volume-down${index}" class="btn vol-minus" onclick="document.getElementById('audio-player${index}').volume-=.1"></button>
                </div>
                <p id="totalTime${index}" class="song-duration"></p>
                <div id="wave-anim${index}" class="boxContainer hide">
                  <div class="box box1"></div>
                  <div class="box box2"></div>
                  <div class="box box3"></div>
                  <div class="box box4"></div>
                  <div class="box box5"></div>
                  <div class="box box6"></div>
                  <div class="box box7"></div>
                </div>
                <audio id="audio-player${index}"  preload="metadata" src="${ URL.createObjectURL(file) }"></audio>
            </div>
        `]
    })

    formatAndAssignToHTML(songItem, songListElement);
    getTotalTime();
    addListeners();
    selectRandomBackground();
}

function formatAndAssignToHTML(item, parent) {
    let modifiedItem = item.join("");
    parent.innerHTML = modifiedItem;
}

function getTotalTime() {
    songItem.forEach((song, index) => {
        let audioPlayer = document.getElementById(`audio-player${index}`)
        let totalTime = document.getElementById(`totalTime${index}`)

        audioPlayer.onloadedmetadata = function() {
            const minutes = parseInt(Math.floor(audioPlayer.duration / 60));
            const seconds = parseInt(audioPlayer.duration - minutes * 60);

            totalTime.innerText = `${minutes}:${seconds}`
        };
    })
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

        let volumeUp = document.getElementById(`volume-up${index}`)
        volumeUp.addEventListener("click", () => {
            document.getElementById(`audio-player${index}`).volume+=.1
        })

        let volumeDown = document.getElementById(`volume-down${index}`)
        volumeDown.addEventListener("click", () => {
            document.getElementById(`audio-player${index}`).volume-=.1
        })
    })
}

function playClicked(id){
    let audioPlayer = document.getElementById(`audio-player${id}`)
    if (audioPlayer.paused) {
        audioPlayer.play()
        document.getElementById(`wave-anim${id}`).classList.toggle('hide')
    }
}

function pauseClicked(id){
    let audioPlayer = document.getElementById(`audio-player${id}`)
    if (!audioPlayer.paused) {
        audioPlayer.pause()
        document.getElementById(`wave-anim${id}`).classList.toggle('hide')
    }
}

function selectRandomBackground() {
    let customImg = document.getElementById("custom-img");
    customImg.style.backgroundImage = 'url(' + listOfImages[getRandomInt(0, listOfImages.length - 1)] + ')';
}

function getRandomInt(min = 0, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
