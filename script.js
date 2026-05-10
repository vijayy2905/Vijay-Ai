
const input = document.getElementById("userInput");

const chatBox = document.getElementById("chatBox");

const API_KEY = "AIzaSyCouB5p2GKeY92XU_TrQH8vG4Di7EJU7V4";

async function sendMessage(){

  const text = input.value.trim();

  if(!text) return;

  const userMsg = document.createElement("div");

  userMsg.className = "message user";

  userMsg.innerHTML =
  `<div class="bubble">${text}</div>`;

  chatBox.appendChild(userMsg);

  input.value = "";

  const aiMsg = document.createElement("div");

  aiMsg.className = "message ai";

  aiMsg.innerHTML =
  `<div class="bubble">⚡ Vijay AI typing...</div>`;

  chatBox.appendChild(aiMsg);

  chatBox.scrollTop = chatBox.scrollHeight;

  try{

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          contents:[
            {
              parts:[
                {
                  text:text
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
    data.candidates?.[0]?.content?.parts?.[0]?.text
    || "No response";

    aiMsg.innerHTML =
    `<div class="bubble">${reply}</div>`;

    chatBox.scrollTop = chatBox.scrollHeight;

  }

  catch(error){

    aiMsg.innerHTML =
    `<div class="bubble">⚠️ AI connection error</div>`;

  }

}

input.addEventListener("keypress",function(e){

  if(e.key==="Enter"){

    sendMessage();

  }

});

const voiceBtn = document.getElementById("voiceBtn");

if('webkitSpeechRecognition' in window){

  const recognition =
  new webkitSpeechRecognition();

  recognition.lang = "en-US";

  voiceBtn.onclick = ()=>{

    recognition.start();

  };

  recognition.onresult = (event)=>{

    input.value =
    event.results[0][0].transcript;

  };

}
