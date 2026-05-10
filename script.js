
const input = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

function sendMessage(){
  const text = input.value.trim();
  if(!text) return;

  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.innerHTML = `<span>${text}</span>`;
  chatBox.appendChild(userMsg);

  input.value = "";

  setTimeout(()=>{
    const aiMsg = document.createElement("div");
    aiMsg.className = "message ai";
    aiMsg.innerHTML = `<span>⚡ Vijzzz AI received: "${text}"</span>`;
    chatBox.appendChild(aiMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  },700);
}

input.addEventListener("keypress",function(e){
  if(e.key==="Enter") sendMessage();
});

const voiceBtn = document.getElementById("voiceBtn");

if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';

  voiceBtn.onclick = () => {
    recognition.start();
    voiceBtn.innerText = "🎙 Listening...";
  };

  recognition.onresult = (event) => {
    input.value = event.results[0][0].transcript;
    voiceBtn.innerText = "🎤 Voice";
  };

  recognition.onerror = () => {
    voiceBtn.innerText = "🎤 Voice";
  };
}
