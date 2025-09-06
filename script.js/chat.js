
    
    
"https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
"https://www.gstatic.com/firebasejs/9.6.1/firebase-database-compat.js"


    // Suas configurações do Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyDCu4j5u8vw2c6zq60xDwngf5XQcapZTok",
        authDomain: "radiocomercial-chat.firebaseapp.com",
        databaseURL: "https://radiocomercial-chat-default-rtdb.firebaseio.com",
        projectId: "radiocomercial-chat",
        storageBucket: "radiocomercial-chat.firebasestorage.app",
        messagingSenderId: "8299224791",
        appId: "1:8299224791:web:08593f76b48da95cacda92",
        measurementId: "G-7WTQDH990J"
    };

    // Inicializar Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    
    // O resto do código permanece igual ao que mostrei anteriormente
    // [Insira aqui o código completo que mostrei na resposta anterior]

    
    
 
    
    // Referências para os elementos do DOM
    const messageInput = document.getElementById('messageInput');
    const sendMessageButton = document.getElementById('sendMessageButton');
    const chatMessages = document.getElementById('chatMessages');
    const onlineCount = document.getElementById('onlineCount');
    
    // Referência para a coleção de mensagens no Firebase
    const messagesRef = database.ref('messages');
    
    // Referência para contagem de usuários online
    const usersOnlineRef = database.ref('users_online');
    
    // Gerar um ID único para o usuário
    const userId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    
    // Função para formatar a data/hora
    function formatDateTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
    
    // Adicionar usuário online
    function addUserOnline() {
        const userRef = usersOnlineRef.child(userId);
        userRef.set({
            online: true,
            last_active: firebase.database.ServerValue.TIMESTAMP
        });
        
        // Remover usuário quando desconectar
        userRef.onDisconnect().remove();
    }
    
    // Monitorar contagem de usuários online
    function monitorOnlineUsers() {
        usersOnlineRef.on('value', (snapshot) => {
            const count = snapshot.numChildren();
            onlineCount.textContent = `${count} online`;
        });
    }
    
    // Enviar mensagem
    function sendMessage() {
        const messageText = messageInput.value.trim();
        
        if (messageText) {
            // Adicionar mensagem ao Firebase
            messagesRef.push({
                text: messageText,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                userId: userId
            })
            .then(() => {
                // Limpar input após envio
                messageInput.value = '';
            })
            .catch((error) => {
                console.error("Erro ao enviar mensagem: ", error);
                alert("Erro ao enviar mensagem. Tente novamente.");
            });
        }
    }
    
    // Carregar mensagens
    function loadMessages() {
        messagesRef.orderByChild('timestamp').limitToLast(100).on('value', (snapshot) => {
            const messages = snapshot.val();
            chatMessages.innerHTML = '';
            
            if (messages) {
                // Converter objeto em array
                const messagesArray = Object.entries(messages).map(([key, value]) => ({ 
                    id: key, 
                    ...value 
                }));
                
                // Ordenar por timestamp (mais antigas primeiro)
                messagesArray.sort((a, b) => a.timestamp - b.timestamp);
                
                messagesArray.forEach(message => {
                    const messageElement = document.createElement('div');
                    messageElement.classList.add('message', 'mb-3');
                    
                    const time = formatDateTime(message.timestamp);
                    
                    messageElement.innerHTML = `
                        <div class="flex items-start">
                            <div class="bg-gray-700 rounded-lg p-3 max-w-xs">
                                <p class="text-sm text-white">${message.text}</p>
                                <p class="text-xs text-gray-400 mt-1">${time}</p>
                            </div>
                        </div>
                    `;
                    
                    chatMessages.appendChild(messageElement);
                });
                
                // Rolagem automática para a última mensagem
                chatMessages.scrollTop = chatMessages.scrollHeight;
            } else {
                chatMessages.innerHTML = `
                    <div class="text-center text-gray-500 py-4">
                        Nenhuma mensagem ainda. Seja o primeiro a enviar uma mensagem!
                    </div>
                `;
            }
        });
    }
    
    // Event listeners
    sendMessageButton.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Inicializar o chat
    function initChat() {
        addUserOnline();
        monitorOnlineUsers();
        loadMessages();
    }
    
    // Iniciar quando a página carregar
    window.addEventListener('DOMContentLoaded', initChat);
