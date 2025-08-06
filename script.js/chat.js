
// Configuração do Firebase (USE SUAS CREDENCIAIS)
const firebaseConfig = {
  apiKey: "AIzaSyDCu4j5u8vw2c6zq60xDwngf5XQcapZTok",
  authDomain: "radiocomercial-chat.firebaseapp.com",
  databaseURL: "https://radiocomercial-chat-default-rtdb.firebaseio.com",
  projectId: "radiocomercial-chat",
  storageBucket: "radiocomercial-chat.firebasestorage.app",
  messagingSenderId: "8299224791",
  appId: "1:8299224791:web:08593f76b48da95cacda92"
};

// Inicialize o Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// Referências do Firebase
const messagesRef = database.ref('messages');
const presenceRef = database.ref('presence');

// Elementos do DOM
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendMessageButton');
const chatContainer = document.getElementById('chatMessages');
const onlineCount = document.getElementById('onlineCount');

// Usuário atual
const user = {
    id: 'user_' + Math.random().toString(16).slice(2),
    name: 'Anônimo'
};

// Solicitar nome do usuário
function requestUsername() {
    const username = prompt("Digite seu nome para o chat:", "Ouvinte");
    if (username && username.trim() !== "") {
        user.name = username.trim().substring(0, 15); // Limita a 15 caracteres
    }
}
requestUsername();

// Monitorar presença online
function setupPresence() {
    presenceRef.child(user.id).set(user.name);
    presenceRef.child(user.id).onDisconnect().remove();
    
    presenceRef.on('value', (snapshot) => {
        const count = snapshot.numChildren();
        onlineCount.textContent = count + (count === 1 ? ' ouvinte online' : ' ouvintes online');
    });
}

// Enviar mensagem
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        messagesRef.push({
            text: message,
            user: user.name,
            userId: user.id,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        }).catch(error => {
            console.error("Erro ao enviar mensagem:", error);
            alert("Erro ao enviar mensagem. Recarregue a página e tente novamente.");
        });
        messageInput.value = '';
    }
}

// Configurar listeners de eventos
function setupEventListeners() {
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// Exibir mensagens
function setupMessagesListener() {
    messagesRef.limitToLast(100).on('child_added', (snapshot) => {
        const message = snapshot.val();
        displayMessage(message);
    });
}

// Formatar e exibir uma mensagem
function displayMessage(message) {
    const isCurrentUser = message.userId === user.id;
    const messageHtml = `
        <div class="chat-message mb-3 ${isCurrentUser ? 'ml-auto' : ''}">
            <div class="flex items-start ${isCurrentUser ? 'flex-row-reverse' : ''}">
                <div class="w-8 h-8 rounded-full ${isCurrentUser ? 'bg-purple-600' : 'bg-gray-600'} flex items-center justify-center mr-2">
                    <i class="fas fa-user text-white text-sm"></i>
                </div>
                <div class="${isCurrentUser ? 'bg-purple-600' : 'bg-gray-700'} p-3 rounded-lg max-w-xs">
                    ${!isCurrentUser ? `<p class="text-xs text-purple-300 font-semibold">${message.user}</p>` : ''}
                    <p class="text-sm ${isCurrentUser ? 'text-white' : 'text-gray-200'}">${message.text}</p>
                    <p class="text-xs ${isCurrentUser ? 'text-purple-200' : 'text-gray-500'} mt-1">
                        ${formatTime(message.timestamp)} ${isCurrentUser ? '(Você)' : ''}
                    </p>
                </div>
            </div>
        </div>
    `;
    
    chatContainer.insertAdjacentHTML('beforeend', messageHtml);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Formatar timestamp
function formatTime(timestamp) {
    if (!timestamp) return 'Agorá';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Inicializar chat
function initChat() {
    setupPresence();
    setupEventListeners();
    setupMessagesListener();
}

// Iniciar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initChat);
