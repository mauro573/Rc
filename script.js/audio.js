 document.addEventListener('DOMContentLoaded', function() {
        const audio = document.getElementById('audioElement');
        const playButton = document.getElementById('playButton');
        const playIcon = document.getElementById('playIcon');
        const volumeControl = document.getElementById('volumeControl');
        const nowPlaying = document.getElementById('nowPlaying');
        
        // Inicializar o volume
        audio.volume = volumeControl.value / 100;

        // Controle de play/pause
        playButton.addEventListener('click', function() {
            if (audio.paused) {
                audio.play().then(() => {
                    playIcon.classList.remove('fa-play');
                    playIcon.classList.add('fa-pause');
                    nowPlaying.textContent = 'Rádio Comercial - Tocando';
                }).catch(error => {
                    console.error('Erro ao reproduzir:', error);
                    nowPlaying.textContent = 'Rádio Comercial - Erro ao carregar';
                });
            } else {
                audio.pause();
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
                nowPlaying.textContent = 'Rádio Comercial - Pausado';
            }
        });
        
        // Controle de volume
        volumeControl.addEventListener('input', function() {
            audio.volume = this.value / 100;
        });
        
        // Atualizações de estado
        audio.addEventListener('play', function() {
            nowPlaying.textContent = 'Rádio Comercial - Tocando';
        });
        
        audio.addEventListener('pause', function() {
            nowPlaying.textContent = 'Rádio Comercial - Pausado';
        });

        // Tratamento de erro
        audio.addEventListener('error', function() {
            nowPlaying.textContent = 'Rádio Comercial - Erro ao carregar';
            console.error('Erro no stream:', audio.error);
        });
    });


    // segundo audio

    document.addEventListener('DOMContentLoaded', function() {
        const audio = document.getElementById('audioElement');
        const playButton = document.getElementById('livePlayButton');
        const playIcon = document.getElementById('playIcon');
        const volumeControl = document.getElementById('volumeControl');
        const nowPlaying = document.getElementById('nowPlaying');
        
        // Inicializar o volume
        audio.volume = volumeControl.value / 100;

        // Função para tentar reconectar o stream
        function tryReconnect() {
            audio.load(); // Recarrega o stream
            audio.play().then(() => {
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
                nowPlaying.textContent = 'RadioComercial - Tocando';
            }).catch(error => {
                console.error('Erro ao reconectar:', error);
                nowPlaying.textContent = 'RadioComercial - Erro ao carregar';
                setTimeout(tryReconnect, 5000); // Tenta novamente após 5 segundos
            });
        }

        // Controle de play/pause
        playButton.addEventListener('click', function() {
            if (audio.paused) {
                tryReconnect();
            } else {
                audio.pause();
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
                nowPlaying.textContent = 'RadioComercial - Pausado';
            }
        });
        
        // Controle de volume
        volumeControl.addEventListener('input', function() {
            audio.volume = this.value / 100;
        });
        
        // Atualizações de estado
        audio.addEventListener('play', function() {
            nowPlaying.textContent = 'RadioComercial - Tocando';
        });
        
        audio.addEventListener('pause', function() {
            nowPlaying.textContent = 'RadioComercial - Pausado';
        });

        // Tratamento de erro
        audio.addEventListener('error', function() {
            nowPlaying.textContent = 'RadioComercial - Erro ao carregar';
            console.error('Erro no stream:', audio.error);
            setTimeout(tryReconnect, 5000); // Tenta reconectar após 5 segundos
        });

        // Detectar interrupções (ex.: buffering)
        audio.addEventListener('waiting', function() {
            nowPlaying.textContent = 'RadioComercial - Carregando...';
        });
    });

    // Funções de compartilhamento
    function shareToTwitter() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('Ouça a RadioComercial ao vivo! 🎶');
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }

    function shareToFacebook() {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }

    function shareToWhatsApp() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('Ouça a RadioComercial ao vivo!');
        window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
    }