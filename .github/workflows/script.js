// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Add scroll-triggered animations
    addScrollAnimations();
    
    // Create floating particles
    createFloatingParticles();
    
    // Add typing effect to the main message
    addTypingEffect();
    
    // Initialize photo effects
    initializePhotoEffects();
});

// Initialize photo effects
function initializePhotoEffects() {
    const herPhoto = document.getElementById('herPhoto');
    
    if (herPhoto) {
        // Add click effect to photo
        herPhoto.addEventListener('click', function() {
            createPhotoSparkles();
            showPhotoMessage();
        });
        
        // Add hover sparkle effect
        herPhoto.addEventListener('mouseenter', function() {
            createPhotoSparkles();
        });
        
        // Add loading animation
        herPhoto.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                this.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
                createPhotoSparkles();
            }, 300);
        });
    }
}

// Create sparkles around photo
function createPhotoSparkles() {
    const herPhoto = document.getElementById('herPhoto');
    if (!herPhoto) return;
    
    const rect = herPhoto.getBoundingClientRect();
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            sparkle.style.fontSize = '20px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 100);
    }
}

// Show romantic message after photo upload
function showPhotoMessage() {
    const messages = [
        "You are absolutely gorgeous! 💕",
        "The most beautiful person I know! 🌟",
        "You take my breath away! 😍",
        "Stunning as always! ✨",
        "My beautiful angel! 👼"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const caption = document.querySelector('.photo-caption');
    
    // Animate caption change
    caption.style.opacity = '0';
    setTimeout(() => {
        caption.textContent = randomMessage;
        caption.style.opacity = '1';
    }, 300);
}

// Initialize entrance animations
function initializeAnimations() {
    const sections = document.querySelectorAll('.animate-slide-up');
    
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
    });
}

// Add scroll-triggered animations
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    const animatedElements = document.querySelectorAll('.message-section, .story-section, .wishes-section, .romantic-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Create floating particles
function createFloatingParticles() {
    const particlesContainer = document.getElementById('particles');
    
    setInterval(() => {
        createParticle(particlesContainer);
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    
    // Random colors
    const colors = ['#ff6b9d', '#c44569', '#ff9ff3', '#f368e0'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Random size
    const size = Math.random() * 8 + 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 3000);
}

// Heart explosion effect
function createHeartExplosion() {
    const button = document.querySelector('.love-button');
    const rect = button.getBoundingClientRect();
    
    // Create multiple hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createExplosionHeart(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }, i * 50);
    }
    
    // Add button animation
    button.style.transform = 'scale(1.1)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

function createExplosionHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    
    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 200 + 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    document.body.appendChild(heart);
    
    // Animate heart
    let startTime = Date.now();
    const duration = 2000;
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress < 1) {
            const currentX = x + vx * progress;
            const currentY = y + vy * progress - (progress * progress * 200); // Gravity effect
            const opacity = 1 - progress;
            const scale = 1 + progress * 0.5;
            
            heart.style.left = currentX + 'px';
            heart.style.top = currentY + 'px';
            heart.style.opacity = opacity;
            heart.style.transform = `scale(${scale})`;
            
            requestAnimationFrame(animate);
        } else {
            document.body.removeChild(heart);
        }
    }
    
    requestAnimationFrame(animate);
}

// Typing effect for the main message
function addTypingEffect() {
    const messageElement = document.querySelector('.birthday-message');
    const originalText = messageElement.textContent;
    
    messageElement.textContent = '';
    messageElement.style.borderRight = '2px solid #c44569';
    
    let i = 0;
    const typeSpeed = 50;
    
    function typeWriter() {
        if (i < originalText.length) {
            messageElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                messageElement.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Add sparkle effect to special elements
function addSparkleEffect() {
    const sparkleElements = document.querySelectorAll('.greeting, .story-title, .wishes-title, .romantic-title');
    
    sparkleElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });
}

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        sparkle.style.fontSize = '16px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Add sparkle CSS animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-30px) scale(0.5);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Initialize sparkle effect
setTimeout(addSparkleEffect, 2000);

// Add romantic music note animation
function createMusicNotes() {
    const notes = ['♪', '♫', '♬', '♩'];
    const container = document.querySelector('.card-header');
    
    setInterval(() => {
        const note = document.createElement('div');
        note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
        note.style.position = 'absolute';
        note.style.left = Math.random() * 100 + '%';
        note.style.top = '100%';
        note.style.fontSize = '20px';
        note.style.color = 'rgba(255, 255, 255, 0.7)';
        note.style.pointerEvents = 'none';
        note.style.animation = 'musicNoteFloat 3s ease-out forwards';
        
        container.appendChild(note);
        
        setTimeout(() => {
            if (note.parentNode) {
                note.parentNode.removeChild(note);
            }
        }, 3000);
    }, 3000);
}

// Add music note CSS animation
const musicNoteStyle = document.createElement('style');
musicNoteStyle.textContent = `
    @keyframes musicNoteFloat {
        0% {
            opacity: 0;
            transform: translateY(0) rotate(0deg);
        }
        20% {
            opacity: 1;
        }
        80% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) rotate(360deg);
        }
    }
`;
document.head.appendChild(musicNoteStyle);

// Initialize music notes
setTimeout(createMusicNotes, 3000);

// Add click effect to the entire card
document.querySelector('.birthday-card').addEventListener('click', function(e) {
    if (e.target === this || e.target.classList.contains('card-body')) {
        createHeartExplosion();
    }
});

// Add keyboard interaction
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        createHeartExplosion();
    }
});

// Add romantic message rotation
function rotateRomanticMessages() {
    const messages = [
        "You are my sunshine on cloudy days ☀️",
        "Every day with you is a gift 🎁",
        "You make my heart skip a beat 💓",
        "I love you more than words can say 💕",
        "You are my greatest blessing 🙏"
    ];
    
    const messageElement = document.querySelector('.birthday-message');
    let currentIndex = 0;
    
    setInterval(() => {
        messageElement.style.opacity = '0';
        setTimeout(() => {
            messageElement.textContent = messages[currentIndex];
            messageElement.style.opacity = '1';
            currentIndex = (currentIndex + 1) % messages.length;
        }, 500);
    }, 10000);
}

// Initialize message rotation after initial typing effect
setTimeout(rotateRomanticMessages, 15000);

