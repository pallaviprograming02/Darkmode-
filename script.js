// ============================================
// THEME MANAGEMENT
// ============================================

const themes = ['light', 'dark', 'blue', 'purple'];
let currentTheme = 'light';
let autoModeEnabled = false;

// Initialize theme on page load
function initTheme() {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    const savedAutoMode = localStorage.getItem('autoMode');

    if (savedTheme && themes.includes(savedTheme)) {
        currentTheme = savedTheme;
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = 'dark';
        }
    }

    if (savedAutoMode === 'true') {
        autoModeEnabled = true;
        checkAutoMode();
    }

    applyTheme(currentTheme);
    updateCurrentTime();
    detectSystemPreference();

    // Update time every minute
    setInterval(updateCurrentTime, 60000);

    // Check auto mode every minute
    setInterval(checkAutoMode, 60000);
}

// Apply theme to document
function applyTheme(theme) {
    // Fade out effect
    document.body.classList.add('fade-out');

    setTimeout(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        currentTheme = theme;

        // Save to localStorage
        localStorage.setItem('theme', theme);

        // Update UI
        updateThemeUI();

        // Fade in effect
        document.body.classList.remove('fade-out');
        document.body.classList.add('fade-in');

        setTimeout(() => {
            document.body.classList.remove('fade-in');
        }, 300);
    }, 150);
}

// Update all UI elements to reflect current theme
function updateThemeUI() {
    // Update theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-theme') === currentTheme);
    });

    // Update sliding toggle
    const slidingToggle = document.getElementById('slidingToggle');
    const iconToggle = document.getElementById('iconToggle');
    const progressToggle = document.querySelector('.progress-toggle');

    const isDark = currentTheme === 'dark' || currentTheme === 'blue' || currentTheme === 'purple';

    if (slidingToggle) {
        slidingToggle.classList.toggle('active', isDark);
        slidingToggle.querySelector('.icon').textContent = isDark ? '🌙' : '☀️';
    }

    if (iconToggle) {
        iconToggle.classList.toggle('dark', isDark);
    }

    if (progressToggle) {
        progressToggle.classList.toggle('active', isDark);
        document.getElementById('progressText').textContent = isDark ? 'ON' : 'OFF';
    }

    // Update current theme display
    document.getElementById('currentTheme').textContent = currentTheme;
}

// Set theme from theme buttons
function setTheme(theme) {
    if (themes.includes(theme)) {
        applyTheme(theme);
        // Disable auto mode when manually selecting
        autoModeEnabled = false;
        localStorage.setItem('autoMode', 'false');
        updateAutoModeUI();
    }
}

// Toggle sliding switch
function toggleSliding() {
    const isDark = currentTheme === 'dark' || currentTheme === 'blue' || currentTheme === 'purple';
    applyTheme(isDark ? 'light' : 'dark');
    autoModeEnabled = false;
    localStorage.setItem('autoMode', 'false');
    updateAutoModeUI();
}

// Toggle icon button
function toggleIcon() {
    const isDark = currentTheme === 'dark' || currentTheme === 'blue' || currentTheme === 'purple';
    applyTheme(isDark ? 'light' : 'dark');
    autoModeEnabled = false;
    localStorage.setItem('autoMode', 'false');
    updateAutoModeUI();
}

// Toggle progress bar
function toggleProgress() {
    const isDark = currentTheme === 'dark' || currentTheme === 'blue' || currentTheme === 'purple';
    applyTheme(isDark ? 'light' : 'dark');
    autoModeEnabled = false;
    localStorage.setItem('autoMode', 'false');
    updateAutoModeUI();
}

// ============================================
// AUTO TIME-BASED DARK MODE
// ============================================

function checkAutoMode() {
    if (!autoModeEnabled) return;

    const hour = new Date().getHours();
    const shouldDark = hour >= 18 || hour < 6; // 6 PM to 6 AM
    const targetTheme = shouldDark ? 'dark' : 'light';

    if (currentTheme !== targetTheme) {
        applyTheme(targetTheme);
    }
}

function toggleAutoMode() {
    autoModeEnabled = document.getElementById('autoModeCheckbox').checked;
    localStorage.setItem('autoMode', autoModeEnabled);
    updateAutoModeUI();

    if (autoModeEnabled) {
        checkAutoMode();
    }
}

function updateAutoModeUI() {
    const indicator = document.getElementById('autoModeIndicator');
    const dot = document.getElementById('autoStatusDot');
    const text = document.getElementById('autoModeText');
    const checkbox = document.getElementById('autoModeCheckbox');

    if (checkbox) checkbox.checked = autoModeEnabled;

    if (autoModeEnabled) {
        indicator.classList.add('active');
        dot.classList.add('active');
        text.textContent = 'Auto mode: On (6 PM - 6 AM)';
    } else {
        indicator.classList.remove('active');
        dot.classList.remove('active');
        text.textContent = 'Auto mode: Off';
    }
}

function updateCurrentTime() {
    const now = new Date();
    document.getElementById('currentTime').textContent = now.toLocaleTimeString();
}

// ============================================
// KEYBOARD SHORTCUT
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'd' || e.key === 'D') {
        // Don't trigger if typing in input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        const isDark = currentTheme === 'dark' || currentTheme === 'blue' || currentTheme === 'purple';
        applyTheme(isDark ? 'light' : 'dark');
    }
});

// ============================================
// SECTION-WISE DARK MODE
// ============================================

function toggleSectionDark() {
    const section = document.getElementById('sectionDemo');
    section.classList.toggle('dark-section');
}

// ============================================
// RIPPLE EFFECT
// ============================================

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// ============================================
// SYSTEM THEME DETECTION
// ============================================

function detectSystemPreference() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemPref = mediaQuery.matches ? 'Dark' : 'Light';
    document.getElementById('systemPref').textContent = systemPref;

    // Listen for changes
    mediaQuery.addEventListener('change', (e) => {
        document.getElementById('systemPref').textContent = e.matches ? 'Dark' : 'Light';
    });
}

function syncWithSystem() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    applyTheme(mediaQuery.matches ? 'dark' : 'light');
    autoModeEnabled = false;
    localStorage.setItem('autoMode', 'false');
    updateAutoModeUI();
}

// ============================================
// INITIALIZE
// ============================================

// Run on page load
initTheme();

// Add ripple effect to all toggle buttons
document.querySelectorAll('.theme-btn, .toggle-switch, .icon-toggle, .progress-toggle').forEach(el => {
    el.addEventListener('click', function(e) {
        // Optional: Add ripple to other elements if desired
    });
});