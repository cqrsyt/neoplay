// Main JS for NeoPlay - Updated with rule links

let currentQuestions = [
    { q: "你喜欢策略深度高的游戏吗？", options: ["是", "否"] },
    { q: "偏好多人对战还是单人？", options: ["多人", "单人"] },
    { q: "喜欢传统棋类还是卡牌？", options: ["棋类", "其他"] }
];

function showQuiz() { /* ... 保持不变 */ }

function submitQuiz() { /* ... */ }

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
            <a href="${game.link}" target="_blank" style="color:#00ffcc; display:block; margin-top:10px; text-decoration:none;">📖 查看详细规则</a>
        `;
        grid.appendChild(card);
    });
}

function playGame(gameName) {
    alert(`进入 ${gameName} 游戏界面！（演示版）`);
}

function showAI() { /* ... */ }

function sendMessage() { /* ... */ }

// 快捷键保持不变
