const UIrulesBtn = document.getElementById('rules-btn');
const UIcloseBtn = document.getElementById('close-btn');
const UIrules = document.getElementById('rules');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickRowCount = 5;
const brickColumnCount = 9;

// Create ball props
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

// Create paddle props
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0 
}

// Create brick props
const brick = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// Create bricks
const bricks = [];
for(let i=0; i < brickRowCount; i++) {
    bricks[i] = [];
    for(let j = 0; j < brickColumnCount; j++) {
        const x = j * (brick.w + brick.padding) + brick.offsetX;
        const y = i * (brick.h + brick.padding) + brick.offsetY;
        bricks[i][j] = {x, y, ...brick};
    }
}

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// Draw paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// Draw score
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Draw bricks
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill();
            ctx.closePath();
        })
    })
}

// Move paddle
function movePaddle() {
    paddle.x += paddle.dx;

    // Set boundaries
    if(paddle.x + paddle.w > canvas.width - 5) {   // 5 value leaves some space between the paddle and end of the canvas. looks better
        paddle.x = canvas.width - paddle.w - 5;
    }

    if(paddle.x < 5) { 
        paddle.x = 5;
    }
}

// Move ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Set boundaries
    // x axis
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }
    // y axis
    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    // Paddle collision
    if(ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed;
    }

    // Brick collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible) {
                if(ball.x - ball.size > brick.x && // left brick side check
                   ball.x + ball.size < brick.x + brick.w && // right brick side check
                   ball.y + ball.size > brick.y && // top brick side check
                   ball.y - ball.size < brick.y + brick.h) // bottom brick side check
                {
                    ball.dy *= -1;
                    brick.visible = false;

                    increaseScore();
                }
            }
        })
    })

    // Hit bottom wall - game over
    if(ball.y + ball.size > canvas.height) {
        resetBricks();
        score = 0;
    }
}

// Increase score
function increaseScore() {
    score++;

    if(score % (brickRowCount * brickColumnCount) === 0) {
        resetBricks();
    }
}

// Make all bricks reappear
function resetBricks() {
    bricks.forEach(column => {
        column.forEach(brick => brick.visible = true);
    })
}

// Draw everything on canvas
function draw() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

// Update canvas drawing and animation
function update() {
    movePaddle();
    moveBall();
    
    // Draw everything on canvas
    draw();

    requestAnimationFrame(update);
}

update();

// Keydown event
function keyDown(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    } else if(e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    }
}

// Keyup event
function keyUp(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = 0;
    }
}


// Event Listeners //

// Open and close rules tab
UIrulesBtn.addEventListener('click', () => UIrules.classList.add('show'));
UIcloseBtn.addEventListener('click', () => UIrules.classList.remove('show'));

// Keyboard events
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);