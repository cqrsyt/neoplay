// Main JS for NeoPlay - 全新完整版

let userAnswers = [];
let canvas, ctx, selectedPiece = null;
let board = Array(8).fill().map(() => Array(8).fill(0));

function showQuiz() {
    userAnswers = [];
    document.getElementById('quiz').classList.remove('hidden');
    document.getElementById('games-list').classList.add('hidden');
    document.getElementById('hero').style.display = 'none';
    
    const questions = [
        { q: "你喜欢策略深度高的游戏吗？", options: ["非常喜欢", "一般", "不喜欢"] },
        { q: "偏好多人社交还是单人思考？", options: ["多人", "单人"] },
        { q: "喜欢传统棋类还是快速娱乐？", options: ["传统棋类", "快速娱乐"] }
    ];
    
    let qHTML = '';
    questions.forEach((q, i) => {
        qHTML += `<div style="margin:20px 0"><p><strong>${q.q}</strong></p>`;
        q.options.forEach(opt => {
            qHTML += `<button onclick="recordAnswer(${i}, '${opt}')" style="margin:5px; padding:10px 20px;">${opt}</button>`;
        });
        qHTML += `</div>`;
    });
    document.getElementById('quiz-questions').innerHTML = qHTML;
}

function recordAnswer(qIndex, answer) {
    userAnswers[qIndex] = answer;
}

function submitQuiz() {
    let rec = "推荐：";
    if (userAnswers[0] === "非常喜欢") rec += "围棋、中国象棋 ";
    else if (userAnswers[1] === "多人") rec += "狼人杀 ";
    else rec += "跳棋、飞行棋 ";
    document.getElementById('recommendation').innerHTML = `<h3>${rec}</h3><p>点击游戏卡片开始体验！</p>`;
}

function showGames() {
    document.getElementById('games-list').classList.remove('hidden');
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('hero').style.display = 'none';
    
    const games = [
        {name: '围棋', desc: '黑白对弈', link: 'https://baike.baidu.com/item/%E5%9B%B4%E6%A3%8B/165'},
        {name: '国际象棋', desc: '王者之战', link: 'https://baike.baidu.com/item/%E5%9B%BD%E9%99%85%E8%B1%A1%E6%A3%8B'},
        {name: '中国象棋', desc: '楚河汉界', link: 'https://baike.baidu.com/item/%E4%B8%AD%E5%9B%BD%E8%B1%A1%E6%A3%8B'},
        {name: '狼人杀', desc: '社交推理', link: 'https://baike.baidu.com/item/%E7%8B%BC%E4%BA%BA%E6%9D%80'},
        {name: '跳棋', desc: '点击游玩', link: '#'},
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
            <button onclick="playGame('${game.name}')">进入游戏</button>
            <a href="${game.link}" target="_blank" style="color:#00ffcc; display:block; margin-top:10px;">📖 规则</a>
        `;
        grid.appendChild(card);
    });
}

function playGame(gameName) {
    const modal = document.getElementById('game-modal');
    document.getElementById('modal-title').textContent = gameName;
    document.getElementById('modal-content').innerHTML = gameName === '跳棋' ? 
        `<canvas id="game-canvas" width="480" height="480" style="background:#111;border:3px solid #00ffcc;"></canvas>` : 
        `<p>详细规则加载中... 演示版</p>`;
    modal.classList.remove('hidden');
    
    if (gameName === '跳棋') {
        setTimeout(() => {
            canvas = document.getElementById('game-canvas');
            ctx = canvas.getContext('2d');
            initBoard();
            drawBoard();
            canvas.addEventListener('click', handleClick);
        }, 100);
    }
}

function closeModal() {
    document.getElementById('game-modal').classList.add('hidden');
}

function initBoard() {
    board = Array(8).fill().map(() => Array(8).fill(0));
    for (let i = 0; i < 3; i++) for (let j = 0; j < 8; j++) if ((i+j)%2===1) board[i][j] = 1;
    for (let i = 5; i < 8; i++) for (let j = 0; j < 8; j++) if ((i+j)%2===1) board[i][j] = 2;
}

function drawBoard() {
    ctx.clearRect(0, 0, 480, 480);
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            ctx.fillStyle = (i+j)%2 === 0 ? '#222' : '#555';
            ctx.fillRect(j*60, i*60, 60, 60);
            if (board[i][j] === 1) {
                ctx.fillStyle = '#ff4444';
                ctx.beginPath(); ctx.arc(j*60+30, i*60+30, 22, 0, Math.PI*2); ctx.fill();
            } else if (board[i][j] === 2) {
                ctx.fillStyle = '#4444ff';
                ctx.beginPath(); ctx.arc(j*60+30, i*60+30, 22, 0, Math.PI*2); ctx.fill();
            }
        }
    }
}

function handleClick(e) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 60);
    const y = Math.floor((e.clientY - rect.top) / 60);
    
    if (selectedPiece) {
        if (Math.abs(x - selectedPiece.x) === 1 && Math.abs(y - selectedPiece.y) === 1) {
            board[y][x] = board[selectedPiece.y][selectedPiece.x];
            board[selectedPiece.y][selectedPiece.x] = 0;
        }
        selectedPiece = null;
        drawBoard();
    } else if (board[y][x] !== 0) {
        selectedPiece = {x, y};
        drawBoard();
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 4;
        ctx.strokeRect(x*60+5, y*60+5, 50, 50);
    }
}

// 其他函数 (showAI, sendMessage, keyboard) 保持你之前的版本
function showAI() {
    document.getElementById('ai-assistant').classList.toggle('hidden');
}

function sendMessage() {
    // ... 保持之前版本
}

document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'q') showQuiz();
    if (e.key.toLowerCase() === 'g') showGames();
    if (e.key.toLowerCase() === 'a') showAI();
    if (e.key === 'Escape') {
        document.getElementById('hero').style.display = 'flex';
        document.querySelectorAll('.section, .modal').forEach(el => el.classList.add('hidden'));
    }
});
