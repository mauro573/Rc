// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDCu4j5u8vw2c6zq60xDwngf5XQcapZTok",
  authDomain: "radiocomercial-chat.firebaseapp.com",
  databaseURL: "https://radiocomercial-chat-default-rtdb.firebaseio.com",
  projectId: "radiocomercial-chat",
  storageBucket: "radiocomercial-chat.app", // Corrigido
  messagingSenderId: "8299224791",
  appId: "1:8299224791:web:08593f76b48da95cacda92"
};

// Inicialização do Firebase
let database;
try {
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  console.log("Firebase conectado com sucesso!");
} catch (error) {
  console.error("Erro ao conectar ao Firebase:", error);
}

// Elementos do HTML
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendMessageButton');
const chatContainer = document.getElementById('chatMessages');
const onlineCount = document.getElementById('onlineCount');

// Sistema de usuário
let username = localStorage.getItem('radioChatUsername') || 'Anônimo';
if (!localStorage.getItem('radioChatUsername')) {
  username = prompt("Qual seu nome ou apelido?", "Ouvinte") || username;
  localStorage.setItem('radioChatUsername', username);
}

// Gerar ID único se não existir
if (!localStorage.getItem('radioChatUserId')) {
  localStorage.setItem('radioChatUserId', 'user_' + Math.random().toString(36).substr(2, 9));
}

// Enviar mensagem
function sendMessage() {
  if (!database) {
    console.error("Banco de dados não está conectado!");
    alert("Erro de conexão. Recarregue a página.");
    return;
  }

  const message = messageInput.value.trim();
  if (!message) return;

  sendButton.disabled = true;
  
  database.ref('messages').push({
    text: message,
    user: username,
    userId: localStorage.getItem('radioChatUserId'),
    timestamp: firebase.database.ServerValue.TIMESTAMP
  })
  .then(() => {
    messageInput.value = '';
  })
  .catch((error) => {
    console.error("Erro ao enviar:", error);
    alert("Erro ao enviar mensagem. Tente novamente.");
  })
  .finally(() => {
    sendButton.disabled = false;
  });
}

// Exibir mensagens
function displayMessage(message) {
  if (!message || !chatContainer) return;

 // Dentro de displayMessage():
const messageElement = document.createElement('div');
messageElement.className = `chat-message mb-3 ${isCurrentUser ? 'ml-auto' : ''}`;
messageElement.innerHTML = `
  <div class="flex items-start ${isCurrentUser ? 'flex-row-reverse' : ''}">
    <div class="w-8 h-8 rounded-full ${isCurrentUser ? 'bg-purple-600' : 'bg-gray-600'} flex items-center justify-center mr-2">
      <i class="fas fa-user text-white text-sm"></i>
    </div>
    <div class="${isCurrentUser ? 'bg-purple-600' : 'bg-gray-700'} p-3 rounded-lg max-w-xs">
      ${!isCurrentUser ? `<p class="text-xs text-purple-300 font-semibold">${message.user}</p>` : ''}
      <p class="text-sm ${isCurrentUser ? 'text-white' : 'text-gray-200'}">${message.text}</p>
      <p class="text-xs ${isCurrentUser ? 'text-purple-200' : 'text-gray-500'} mt-1">
        ${timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        ${isCurrentUser ? '<span class="text-purple-300">(Você)</span>' : ''}
      </p>
    </div>
  </div>
`;

// Dentro do evento de carregamento inicial:
if (database) {
  chatContainer.innerHTML = `
    <div class="text-center text-gray-500 py-10">
      <i class="fas fa-comment-slash text-2xl mb-2"></i>
      <p>Nenhuma mensagem ainda. Seja o primeiro a comentar!</p>
    </div>
  `;

  database.ref('messages').limitToLast(50).on('child_added', (snapshot) => {
    if (chatContainer.children.length === 1 && chatContainer.children[0].classList.contains('text-gray-500')) {
      chatContainer.innerHTML = '';
    }
    displayMessage(snapshot.val());
  });
}

  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Monitorar mensagens e usuários online
if (database) {
  // Limpar chat ao carregar
  chatContainer.innerHTML = '';

  // Carregar mensagens
  database.ref('messages').limitToLast(50).on('child_added', (snapshot) => {
    displayMessage(snapshot.val());
  });

  // Contador de online
  const userRef = database.ref('online/' + localStorage.getItem('radioChatUserId'));
  userRef.set(true);
  userRef.onDisconnect().remove();

  database.ref('online').on('value', (snapshot) => {
    if (onlineCount) {
      onlineCount.textContent = snapshot.numChildren();
    }
  });
}

// Event listeners
if (sendButton && messageInput) {
  sendButton.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
} else {
  console.error("Elementos do chat não encontrados!");
}