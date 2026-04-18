// Dummy Data for Rehab Centers in Bangalore
const verifiedRehabs = [
    {
        name: "Hope Haven Rehabilitation Centre",
        location: "Koramangala, Bangalore",
        rating: 4.8,
        specialties: ["Holistic Approach", "Family Counseling", "24/7 Medical Staff"],
        priceTier: "₹₹₹"
    },
    {
        name: "New Dawn Nasha Mukti Kendra",
        location: "Indiranagar, Bangalore",
        rating: 4.6,
        specialties: ["Post-Recovery Support", "Skill Development"],
        priceTier: "₹₹"
    },
    {
        name: "Serenity Path Foundation",
        location: "Whitefield, Bangalore",
        rating: 4.9,
        specialties: ["Luxury Respite", "CBT Treatments", "Total Anonymity"],
        priceTier: "₹₹₹₹"
    }
];

// DOM Elements
const rehabContainer = document.getElementById('rehab-list-container');
const sosBtn = document.getElementById('sos-btn');
const sosModal = document.getElementById('sos-modal');
const closeModal = document.getElementById('close-modal');
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendMsgBtn = document.getElementById('send-msg-btn');

// Render Rehab List Function
function renderRehabs() {
    if (!rehabContainer) return;
    
    rehabContainer.innerHTML = '';
    verifiedRehabs.forEach(rehab => {
        const item = document.createElement('div');
        item.className = 'rehab-item';
        
        const specs = rehab.specialties.join(' • ');
        
        item.innerHTML = `
            <div class="rehab-info">
                <h4>${rehab.name}</h4>
                <p><i class="fa-solid fa-location-dot"></i> ${rehab.location} &nbsp;|&nbsp; ${specs}</p>
            </div>
            <div class="rehab-stats">
                <div class="rating"><i class="fa-solid fa-star"></i> ${rehab.rating}</div>
                <div style="text-align: right; font-size: 0.8rem; color: #94A3B8;">${rehab.priceTier}</div>
                <button class="btn-outline" style="padding: 0.4rem 1rem; margin-top: 0.5rem; font-size: 0.8rem;">View Details</button>
            </div>
        `;
        rehabContainer.appendChild(item);
    });
}

// Modal Logic
function openModal() {
    sosModal.classList.add('active');
    setTimeout(() => chatInput.focus(), 300);
}

function closeSOSModal() {
    sosModal.classList.remove('active');
}

sosBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
});

closeModal.addEventListener('click', closeSOSModal);

// Close modal when clicking outside content
sosModal.addEventListener('click', (e) => {
    if (e.target === sosModal) {
        closeSOSModal();
    }
});

// Chat Logic (Fake AI Triage)
const aiResponses = [
    "I understand. It takes a lot of courage to reach out right now. Take a deep breath with me. In... and out...",
    "The urges you are feeling will pass. You have survived them before. Do you have a safe space you can go to right now?",
    "I am completely anonymous. If it helps, please just type out all the thoughts racing in your head.",
    "Remember that reaching out for help is a sign of strength, not weakness. Would you like me to connect you to a live, judgment-free counselor?"
];

let responseCounter = 0;

function addMessage(text, isUser) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${isUser ? 'msg-user' : 'msg-ai'}`;
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

const crisisKeywords = ['suicide', 'kill', 'die', 'end it', 'hurt myself', 'dead', 'overdose'];

function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Add user message
    addMessage(text, true);
    chatInput.value = '';

    const lowerText = text.toLowerCase();
    const isCrisis = crisisKeywords.some(kw => lowerText.includes(kw));

    // Simulate AI typing delay
    setTimeout(() => {
        if (isCrisis) {
            addMessage("🚨 CLINICAL SAFETY ALERT: Your life is valuable. Please immediately call National Emergency 112, or the AASRA suicide prevention helpline at 9820466726. Help is available 24/7.", false);
        } else {
            const response = aiResponses[responseCounter % aiResponses.length];
            responseCounter++;
            addMessage(response, false);
        }
    }, 1000);
}

sendMsgBtn.addEventListener('click', handleSendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

// Initialize
// Gamified Tracker Logic
let soberDays = 0;
const soberDaysCountEl = document.getElementById('sober-days-count');
const checkInBtn = document.getElementById('check-in-btn');
const badgeGrid = document.getElementById('badge-grid');

const badges = [
    { title: "Day One", icon: "fa-seedling", daysReq: 1 },
    { title: "3 Days Strong", icon: "fa-leaf", daysReq: 3 },
    { title: "One Week", icon: "fa-tree", daysReq: 7 }
];

function renderBadges() {
    if (!badgeGrid) return;
    badgeGrid.innerHTML = '';
    badges.forEach(badge => {
        const isEarned = soberDays >= badge.daysReq;
        const bDiv = document.createElement('div');
        bDiv.className = `badge ${isEarned ? 'earned' : ''}`;
        bDiv.innerHTML = `
            <i class="fa-solid ${badge.icon}"></i>
            <span>${badge.title}</span>
        `;
        badgeGrid.appendChild(bDiv);
    });
}

if (checkInBtn) {
    checkInBtn.addEventListener('click', () => {
        soberDays++;
        if (soberDaysCountEl) soberDaysCountEl.textContent = soberDays;
        renderBadges();
        
        // Visual feedback
        checkInBtn.innerHTML = `<i class="fa-solid fa-star"></i> Checked In!`;
        checkInBtn.style.background = 'var(--accent-orange)';
        setTimeout(() => {
            checkInBtn.innerHTML = `<i class="fa-solid fa-check"></i> Daily Check-in`;
            checkInBtn.style.background = 'var(--accent-teal)';
        }, 2000);
    });
}

// MCQ Exercise Logic
const mcqContainer = document.getElementById('mcq-container');

const mcqQuestions = [
    {
        question: "How are you feeling right now?",
        options: ["I'm feeling overwhelmed.", "I'm feeling anxious.", "I'm feeling numb.", "I'm feeling okay."],
        response: "It's completely okay to feel that way. Acknowledging your feelings is the first step."
    },
    {
        question: "What is your mind focusing on?",
        options: ["The urge to use.", "Memories of the past.", "Stress from work/family.", "Nothing in particular."],
        response: "Thank you for sharing. These thoughts pass, like clouds in the sky. Let's redirect gently."
    },
    {
        question: "What might help you feel a little safer right now?",
        options: ["Talking to someone who understands.", "Distracting myself with an activity.", "Just breathing for a moment.", "Writing my thoughts out."],
        response: "That's a great instinct. Remember, our Anonymous Chat is always here for you, 24/7."
    }
];

let currentQuestion = 0;

function renderMCQ() {
    if (!mcqContainer) return;
    
    if (currentQuestion >= mcqQuestions.length) {
        mcqContainer.innerHTML = `
            <div class="mcq-result">
                <h3><i class="fa-solid fa-heart" style="color: var(--accent-red);"></i> Thank You</h3>
                <p style="margin-top: 1rem; color: var(--text-main);">You've done a great job expressing yourself. Your feelings are valid, safe, and heard here.</p>
                <button class="btn-primary" style="margin-top: 1.5rem;" onclick="resetMCQ()">Start Again</button>
            </div>
        `;
        return;
    }

    const qData = mcqQuestions[currentQuestion];
    
    let html = `<div class="mcq-question">${qData.question}</div><div class="mcq-options">`;
    qData.options.forEach((opt, index) => {
        html += `<div class="mcq-option" onclick="handleMCQSelection(${index})">${opt}</div>`;
    });
    html += `</div>`;
    
    mcqContainer.innerHTML = html;
}

function handleMCQSelection(optionIndex) {
    const qData = mcqQuestions[currentQuestion];
    
    mcqContainer.innerHTML = `
        <div class="mcq-result" style="text-align:left;">
            <p style="color: var(--text-muted); font-style: italic;">" ${qData.options[optionIndex]} "</p>
            <p style="margin-top: 1rem; color: var(--text-main);">${qData.response}</p>
            <button class="btn-outline" style="margin-top: 1.5rem;" onclick="nextMCQ()">Next <i class="fa-solid fa-arrow-right"></i></button>
        </div>
    `;
}

function nextMCQ() {
    currentQuestion++;
    renderMCQ();
}

function resetMCQ() {
    currentQuestion = 0;
    renderMCQ();
}

// Theme Song Logic
function setupThemeSong() {
    const themeAudio = document.getElementById('theme-audio');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    if (themeToggleBtn && themeAudio) {
        // Lower the volume for a gentle background presence
        themeAudio.volume = 0.3;
        
        themeToggleBtn.addEventListener('click', () => {
            if (themeAudio.paused) {
                themeAudio.play();
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause Therapy';
            } else {
                themeAudio.pause();
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> Background Therapy';
            }
        });
    }
}

// Voice Agent Logic
function setupVoiceAgent() {
    const voiceBtn = document.getElementById('voice-agent-btn');
    if (!voiceBtn) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.log("Speech recognition not supported");
        voiceBtn.style.display = 'none';
        return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    
    let isListening = false;
    
    voiceBtn.addEventListener('click', () => {
        if (!isListening) {
            recognition.start();
            voiceBtn.classList.add('listening');
            voiceBtn.innerHTML = '<i class="fa-solid fa-ear-listen"></i>';
            isListening = true;
            speakAI("I am listening. How can I help you today?");
        } else {
            recognition.stop();
            voiceBtn.classList.remove('listening');
            voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
            isListening = false;
        }
    });
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        
        voiceBtn.classList.remove('listening');
        voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
        isListening = false;
        
        // Simple command routing
        if (transcript.includes('emergency') || transcript.includes('help') || transcript.includes('urge')) {
            speakAI("I am opening the triage area. You are safe.");
            setTimeout(() => { openModal(); }, 1000);
        } else if (transcript.includes('rehab') || transcript.includes('find') || transcript.includes('facility') || transcript.includes('bangalore')) {
            speakAI("Directing you to verified rehabilitation centers in Bangalore.");
            document.getElementById('rehabs').scrollIntoView({ behavior: 'smooth' });
        } else {
            speakAI("I heard you say: " + transcript + ". I recommend initiating a diagnostic evaluation.");
            setTimeout(() => document.getElementById('relax').scrollIntoView({ behavior: 'smooth' }), 2000);
        }
    };
    
    recognition.onerror = (event) => {
        voiceBtn.classList.remove('listening');
        voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
        isListening = false;
    };
}

function speakAI(text, callback) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Clear queue to prevent overlapping voices
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        if (callback) {
            utterance.onend = callback;
        }
        window.speechSynthesis.speak(utterance);
    }
}

// Oral Voice Guidance System
let guidanceActive = false;
let spokenSections = new Set();

function setupOralGuidance() {
    // Unlock Audio on first interaction to comply with browser policies
    document.addEventListener('click', () => {
        if (!guidanceActive) {
            guidanceActive = true;
            // Introduce the app upon first tap!
            speakAI("Voice guidance activated. I am your clinical assistant, and I will guide you on every step of the app.");
        }
    }, { once: true });

    // Section Scroll Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && guidanceActive) {
                const sectionId = entry.target.id;
                if (!spokenSections.has(sectionId)) {
                    spokenSections.add(sectionId);
                    
                    switch(sectionId) {
                        case 'features': 
                            speakAI("You are viewing the Treatment Protocols section."); 
                            break;
                        case 'rehabs': 
                            speakAI("You have reached Verified Treatment Facilities. Review audited hospitals in Bangalore here."); 
                            break;
                        case 'tracker': 
                            speakAI("This is the Patient Portal. Press the button to submit your daily physiological log."); 
                            break;
                        case 'relax': 
                            speakAI("This is the Diagnostic Self Evaluation area. You can commence a psychiatric self-screening."); 
                            break;
                        case 'mind-game': 
                            speakAI("Optional Assessment Game. Play this interactive game to automatically report your mindset to doctors."); 
                            break;
                        case 'education':
                            speakAI("Clinical Education area. Watch these videos to learn about physiological impacts and relapse prevention.");
                            break;
                        case 'booking-section':
                            speakAI("Voice Assisted Booking. Tap the microphone here to schedule an appointment with a specialist.");
                            break;
                    }
                }
            }
        });
    }, { threshold: 0.6 });

    const sections = ['features', 'rehabs', 'tracker', 'relax', 'mind-game', 'education', 'booking-section'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

    // Hover guidance for Quick Actions
    const quickActions = document.querySelectorAll('.action-card');
    quickActions.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (guidanceActive) {
                const title = card.querySelector('h4');
                if (title) speakAI(title.innerText + " quick action.");
            }
        });
    });
}

// Optional Game Logic
let mindGameInterval;
let gameTimerInterval;
let thoughtProfile = [];
let timeLeft = 20;

const cognitiveThoughts = [
    { text: "My heart is racing", type: "Stimulant Anxiety" },
    { text: "I feel completely numb", type: "Depressant Apathy" },
    { text: "I can't focus on one thing", type: "Cognitive Fog" },
    { text: "Everything is too loud", type: "Sensory Overload" },
    { text: "I need an escape", type: "Craving" },
    { text: "I feel watched", type: "Paranoia" }
];

function openOptionalGame() {
    document.getElementById('game-container-wrapper').style.display = 'flex';
}

function closeOptionalGame() {
    document.getElementById('game-container-wrapper').style.display = 'none';
    clearInterval(mindGameInterval);
    clearInterval(gameTimerInterval);
}

function startMindGame() {
    const startBtn = document.getElementById('start-game-btn');
    startBtn.style.display = 'none';
    document.getElementById('game-end-msg').style.display = 'none';
    document.getElementById('game-diagnostic-report').style.display = 'none';
    
    thoughtProfile = [];
    timeLeft = 20;
    document.getElementById('game-timer').innerText = timeLeft + 's';
    
    speakAI("Tap the thoughts that resonate with you right now.");
    
    gameTimerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('game-timer').innerText = timeLeft + 's';
        if (timeLeft <= 0) {
            endMindGame();
        }
    }, 1000);
    
    mindGameInterval = setInterval(() => {
        spawnThought();
    }, 1200); // Faster spawn for the game
}

function spawnThought() {
    const container = document.getElementById('game-container');
    const thoughtData = cognitiveThoughts[Math.floor(Math.random() * cognitiveThoughts.length)];
    
    const bubble = document.createElement('div');
    bubble.className = 'thought-bubble';
    bubble.innerText = thoughtData.text;
    
    const leftPercent = Math.random() * 80 + 5;
    bubble.style.left = leftPercent + '%';
    
    // Fast upwards animation (4s - 7s) since it's an active pop game
    const duration = Math.random() * 3 + 4;
    bubble.style.animationDuration = duration + 's';
    
    bubble.onclick = () => {
        if (bubble.classList.contains('absorbed')) return;
        bubble.classList.add('absorbed');
        thoughtProfile.push(thoughtData.type);
        setTimeout(() => { if (bubble.parentNode) bubble.remove(); }, 300);
    };
    
    container.appendChild(bubble);
    
    setTimeout(() => {
        if(bubble.parentNode) bubble.parentNode.removeChild(bubble);
    }, duration * 1000);
}

function endMindGame() {
    clearInterval(mindGameInterval);
    clearInterval(gameTimerInterval);
    
    document.getElementById('game-end-msg').style.display = 'block';
    
    const reportBox = document.getElementById('game-diagnostic-report');
    if (thoughtProfile.length > 0) {
        const counts = {};
        thoughtProfile.forEach(t => counts[t] = (counts[t] || 0) + 1);
        reportBox.innerHTML = 'Diagnostic Target Outputs: <br>' + JSON.stringify(counts);
        reportBox.style.display = 'block';
    } else {
        reportBox.innerHTML = 'No interaction detected.';
        reportBox.style.display = 'block';
    }
}

// Voice Assisted Appointment Booking
let bookingState = 0; // 0: Idle, 1: Greeting, 2: AppointmentCheck, 3: DateTimeCapture

function setupBookingVoiceAgent() {
    const bookingMic = document.getElementById('book-appointment-mic');
    if (!bookingMic) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        document.getElementById('booking-status-text').innerText = "Speech recognition not supported in your browser.";
        return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    
    let isListening = false;

    function startListening() {
        try {
            recognition.start();
            bookingMic.style.background = 'var(--accent-red)';
            bookingMic.style.animation = 'pulse-red 1.5s infinite';
            isListening = true;
        } catch(e) {
            console.log("Recognition already started or error: ", e);
        }
    }

    function stopListening() {
        recognition.stop();
        bookingMic.style.background = 'var(--accent-teal)';
        bookingMic.style.animation = 'none';
        isListening = false;
    }
    
    bookingMic.addEventListener('click', () => {
        if (!isListening) {
            if (bookingState === 0) {
                document.getElementById('booking-status-title').innerText = "Smart Agent Active";
                const intro = "Welcome to Aapka Jeevan Aapka Chunav. How may I help you?";
                document.getElementById('booking-status-text').innerText = intro;
                speakAI(intro, () => {
                    bookingState = 1;
                    startListening();
                });
            } else {
                startListening();
            }
        } else {
            stopListening();
        }
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        stopListening();
        
        document.getElementById('booking-status-title').innerText = "Agent Processing...";
        document.getElementById('booking-status-text').innerText = "You: '" + transcript + "'";
        
        setTimeout(() => {
            if (bookingState === 1) {
                const nextQ = "Do you want to book an appointment?";
                document.getElementById('booking-status-text').innerText = nextQ;
                speakAI(nextQ, () => {
                    bookingState = 2;
                    startListening();
                });
            } else if (bookingState === 2) {
                if (transcript.includes('yes') || transcript.includes('yeah') || transcript.includes('book') || transcript.includes('sure')) {
                    const nextQ = "Please mention the time and date of the appointment.";
                    document.getElementById('booking-status-text').innerText = nextQ;
                    speakAI(nextQ, () => {
                        bookingState = 3;
                        startListening();
                    });
                } else {
                    speakAI("Understood. Let me know if you need anything else.", () => {
                        bookingState = 0;
                        document.getElementById('booking-status-title').innerText = "Tap to Initialize Agent";
                    });
                }
            } else if (bookingState === 3) {
                document.getElementById('booking-status-title').innerText = "Appointment Found";
                document.getElementById('booking-status-text').innerText = "We have booked your appointment for: " + transcript;
                
                const detailsBox = document.getElementById('booking-confirmation-details');
                document.getElementById('booking-ticket').innerText = "Date/Time: " + transcript + "\nStatus: Confirmed & Booked";
                detailsBox.style.display = 'block';
                
                speakAI("Thank you. Your appointment has been successfully booked for " + transcript + ".", () => {
                    bookingState = 0;
                });
            }
        }, 1500);
    };

    recognition.onerror = () => {
        stopListening();
        document.getElementById('booking-status-title').innerText = "Tap to Resume Conversation";
    };
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderRehabs();
    renderBadges();
    setupThemeSong();
    setupVoiceAgent();
    setupBookingVoiceAgent();
    setupOralGuidance();
});
