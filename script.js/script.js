 // Alternar menu móvel
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const mobileMenu = document.getElementById('mobileMenu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
    
        
        // Funcionalidade do reprodutor de áudio
        const playButton = document.getElementById('playButton');
        const livePlayButton = document.getElementById('livePlayButton');
        let isPlaying = false;
        
        playButton.addEventListener('click', () => {
            isPlaying = !isPlaying;
            playButton.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        });
        
        livePlayButton.addEventListener('click', () => {
            isPlaying = !isPlaying;
            livePlayButton.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        });
        
        // Simule mensagens de bate-papo
       
        
        // Rolagem suave para links de navegação
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Feche o menu móvel se estiver aberto
                mobileMenu.classList.add('hidden');
            });
        });