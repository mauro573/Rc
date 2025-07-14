  document.addEventListener('DOMContentLoaded', function() {
        const audio = document.getElementById('audioElement');
        const playButton = document.getElementById('playButton');
        const playIcon = document.getElementById('playIcon');
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');
        const volumeControl = document.getElementById('volumeControl');
        const nowPlaying = document.getElementById('nowPlaying');
        
        // Controle de play/pause
        playButton.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
            } else {
                audio.pause();
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
            }
        });
        
        // Controle de volume
        volumeControl.addEventListener('input', function() {
            audio.volume = this.value / 100;
        });
        
        // Atualizações de estado (opcional)
        audio.addEventListener('play', function() {
            nowPlaying.textContent = '"Mona Ki Ngi Xica" - Bonga';
        });
        
        // Botões de próximo/anterior (precisa implementar a lógica)
        prevButton.addEventListener('click', function() {
            // Implemente a lógica para música anterior
            console.log('Previous track');
        });
        
        nextButton.addEventListener('click', function() {
            // Implemente a lógica para próxima música
            console.log('Next track');
        });
    });