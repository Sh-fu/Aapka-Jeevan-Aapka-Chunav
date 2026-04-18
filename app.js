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

let currentVoiceLang = 'en-US';

const voiceTranslations = {
    'en': {
        'intro': "Voice guidance activated. I am your clinical assistant, and I will guide you on every step of the app.",
        'features': "You are viewing the Treatment Protocols section.",
        'rehabs': "You have reached Verified Treatment Facilities. Review audited hospitals in Bangalore here.",
        'tracker': "This is the Patient Portal. Press the button to submit your daily physiological log.",
        'relax': "This is the Diagnostic Self Evaluation area. You can commence a psychiatric self-screening.",
        'mind-game': "Optional Assessment Game. Play this interactive game to automatically report your mindset to doctors.",
        'education': "Clinical Education area. Watch these videos to learn about physiological impacts and relapse prevention.",
        'booking-section': "Voice Assisted Booking. Tap the microphone here to schedule an appointment with a specialist.",
        'agent_welcome': "Welcome to Aapka Jeevan Aapka Chunav. How may I help you?",
        'agent_book_q': "Do you want to book an appointment?",
        'agent_time_q': "Please mention the time and date of the appointment.",
        'agent_confirm': "Thank you. Your appointment has been successfully booked for ",
        'agent_processing': "Agent Processing...",
        'agent_help_you': "How may I help you today?",
        'tap_to_speak': "Tap to Speak",
        'micro_active': "Tap the thoughts that resonate with you right now."
    },
    'hi': {
        'intro': "वॉयस गाइडेंस सक्रिय हो गया है। मैं आपकी नैदानिक सहायक हूं, और मैं आपको ऐप के हर कदम पर मार्गदर्शन करूंगी।",
        'features': "आप उपचार प्रोटोकॉल अनुभाग देख रहे हैं।",
        'rehabs': "आप सत्यापित उपचार सुविधाओं तक पहुंच गए हैं। यहां बैंगलोर में ऑडिट किए गए अस्पतालों की समीक्षा करें।",
        'tracker': "यह रोगी पोर्टल है। अपना दैनिक शारीरिक लॉग सबमिट करने के लिए बटन दबाएं।",
        'relax': "यह नैदानिक स्व-मूल्यांकन क्षेत्र है। आप मनोरोग स्व-स्क्रीनिंग शुरू कर सकते हैं।",
        'mind-game': "वैकल्पिक मूल्यांकन खेल। डॉक्टरों को अपनी मानसिकता की रिपोर्ट करने के लिए इस इंटरैक्टिव गेम को खेलें।",
        'education': "नैदानिक शिक्षा क्षेत्र। शारीरिक प्रभावों और पुनरावृत्ति रोकथाम के बारे में जानने के लिए ये वीडियो देखें।",
        'booking-section': "वॉयस असिस्टेड बुकिंग। विशेषज्ञ के साथ अपॉइंटमेंट शेड्यूल करने के लिए यहां माइक्रोफ़ोन पर टैप करें।",
        'agent_welcome': "आपका जीवन आपका चुनाव में आपका स्वागत है। मैं आपकी क्या मदद कर सकती हूं?",
        'agent_book_q': "क्या आप अपॉइंटमेंट बुक करना चाहते हैं?",
        'agent_time_q': "कृपया अपॉइंटमेंट का समय और तारीख बताएं।",
        'agent_confirm': "धन्यवाद। आपका अपॉइंटमेंट सफलतापूर्वक बुक कर लिया गया है: ",
        'agent_processing': "एजेंट प्रोसेसिंग...",
        'agent_help_you': "मैं आज आपकी कैसे मदद कर सकती हूं?",
        'tap_to_speak': "बोलने के लिए टैप करें",
        'micro_active': "उन विचारों पर टैप करें जो अभी आपसे मेल खाते हैं।"
    },
    'kn': {
        'intro': "ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ. ನಾನು ನಿಮ್ಮ ವೈದ್ಯಕೀಯ ಸಹಾಯಕಿಯಾಗಿದ್ದೇನೆ ಮತ್ತು ಅಪ್ಲಿಕೇಶನ್‌ನ ಪ್ರತಿಯೊಂದು ಹಂತದಲ್ಲೂ ನಾನು ನಿಮಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತೇನೆ.",
        'features': "ನೀವು ಚಿಕಿತ್ಸಾ ಪ್ರೋಟೋಕಾಲ್‌ಗಳ ವಿಭಾಗವನ್ನು ವೀಕ್ಷಿಸುತ್ತಿದ್ದೀರಿ.",
        'rehabs': "ನೀವು ಪರಿಶೀಲಿಸಿದ ಚಿಕಿತ್ಸಾ ಸೌಲಭ್ಯಗಳನ್ನು ತಲುಪಿದ್ದೀರಿ. ಬೆಂಗಳೂರಿನಲ್ಲಿ ಆಡಿಟ್ ಮಾಡಲಾದ ಆಸ್ಪತ್ರೆಗಳನ್ನು ಇಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.",
        'tracker': "ಇದು ರೋಗಿಗಳ ಪೋರ್ಟಲ್ ಆಗಿದೆ. ನಿಮ್ಮ ದೈನಂದಿನ ದೈಹಿಕ ಲಾಗ್ ಅನ್ನು ಸಲ್ಲಿಸಲು ಬಟನ್ ಒತ್ತಿರಿ.",
        'relax': "ಇದು ವೈದ್ಯಕೀಯ ಸ್ವಯಂ ಮೌಲ್ಯಮಾಪನ ಪ್ರದೇಶವಾಗಿದೆ. ನೀವು ಮನೋವೈದ್ಯಕೀಯ ಸ್ವಯಂ ಸ್ಕ್ರಿನಿಂಗ್ ಅನ್ನು ಪ್ರಾರಂಭಿಸಬಹುದು.",
        'mind-game': "ಐಚ್ಛಿಕ ಮೌಲ್ಯಮಾಪನ ಆಟ. ವೈದ್ಯರಿಗೆ ನಿಮ್ಮ ಮನಸ್ಥಿತಿಯನ್ನು ವರದಿ ಮಾಡಲು ಈ ಸಂವಾದಾತ್ಮಕ ಆಟವನ್ನು ಆಡಿ.",
        'education': "ವೈದ್ಯಕೀಯ ಶಿಕ್ಷಣ ಪ್ರದೇಶ. ದೈಹಿಕ ಪರಿಣಾಮಗಳು ಮತ್ತು ಮರುಕಳಿಸುವ ತಡೆಗಟ್ಟುವಿಕೆಯ ಬಗ್ಗೆ ತಿಳಿಯಲು ಈ ವೀಡಿಯೊಗಳನ್ನು ವೀಕ್ಷಿಸಿ.",
        'booking-section': "ಧ್ವನಿ ಆಧಾರಿತ ಬುಕಿಂಗ್. ತಜ್ಞರೊಂದಿಗೆ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ನಿಗದಿಪಡಿಸಲು ಇಲ್ಲಿ ಮೈಕ್ರೊಫೋನ್ ಟ್ಯಾಪ್ ಮಾಡಿ.",
        'agent_welcome': "ಆಪ್ಕಾ ಜೀವನ್ ಆಪ್ಕಾ ಚುನಾವ್ ಗೆ ಸ್ವಾಗತ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
        'agent_book_q': "ನೀವು ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಲು ಬಯಸುವಿರಾ?",
        'agent_time_q': "ದಯವಿಟ್ಟು ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಸಮಯ ಮತ್ತು ದಿನಾಂಕವನ್ನು ತಿಳಿಸಿ.",
        'agent_confirm': "ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಯಶಸ್ವಿಯಾಗಿ ಬುಕ್ ಆಗಿದೆ: ",
        'agent_processing': "ಏಜೆಂಟ್ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ...",
        'agent_help_you': "ನಾನು ಇಂದು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
        'tap_to_speak': "ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
        'micro_active': "ಇದೀಗ ನಿಮ್ಮ ಮನಸ್ಥಿತಿಗೆ ಹೊಂದಿಕೆಯಾಗುವ ಆಲೋಚನೆಗಳನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ."
    },
    'te': {
        'intro': "వాయిస్ గైడెన్స్ యాక్టివేట్ చేయబడింది. నేను మీ క్లినికల్ అసిస్టెంట్‌ని, మరియు యాప్ యొక్క ప్రతి దశలో నేను మీకు మార్గనిర్దేశం చేస్తాను.",
        'features': "మీరు చికిత్స ప్రోటోకాల్‌ల విభాగాన్ని చూస్తున్నారు.",
        'rehabs': "మీరు ధృవీకరించబడిన చికిత్సా సౌకర్యాలను చేరుకున్నారు. బెంగళూరులో ఆడిట్ చేయబడిన ఆసుపత్రులను ఇక్కడ సమీక్షించండి.",
        'tracker': "ఇది పేషెంట్ పోర్టల్. మీ రోజువారీ శారీరక లాగ్‌ను సమర్పించడానికి బటన్‌ను నొక్కండి.",
        'relax': "ఇది క్లినికల్ సెల్ఫ్ ఎవాల్యూయేషన్ ప్రాంతం. మీరు సైకియాట్రిక్ సెల్ఫ్ స్క్రీనింగ్ ప్రారంభించవచ్చు.",
        'mind-game': "ఐచ్ఛిక మూల్యాంకన గేమ్. మీ మనస్తత్వాన్ని వైద్యులకు నివేదించడానికి ఈ ఇంటరాక్టివ్ గేమ్ ఆడండి.",
        'education': "క్లినికల్ ఎడ్యుకేషన్ ఏరియా. శారీరక ప్రభావాలు మరియు తిరిగి వ్యసనానికి గురికాకుండా ఉండటం గురించి తెలుసుకోవడానికి ఈ వీడియోలను చూడండి.",
        'booking-section': "వాయిస్ అసిస్టెడ్ బుకింగ్. నిపుణుడితో అపాయింట్‌మెంట్ షెడ్యూల్ చేయడానికి ఇక్కడ మైక్రోఫోన్‌ను నొక్కండి.",
        'agent_welcome': "ఆప్కా జీవన్ ఆప్కా చునావ్ కు స్వాగతం. నేను మీకు ఎలా సహాయపడగలను?",
        'agent_book_q': "మీరు అపాయింట్‌మెంట్ బుక్ చేయాలనుకుంటున్నారా?",
        'agent_time_q': "దయచేసి అపాయింట్‌మెంట్ సమయం మరియు తేదీని పేర్కొనండి.",
        'agent_confirm': "ధన్యవాదాలు. మీ అపాయింట్‌మెంట్ విజయవంతంగా బుక్ చేయబడింది: ",
        'agent_processing': "ఏజెంట్ ప్రాసెస్ చేస్తోంది...",
        'agent_help_you': "నేను ఈరోజు మీకు ఎలా సహాయపడగలను?",
        'tap_to_speak': "మాట్లాడటానికి నొక్కండి",
        'micro_active': "ప్రస్తుతం మీకు అనిపిస్తున్న ఆలోచనలపై నొక్కండి."
    },
    'ta': {
        'intro': "குரல் வழிகாட்டுதல் செயல்படுத்தப்பட்டது. நான் உங்கள் மருத்துவ உதவியாளர், மேலும் பயன்பாட்டின் ஒவ்வொரு அடியிலும் நான் உங்களுக்கு வழிகாட்டுவேன்.",
        'features': "நீங்கள் சிகிச்சை நெறிமுறைகள் பகுதியை பார்க்கிறீர்கள்.",
        'rehabs': "நீங்கள் சரிபார்க்கப்பட்ட சிகிச்சை வசதிகளை அடைந்துவிட்டீர்கள். பெங்களூரில் தணிக்கை செய்யப்பட்ட மருத்துவமனைகளை இங்கே மதிப்பாய்வு செய்யவும்.",
        'tracker': "இது நோயாளி போர்டல். உங்கள் தினசரி உடல் பதிவைச் சமர்ப்பிக்க பொத்தானை அழுத்தவும்.",
        'relax': "இது மருத்துவ சுய மதிப்பீட்டு பகுதி. நீங்கள் மனநல சுய பரிசோதனையைத் தொடங்கலாம்.",
        'mind-game': "விருப்ப மதிப்பீட்டு விளையாட்டு. உங்கள் மனநிலையை மருத்துவர்களுக்குப் புகாரளிக்க இந்த ஊடாடும் விளையாட்டை விளையாடுங்கள்.",
        'education': "மருத்துவ கல்வி பகுதி. உடல் பாதிப்புகள் மற்றும் மீண்டும் போதை பழக்கத்திற்கு ஆளாகாமல் தடுப்பது பற்றி அறிய இந்த வீடியோக்களைப் பாருங்கள்.",
        'booking-section': "குரல் வழி முன்பதிவு. ஒரு நிபுணருடன் சந்திப்பைத் திட்டமிட இங்கே மைக்ரோஃபோனைத் தட்டவும்.",
        'agent_welcome': "ஆப்கா ஜீவன் ஆப்கா சுனாவிற்கு உங்களை வரவேற்கிறோம். நான் உங்களுக்கு எப்படி உதவ முடியும்?",
        'agent_book_q': "நீங்கள் ஒரு சந்திப்பை முன்பதிவு செய்ய விரும்புகிறீர்களா?",
        'agent_time_q': "சந்திப்பின் நேரம் மற்றும் தேதியைக் குறிப்பிடவும்.",
        'agent_confirm': "நன்றி. உங்கள் சந்திப்பு வெற்றிகரமாக முன்பதிவு செய்யப்பட்டது: ",
        'agent_processing': "ஏஜென்ட் செயலாக்குகிறது...",
        'agent_help_you': "இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
        'tap_to_speak': "பேச தட்டவும்",
        'micro_active': "இப்போது நீங்கள் உணரும் எண்ணங்களைத் தட்டவும்."
    }
};

function getVoiceText(key) {
    // Get the current google translate selection
    const combo = document.querySelector('.goog-te-combo');
    let lang = 'en';
    if (combo && combo.value) {
        lang = combo.value;
    }
    
    // Fallback to English if translation not found
    const langSet = voiceTranslations[lang] || voiceTranslations['en'];
    currentVoiceLang = {
        'hi': 'hi-IN',
        'kn': 'kn-IN',
        'te': 'te-IN',
        'ta': 'ta-IN',
        'en': 'en-US'
    }[lang] || 'en-US';
    
    return langSet[key] || voiceTranslations['en'][key];
}

function speakAI(textOrKey, callback, isRawText = false) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        let textToSpeak = isRawText ? textOrKey : getVoiceText(textOrKey);
        
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = currentVoiceLang;
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
            speakAI("intro");
        }
    }, { once: true });

    // Section Scroll Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && guidanceActive) {
                const sectionId = entry.target.id;
                if (!spokenSections.has(sectionId)) {
                    spokenSections.add(sectionId);
                    
                    if (voiceTranslations['en'][sectionId]) {
                        speakAI(sectionId);
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
                if (title) speakAI(title.innerText, null, true); // Speak raw text for dynamic headers
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
    
    speakAI("micro_active");
    
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
                document.getElementById('booking-status-title').innerText = getVoiceText('agent_processing');
                const intro = getVoiceText('agent_welcome');
                document.getElementById('booking-status-text').innerText = intro;
                speakAI('agent_welcome', () => {
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
        
        document.getElementById('booking-status-title').innerText = getVoiceText('agent_processing');
        document.getElementById('booking-status-text').innerText = getVoiceText('agent_help_you') + " '" + transcript + "'";
        
        setTimeout(() => {
            if (bookingState === 1) {
                const nextQ = getVoiceText('agent_book_q');
                document.getElementById('booking-status-text').innerText = nextQ;
                speakAI('agent_book_q', () => {
                    bookingState = 2;
                    startListening();
                });
            } else if (bookingState === 2) {
                if (transcript.includes('yes') || transcript.includes('yeah') || transcript.includes('book') || transcript.includes('sure') || 
                    transcript.includes('हाँ') || transcript.includes('ಹೌದು') || transcript.includes('అవును') || transcript.includes('ஆம்')) {
                    const nextQ = getVoiceText('agent_time_q');
                    document.getElementById('booking-status-text').innerText = nextQ;
                    speakAI('agent_time_q', () => {
                        bookingState = 3;
                        startListening();
                    });
                } else {
                    speakAI("Understood. Let me know if you need anything else.", () => {
                        bookingState = 0;
                        document.getElementById('booking-status-title').innerText = getVoiceText('tap_to_speak');
                    }, true);
                }
            } else if (bookingState === 3) {
                document.getElementById('booking-status-title').innerText = "Appointment Found";
                document.getElementById('booking-status-text').innerText = getVoiceText('agent_confirm') + transcript;
                
                const detailsBox = document.getElementById('booking-confirmation-details');
                document.getElementById('booking-ticket').innerText = "Date/Time: " + transcript + "\nStatus: Confirmed & Booked";
                detailsBox.style.display = 'block';
                
                speakAI('agent_confirm', () => {
                    bookingState = 0;
                });
            }
        }, 1500);
    };

    recognition.onerror = () => {
        stopListening();
        document.getElementById('booking-status-title').innerText = getVoiceText('tap_to_speak');
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
