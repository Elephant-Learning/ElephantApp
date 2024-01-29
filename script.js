class MusicPlayer {
    constructor(music) {
        this.music = music;
        this.audio = new Audio();
        this.currentIndex = -1;

        this.audio.addEventListener('ended', () => {
            this.playRandom();
        });
    }

    playSong(index) {
        if (index < 0 || index >= this.music.length) {
            console.error('Index out of bounds');
            return;
        }

        this.currentIndex = index;
        const track = this.music[index];
        this.audio.src = `./music/${track[0]}.wav`;
        this.audio.play();

        let buttonSrc = document.getElementById("music-modal-button").src

        if(buttonSrc.split("/")[buttonSrc.split("/").length - 1] !== "audio.gif") document.getElementById("music-modal-button").src = "./icons/audio.gif";

        document.getElementById("play-pause-button").src = "./icons/pause.png";

        this.updateUI(track);
        this.trackProgress();
    }

    updateUI(track) {
        document.getElementById('current-music-icon').src = `./music/covers/min/${track[0]}.png`;
        document.getElementById('current-music-name').textContent = track[1];
        document.getElementById('current-music-author').textContent = track[2];
    }

    trackProgress() {
        this.audio.addEventListener('timeupdate', () => {
            const percent = (this.audio.currentTime / this.audio.duration) * 100;
            document.documentElement.style.setProperty('--music-percentage', percent.toFixed(2) + '%');
        });
    }

    togglePlayPause() {
        if (this.audio.paused) {
            this.audio.play();
            document.getElementById("music-modal-button").src = "./icons/audio.gif";
            document.getElementById("play-pause-button").src = "./icons/pause.png";
        } else {
            this.audio.pause();
            document.getElementById("music-modal-button").src = "./icons/headphones.png";
            document.getElementById("play-pause-button").src = "./icons/play.png";
        }
    }

    playRandom() {
        const randomIndex = Math.floor(Math.random() * this.music.length);
        this.playSong(randomIndex);
    }
}

const music = [
    ["city-night", "City Night", "Abhiram Boddu"],
    ["cool-breeze", "Cool Breeze", "Abhiram Boddu"],
    ["insomnia", "Insomnia", "Abhiram Boddu"],
    ["nostalgia", "Nostalgia", "Abhiram Boddu"],
    ["rainy-café", "Rainy Café", "Abhiram Boddu"],
    ["road-vibes", "Road Vibes", "Abhiram Boddu"],
    ["space-trip", "Space Trip", "Abhiram Boddu"],
    ["summer-strings", "Summer Strings", "Abhiram Boddu"],
    ["timeless-inception", "Timeless Inception", "Abhiram Boddu"]
];

const player = new MusicPlayer(music);

function loadMusicPlayer(){
    let iterator = 0;

    music.forEach((track) => {
        const newDiv = document.createElement("div");

        let coverImage = document.createElement("img");
        coverImage.src = `./music/covers/min/${track[0]}.png`

        let detailsDiv = document.createElement("div");
        let trackName = document.createElement("h1")
        trackName.innerHTML = track[1];

        let artistName = document.createElement("p");
        artistName.innerHTML = track[2];

        detailsDiv.append(trackName, artistName);

        let playButton = document.createElement("img");
        playButton.src = "./icons/play.png";
        playButton.id = `music-elem-${iterator}`

        playButton.addEventListener("click", function(e){
            player.playSong(parseInt(this.id.split("-")[2]));
        })

        newDiv.append(coverImage, detailsDiv, playButton);

        console.log("something")

        document.getElementById("music-modal-elements").appendChild(newDiv);
        iterator++;
    })
}

/*document.addEventListener('click', function(e) {
    const musicModal = document.getElementById('music-modal');

    if (musicModal && !musicModal.contains(e.target) && !document.getElementById("music-modal-button").contains(e.target)) {
        if (!musicModal.classList.contains('inactive-modal')) {
            musicModal.classList.add('inactive-modal');
        }
    }
});*/

function toggleModal(element){
    if(element.classList.contains("inactive-modal")) element.classList.remove("inactive-modal");
    else(element.classList.add("inactive-modal"));
}

function initialize(){
    loadMusicPlayer();
}  initialize();