let input = document.querySelector('#file-input');
let player = document.querySelector('#audio-player');

if (input) {
    input.addEventListener("change", handleAudio, false);
}

function handleAudio() {
    Array.from(input.files).forEach(file => {
        console.log(file.name)
        player.src = URL.createObjectURL(file);
    });
}