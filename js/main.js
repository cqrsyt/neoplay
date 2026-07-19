// Main JS for NeoPlay - 已扩展游戏列表

let currentQuestions = [
    { q: "你喜欢策略深度高的游戏吗？", options: ["是", "否"] },
    { q: "偏好多人对战还是单人？", options: ["多人", "单人"] },
    { q: "喜欢传统棋类还是卡牌？", options: ["棋类", "其他"] }
];

function showQuiz() {
    document.getElementById('quiz').classList.remove('hidden');
    document.getElementById('games-list').classList.add('hidden');
    document.getElementById('hero').style.display = 'none';
    
    let qHTML = '';
    currentQuestions.forEach((q, i) => {
        qHTML += `<div><p>${q.q}</p>`;
        q.options.forEach(opt => {
            qHTML += `<button onclick="answerQ(${i}, '${opt}')">${opt}</button>`;
        });
        qHTML += `</div>`;
    });
    document.getElementById('quiz-questions').innerHTML = qHTML;
}

function answerQ(i, ans) {
    console.log(`Q${i}: ${ans}`);
}

function submitQuiz() {
    document.getElementById('recommendation').innerHTML = `<h3>推荐：围棋、中国象棋、狼人杀！</h3><p>基于您的偏好，这些策略与社交游戏最适合您。</p>`;
}

function showGames() {
    document.getElementById('games-list').classList.remove('hidden');
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('hero').style.display = 'none';
    
    const games = [
        {name: '围棋', desc: '黑白对弈，极致策略'},
        {name: '国际象棋', desc: '经典王者之战'},
        {name: '中国象棋', desc: '楚河汉界，中华智慧'},
        {name: '狼人杀', desc: '社交推理，杀人游戏'},
        {name: '跳棋', desc: '简单快速，吃子跳跃'},
        {name: '国际跳棋', desc: '国际规则，多子连跳'},
        {name: '飞行棋', desc: '掷骰竞速，四色飞机'},
        {name: '出包魔法师', desc: '卡牌爆炸，趣味对战'}
    ];
    
    let grid = document.querySelector('.game-grid');
    grid.innerHTML = '';
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <h3>${game.name}</h3>
            <p>${game.desc}</p>
            <button onclick="playGame('${game.name}')">开始游戏 / 查看规则</button>
        `;
        grid.appendChild(card);
    });
}

function playGame(gameName) {
    alert(`正在进入 ${gameName} ！\n\n当前为演示版本。\n\nAI助手和教程已可用，你可以随时询问规则和策略。`);
    // 未来可扩展为真实游戏界面
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
    
    // 模拟AI智能回复
    setTimeout(() => {
        let resp = '这个游戏的核心是策略与时机！';
        
        if (msg.includes('围棋') || msg.includes('go')) resp = '围棋注重布局和实地，推荐先学星位和定式。';
        else if (msg.includes('狼人杀') || msg.includes('werewolf')) resp = '狼人杀关键是逻辑和发言，预言家要谨慎跳身份。';
        else if (msg.includes('规则')) resp = '对应游戏的规则已在 tutorials 文件夹，你也可以问得更具体。';
        
        messages.innerHTML += `<p><strong>AI导师:</strong> ${resp}</p>`;
        messages.scrollTop = messages.scrollHeight;
    }, 600);
}

// 快捷键支持
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