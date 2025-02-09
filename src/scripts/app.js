// src/scripts/app.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const form = document.getElementById('valentine-form');
    const message = document.getElementById('message');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const response = document.getElementById('response');
    let noButtonClickCount = 0;

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const responseMessage = `Hey ${name}, would you be my Valentine? ❤️`;
            message.textContent = responseMessage;
            message.classList.remove('hidden');
            yesButton.classList.remove('hidden');
            noButton.classList.remove('hidden');
        });
    }

    if (yesButton && noButton && response) {
        yesButton.addEventListener('click', () => {
            response.textContent = "Yay! I'm so happy! ❤️";
            response.classList.remove('hidden');
            confetti();
        });

        noButton.addEventListener('mouseover', () => {
            if (noButtonClickCount < 3) {
                noButton.style.position = 'fixed';
                // let newTop = Math.random() * 10;
                // let newLeft = Math.random() * 10;

                // Ensure the button stays within the viewport
                const buttonRect = noButton.getBoundingClientRect();
                const maxTop = window.innerHeight - buttonRect.height;
                const maxLeft = window.innerWidth - buttonRect.width;

                // if (newTop > maxTop) newTop = maxTop;
                // if (newLeft > maxLeft) newLeft = maxLeft;
                
                // let newTop = Math.random() * maxTop;
                // let newLeft = Math.random() * maxLeft;

                let newTop = Math.max(0, Math.min(Math.random() * maxTop, maxTop));
                let newLeft = Math.max(0, Math.min(Math.random() * maxLeft, maxLeft));


                noButton.style.top = `${newTop}px`;
                noButton.style.left = `${newLeft}px`;
                noButtonClickCount++;
            } else {
                noButton.style.pointerEvents = 'none';
            }
        });

        noButton.addEventListener('click', () => {
            response.textContent = "Oh no! Maybe next time. 😢";
            response.classList.remove('hidden');
        });
    }

    // Initialize floating hearts
    createFloatingHearts();
    createWindHearts();
    
    // Initialize interactive elements
    initializeButtons();
    initializeSparkles();
});

function confetti() {
    // Add confetti animation logic here
}

// Original floating hearts
function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    const heartCount = 25;
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤';
        
        const sizes = ['small', 'medium', 'large'];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        heart.classList.add(randomSize);
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.opacity = (Math.random() * 0.5 + 0.3).toString();
        
        if (Math.random() < 0.2) {
            heart.classList.add('fire');
        }
        
        const rotation = Math.random() * 360;
        heart.style.transform = `rotate(${rotation}deg)`;
        
        container.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
            createHeart();
        });
    }

    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 300);
    }
}

// New wind-affected hearts
function createWindHearts() {
    const container = document.createElement('div');
    container.id = 'wind-hearts';
    document.body.appendChild(container);
    
    const heartCount = 15; // Fewer hearts for wind effect
    
    function createWindHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart wind-heart'; // New class for wind hearts
        
        const sizes = ['small', 'medium', 'large'];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        heart.classList.add(randomSize);
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = `-${Math.random() * 5}s, -${Math.random() * 6}s`;
        heart.style.opacity = (Math.random() * 0.5 + 0.3).toString();
        
        container.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
            createWindHeart();
        });
    }

    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            createWindHeart();
        }, i * 300);
    }
}

// Initialize button interactions
function initializeButtons() {
    const noButton = document.querySelector('.no-btn');
    
    if (noButton) {
        let messageIndex = 0;
        let moveCount = 0;
        const movesPerDrain = 2;
        const noMessages = [
            "Are you sure?",
            "Really?",
            "Please?",
            "Think again!",
            "Don't go!",
            "Stay! ❤️",
            "But why? 🥺",
            "One more try?",
            "Pretty please?",
            "Last chance!"
        ];
        let lastMoveTime = 0;
        const MOVE_COOLDOWN = 500;

        function updateButtonAppearance() {
            const drainLevel = Math.floor(moveCount / movesPerDrain);
            noButton.classList.remove('drain-1', 'drain-2', 'drain-3', 'drain-4', 'drain-5');
            if (drainLevel > 0 && drainLevel <= 5) {
                noButton.classList.add(`drain-${drainLevel}`);
            }
        }

        document.addEventListener('mousemove', (e) => {
            if (!noButton.disabled) {
                const currentTime = Date.now();
                const buttonRect = noButton.getBoundingClientRect();
                const buttonCenter = {
                    x: buttonRect.left + buttonRect.width/2,
                    y: buttonRect.top + buttonRect.height/2
                };
                
                const distance = Math.sqrt(
                    Math.pow(e.clientX - buttonCenter.x, 2) + 
                    Math.pow(e.clientY - buttonCenter.y, 2)
                );
                
                if (distance < 200 && currentTime - lastMoveTime >= MOVE_COOLDOWN) {
                    lastMoveTime = currentTime;
                    
                    const maxX = window.innerWidth - buttonRect.width;
                    const maxY = window.innerHeight - buttonRect.height;
                    let newX = Math.random() * maxX;
                    let newY = Math.random() * maxY;
                    
                    noButton.style.position = 'fixed';
                    noButton.style.left = `${newX}px`;
                    noButton.style.top = `${newY}px`;
                    
                    moveCount++;
                    updateButtonAppearance();
                    
                    if (messageIndex < noMessages.length) {
                        noButton.textContent = noMessages[messageIndex];
                        messageIndex++;
                        
                        if (messageIndex === noMessages.length) {
                            setTimeout(() => {
                                noButton.style.position = 'static';
                                noButton.disabled = true;
                                noButton.textContent = "Nice try! 😉";
                                noButton.classList.add('disabled');
                            }, 1000);
                        }
                    }
                }
            }
        });
    }
}

// Add confetti effect for positive response
function triggerConfetti() {
    // Add your preferred confetti library here
    // Example: https://www.npmjs.com/package/canvas-confetti
}

// Add custom JavaScript here

// Add this function at the top level of the file
function fireConfetti(x, y) {
    window.confetti.burst(x, y);
}

function initializeSparkles() {
    let lastSparkleTime = 0;
    const SPARKLE_COOLDOWN = 50; // Time between sparkles in ms

    document.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();
        if (currentTime - lastSparkleTime >= SPARKLE_COOLDOWN) {
            createSparkle(e.clientX, e.clientY);
            lastSparkleTime = currentTime;
        }
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    // Random position around cursor
    const offsetX = (Math.random() - 0.5) * 30;
    const offsetY = (Math.random() - 0.5) * 30;
    
    sparkle.style.left = (x + offsetX - 10) + 'px'; // -10 to center
    sparkle.style.top = (y + offsetY - 10) + 'px';
    
    // Random rotation
    const rotation = Math.random() * 360;
    sparkle.style.transform = `rotate(${rotation}deg)`;
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    sparkle.addEventListener('animationend', () => {
        sparkle.remove();
    });
}