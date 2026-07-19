// Main JS for NeoPlay - 完整优化版

let currentQuestions = [
    { q: "你喜欢策略深度高的游戏吗？", options: ["是", "否"] },
    { q: "偏好多人对战还是单人？", options: ["多人", "单人"] },
    { q: "喜欢传统棋类还是卡牌？", options: ["棋类", "其他"] }
];

function showQuiz() {
    userAnswers = [];
    document.getElementById('quiz').classList.remove('hidden');
    document.getElementById('games-list').classList.add('hidden');
    document.getElementById('hero').style.display = 'none';
    
    const questions = [
        { q: "你喜欢策略深度高的游戏吗？", options: ["非常喜欢", "一般", "不喜欢"] },
        { q: "偏好多人社交还是单人思考？", options: ["多人", "单人"] },
        { q: "喜欢传统棋类还是快速卡牌/竞速？", options: ["传统棋类", "快速娱乐"] },
        { q: "你有耐心慢慢思考吗？", options: ["有", "一般"] }
    ];
    
    let qHTML = '';
    questions.forEach((q, i) => {
        qHTML += `<div style="margin:20px 0"><p><strong>${q.q}</strong></p>`;
        q.options.forEach(opt => {
            qHTML += `<button onclick="recordAnswer(${i}, '${opt}')" style="margin:5px; padding:10px 20px; font-size:1.1rem;">${opt}</button>`;
        });
        qHTML += `</div>`;
    });
    document.getElementById('quiz-questions').innerHTML = qHTML;
}

function answerQ(i, ans) {
    console.log(`Answered Q${i}: ${ans}`);
}
let userAnswers = [];

function recordAnswer(qIndex, answer) {
    userAnswers[qIndex] = answer;
    console.log(`Q${qIndex}: ${answer}`);
}
function submitQuiz() {
    let recommendation = "根据您的回答，推荐：";
    
    if (userAnswers[0] === "非常喜欢" && userAnswers[2] === "传统棋类") {
        recommendation += "围棋、中国象棋（深度策略）";
    } else if (userAnswers[1] === "多人") {
        recommendation += "狼人杀（社交推理）";
    } else {
        recommendation += "国际象棋、跳棋（平衡型）";
    }
    
    recommendation += "<p>点击游戏卡片开始体验，AI导师随时为您解答！</p>";
    
    document.getElementById('recommendation').innerHTML = `<h3>${recommendation}</h3>`;
}
function showGames() {
    document.getElementById('games-list').classList.remove('hidden');
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('hero').style.display = 'none';
    
    const games = [
        {name: '围棋', desc: '黑白对弈，极致策略', link: 'https://baike.baidu.com/item/%E5%9B%B4%E6%A3%8B/165'},
        {name: '国际象棋', desc: '经典王者之战', link: 'https://baike.baidu.com/item/%E5%9B%BD%E9%99%85%E8%B1%A1%E6%A3%8B'},
        {name: '中国象棋', desc: '楚河汉界', link: 'https://baike.baidu.com/item/%E4%B8%AD%E5%9B%BD%E8%B1%A1%E6%A3%8B'},
        {name: '狼人杀', desc: '社交推理', link: 'https://baike.baidu.com/item/%E7%8B%BC%E4%BA%BA%E6%9D%80'},
        {name: '跳棋', desc: '简单快速', link: 'https://baike.baidu.com/item/%E8%B7%B3%E6%A3%8B'},
        {name: '飞行棋', desc: '掷骰竞速', link: 'https://baike.baidu.com/item/%E9%A3%9E%E8%A1%8C%E6%A3%8B'}
    ];
    
    let grid = document.querySelector('.game-grid');
    grid.innerHTML = '';
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <h3>${game.name}</h3>
            <p>${game.desc}</p>
            <button onclick="playGame('${game.name}')">开始游戏</button>
            <a href="${game.link}" target="_blank" style="color:#00ffcc; display:block; margin-top:12px;">📖 详细规则</a>
        `;
        grid.appendChild(card);
    });
}

function playGame(gameName) {
    const modal = document.getElementById('game-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    
    title.textContent = gameName + " - 详细教程与游玩";
    
    content.innerHTML = `
        <h3>规则概述</h3>
        <p>点击上方规则链接或这里查看详细说明。</p>
        <p>本界面支持真实游玩（Canvas棋盘开发中）。</p>
        <button onclick="startSimpleGame('${gameName}')" style="padding:15px 30px; font-size:1.1rem;">立即开始对战</button>
    `;
    
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('game-modal').style.display = 'none';
}

function startSimpleGame(gameName) {
    alert(`正在启动 ${gameName} 真实对战模式！\n\n（简单版Canvas棋盘，未来会完善完整AI对战）`);
    closeModal();
}

function showAI() {
    document.getElementById('ai-assistant').classList.toggle('hidden');
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    
    const messages = document.getElementById('chat-messages');
    messages.innerHTML += `<p><strong>你:</strong> ${msg}</p>`;
    input.value = '';
    
    setTimeout(() => {
        let resp = '在策略游戏中，耐心和布局很重要！';
        if (msg.includes('规则') || msg.includes('怎么玩')) resp = '点击游戏卡片上的规则链接查看详细说明。';
        messages.innerHTML += `<p><strong>AI导师:</strong> ${resp}</p>`;
        messages.scrollTop = messages.scrollHeight;
    }, 600);
}

// 快捷键
document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'q') showQuiz();
    if (e.key.toLowerCase() === 'g') showGames();
    if (e.key.toLowerCase() === 'a') showAI();
    if (e.key === 'Escape') {
        document.getElementById('hero').style.display = 'flex';
        document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
        document.getElementById('ai-assistant').classList.add('hidden');
    }
});
