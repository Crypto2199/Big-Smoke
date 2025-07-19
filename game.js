
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

let player = { x: 100, y: 100, width: 30, height: 30, color: 'blue' };
let mission = { x: 700, y: 500, width: 20, height: 20, color: 'yellow', complete: false };
let cops = [{ x: 400, y: 300, width: 30, height: 30, color: 'red' }];

let lang = 'en';
let missionTexts = {
  en: "Mission: Walk to the yellow marker",
  ar: "المهمة: اذهب إلى العلامة الصفراء"
};

document.addEventListener('keydown', movePlayer);

function movePlayer(e) {
  switch (e.key) {
    case 'ArrowUp':
      player.y -= 10;
      break;
    case 'ArrowDown':
      player.y += 10;
      break;
    case 'ArrowLeft':
      player.x -= 10;
      break;
    case 'ArrowRight':
      player.x += 10;
      break;
  }
  checkMission();
  draw();
}

function checkMission() {
  if (!mission.complete &&
      player.x < mission.x + mission.width &&
      player.x + player.width > mission.x &&
      player.y < mission.y + mission.height &&
      player.y + player.height > mission.y) {
    mission.complete = true;
    alert(lang === 'en' ? "Mission Complete!" : "المهمة اكتملت!");
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  // Draw cops
  cops.forEach(cop => {
    ctx.fillStyle = cop.color;
    ctx.fillRect(cop.x, cop.y, cop.width, cop.height);
  });
  // Draw mission
  if (!mission.complete) {
    ctx.fillStyle = mission.color;
    ctx.fillRect(mission.x, mission.y, mission.width, mission.height);
  }
}

function setLanguage(l) {
  lang = l;
  document.getElementById("missionText").textContent = missionTexts[lang];
  document.getElementById("title").textContent = lang === "en" ? "Big Smoke Game" : "لعبة بيغ سموك";
}

draw();
