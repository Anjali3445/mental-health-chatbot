// Tabs Functionality
function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }
  const tabBtns = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabBtns.length; i++) {
    tabBtns[i].className = tabBtns[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// --- CHATBOT CODE (same as before) ---
const playlists = {
  happy: [{name:"Sugar – Maroon 5", url:"https://youtu.be/09R8_2nJtjg"}, {name:"Gallan Goodiyan – Dil Dhadakne Do", url:"https://youtu.be/Bd1t03XMb2I"}],
  sad: [{name:"Fix You – Coldplay", url:"https://youtu.be/k4V3Mo61fJM"}, {name:"Channa Mereya – Ae Dil Hai Mushkil", url:"https://youtu.be/284Ov7ysmfA"}],
  stressed: [{name:"Relaxing Piano Music", url:"https://youtu.be/1ZYbU82GVz4"}],
  mad: [{name:"Badtameez Dil – Yeh Jawaani Hai Deewani", url:"https://youtu.be/IcrbM1l_BoI"}],
  sick: [{name:"Heal the World – Michael Jackson", url:"https://youtu.be/BWf-eARnf6U"}],
  anxious: [{name:"Ocean Waves – Relaxing Sounds", url:"https://youtu.be/mro0LH4TQBY"}],
  lonely: [{name:"All By Myself – Celine Dion", url:"https://youtu.be/NGrLb6W5YOM"}],
  motivated: [{name:"Eye of the Tiger – Survivor", url:"https://youtu.be/btPJPFnesV4"}],
  tired: [{name:"Weightless – Marconi Union", url:"https://youtu.be/UfcAVejslrU"}],
  excited: [{name:"Uptown Funk – Bruno Mars", url:"https://youtu.be/OPf0YbXqDm0"}]
};

const moodEmojis = {happy:"😊", sad:"😢", stressed:"😥", mad:"😡", sick:"🤒", anxious:"😰", lonely:"🥺", motivated:"💪", tired:"😴", excited:"🤩"};
const moodExercises = {
  sad: "Try a 5-min gratitude meditation 🧘‍♀️.",
  stressed: "Do deep breathing or 10-min yoga 🧘‍♂️.",
  mad: "Power yoga or brisk walk 🏃‍♂️.",
  sick: "Light stretching or restorative yoga 💧.",
  anxious: "5-min mindful breathing 🧘‍♀️.",
  lonely: "Short walk or gentle yoga 🌿.",
  tired: "Gentle stretches or cat-cow yoga 😴."
};

function detectMood(message) {
  let text = message.toLowerCase();
  if (text.includes("happy") || text.includes("joy")) return "happy";
  if (text.includes("sad") || text.includes("unhappy")) return "sad";
  if (text.includes("stress") || text.includes("tense")) return "stressed";
  if (text.includes("angry") || text.includes("mad")) return "mad";
  if (text.includes("sick") || text.includes("ill")) return "sick";
  if (text.includes("anxious") || text.includes("nervous")) return "anxious";
  if (text.includes("lonely") || text.includes("alone")) return "lonely";
  if (text.includes("motivated") || text.includes("inspired")) return "motivated";
  if (text.includes("tired") || text.includes("sleepy")) return "tired";
  if (text.includes("excited") || text.includes("thrilled")) return "excited";
  return null;
}

function sendMessage() {
  let input = document.getElementById("user-input");
  let message = input.value.trim();
  if (message === "") return;

  let chatBox = document.getElementById("chat-box");
  let userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = message;
  chatBox.appendChild(userMsg);

  let botReply = document.createElement("div");
  botReply.className = "bot-message";

  let mood = detectMood(message);

  if (mood && playlists[mood]) {
    let randomSong = playlists[mood][Math.floor(Math.random() * playlists[mood].length)];
    let emoji = moodEmojis[mood] || "💜";
    botReply.innerHTML = `I sense you're feeling <strong>${mood}</strong> ${emoji}<br>
      🎶 Here's a song: <a href='${randomSong.url}' target='_blank'>${randomSong.name}</a>`;
    if (moodExercises[mood]) botReply.innerHTML += `<br>💪 Suggestion: ${moodExercises[mood]}`;
    botReply.innerHTML += `<br><button onclick="showPlaylist('${mood}')">Show ${mood.charAt(0).toUpperCase()+mood.slice(1)} Playlist</button>`;
  } else {
    botReply.textContent = "Thanks for sharing 💜. I'm here to listen!";
  }

  chatBox.appendChild(botReply);
  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = "";
}

function showPlaylist(mood) {
  let chatBox = document.getElementById("chat-box");
  let playlistDiv = document.createElement("div");
  playlistDiv.className = "bot-message";
  let listHTML = `<strong>${mood.charAt(0).toUpperCase()+mood.slice(1)} Playlist:</strong> ${moodEmojis[mood]}<br>`;
  playlists[mood].forEach(song => listHTML += `🎵 <a href="${song.url}" target="_blank">${song.name}</a><br>`);
  playlistDiv.innerHTML = listHTML;
  chatBox.appendChild(playlistDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// --- PROFILE ---
function saveProfile() {
  let name = document.getElementById("user-name").value;
  let email = document.getElementById("user-email").value;
  let display = document.getElementById("profile-display");
  display.innerHTML = `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>`;
}

// --- DAILY MOOD TRACKER ---
let moodLogArray = [];
function logMood() {
  let mood = document.getElementById("daily-mood").value;
  let today = new Date().toLocaleDateString();
  moodLogArray.push({date: today, mood: mood});
  let logDiv = document.getElementById("mood-log");
  logDiv.innerHTML = "<h3>Logged Moods:</h3>";
  moodLogArray.forEach(entry => {
    logDiv.innerHTML += `${entry.date}: ${moodEmojis[entry.mood]} ${entry.mood}<br>`;
  });
}




