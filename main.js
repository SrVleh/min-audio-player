let input = document.querySelector('#file-input');
let player = document.querySelector('#audio-player');

let songListElement = document.querySelector("#song-list")


if (input) {
    input.addEventListener("change", handleTemplate, false);
}

function handleTemplate() {
    const songItem = Array.from(input.files).map((file, index) => {
        let audio = new Audio();
        audio.src = URL.createObjectURL(file);
        audio.onloadedmetadata = function() {
            console.log(audio.duration)
        };

        return [
            `
            <div class="song-item">
                <button class="play-btn" onclick="document.getElementById('audio-player${index}').play()"></button>
                <p class="song-title">${ file.name }</p>
                <audio id="audio-player${index}" controls="controls" preload="metadata" src="${ URL.createObjectURL(file) }"></audio>
            </div>
        `
        ]
    })

    // Remove comma so won't show on template
    let songItemModified = songItem.join("");

    songListElement.innerHTML = songItemModified
}