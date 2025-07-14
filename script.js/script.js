 // Alternar menu móvel
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const mobileMenu = document.getElementById('mobileMenu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Alternar menu suspenso de idiomas
        const languageToggle = document.getElementById('languageToggle');
        const languageDropdown = document.getElementById('languageDropdown');
        
        languageToggle.addEventListener('click', () => {
            languageDropdown.classList.toggle('hidden');
        });
        
        // Fechar menu suspenso ao clicar fora
        document.addEventListener('click', (event) => {
            if (!languageToggle.contains(event.target) && !languageDropdown.contains(event.target)) {
                languageDropdown.classList.add('hidden');
            }
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
        const chatMessages = document.getElementById('chatMessages');
const messageInput = document.querySelector('input[placeholder="Escreva a sua mensagem..."]');
const sendButton = document.getElementById('sendMessageButton');
const maxMessages = 20;
let messages = [
    { user: 'Maria', text: 'Alguém sabe o nome desta música? É incrível!', time: '10:23' },
    { user: 'Carlos', text: 'É "Mona Ki Ngi Xica" do Bonga!', time: '10:24' },
    { user: 'Luísa', text: 'Adoro esta homenagem ao Bonga esta semana!', time: '10:25' },
    { user: 'Zé', text: 'Alguém vai ao concerto do Paulo Flores no sábado?', time: '10:26' },
    { user: 'Tânia', text: 'Eu vou! Mal posso esperar!', time: '10:27' }
];

function addChatMessage(text) {
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    // Adiciona nova mensagem
    messages.push({ user: 'Você', text, time });
    
    // Remove a primeira mensagem se exceder o limite
    if (messages.length > maxMessages) {
        messages.shift();
    }

    // Atualiza o chat
    updateChat();
}

function updateChat() {
    chatMessages.innerHTML = '';
    messages.forEach(({ user, text, time }) => {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message mb-3';
        messageElement.innerHTML = `
            <div class="flex items-start">
                <div class="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-2">
                    <i class="fas fa-user text-purple-600"></i>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm max-w-xs">
                    <p class="text-sm">${escapeHTML(text)}</p>
                    <p class="text-xs text-gray-500 mt-1">${escapeHTML(user)} - ${time}</p>
                </div>
            </div>
        `;
        chatMessages.appendChild(messageElement);
    });
    // Rola para a última mensagem
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função para escapar HTML e prevenir XSS
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '') return;

    addChatMessage(messageText);
    messageInput.value = '';
}

// Evento para o botão de envio
sendButton.addEventListener('click', sendMessage);

// Evento para enviar mensagem com a tecla Enter
messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Inicializa o chat com as mensagens existentes
updateChat();
        
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