document.addEventListener('DOMContentLoaded', function() {
    // Initialize skill bars animation
    initSkillBars();
    
    // Toggle between personas
    initPersonaToggle();
    
    // Easter egg functionality
    initEasterEgg();
});

// Animate skill bars on scroll
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Set up GSAP ScrollTrigger for each skill bar
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        
        gsap.to(bar, {
            width: percent + '%',
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// Toggle between Data Analyst and Technical Writer personas
function initPersonaToggle() {
    const toggleButtons = document.querySelectorAll('.persona-toggle button');
    const analystRole = document.querySelector('.analyst-role');
    const writerRole = document.querySelector('.writer-role');
    const analystSkills = document.querySelector('.analyst-skills');
    const writerSkills = document.querySelector('.writer-skills');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const persona = this.getAttribute('data-persona');
            
            if (persona === 'analyst') {
                analystRole.style.display = 'block';
                writerRole.style.display = 'none';
                analystSkills.style.display = 'block';
                writerSkills.style.display = 'none';
            } else if (persona === 'writer') {
                analystRole.style.display = 'none';
                writerRole.style.display = 'block';
                analystSkills.style.display = 'none';
                writerSkills.style.display = 'block';
                
                // Re-trigger skill bar animations for writer skills
                const writerBars = writerSkills.querySelectorAll('.skill-progress');
                writerBars.forEach(bar => {
                    const percent = bar.getAttribute('data-percent');
                    gsap.to(bar, {
                        width: percent + '%',
                        duration: 1.5,
                        ease: 'power2.out'
                    });
                });
            }
        });
    });
}

// Easter egg functionality
function initEasterEgg() {
    const profileImage = document.getElementById('profileImage');
    const easterEgg = document.getElementById('easterEgg');
    const closeButton = document.getElementById('closeEasterEgg');
    
    // Double-click to show easter egg
    profileImage.addEventListener('dblclick', function() {
        easterEgg.classList.add('active');
    });
    
    // Close easter egg
    closeButton.addEventListener('click', function() {
        easterEgg.classList.remove('active');
    });
    
    // Also close when clicking outside
    easterEgg.addEventListener('click', function(e) {
        if (e.target === easterEgg) {
            easterEgg.classList.remove('active');
        }
    });
}
// Add to script.js
function initTypingEffect() {
    const title = document.querySelector('.title');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Call this function in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    initTypingEffect();
});
function initParticles() {
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#1a3a6e" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#1a3a6e",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        }
    });
}

// Call in your DOMContentLoaded
// Initialize dark mode toggle
function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Toggle dark mode on click
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update icon and text
        const icon = themeToggle.querySelector('i');
        const text = themeToggle.querySelector('span');
        
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            text.textContent = 'Light Mode';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            text.textContent = 'Dark Mode';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        const text = themeToggle.querySelector('span');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        text.textContent = 'Light Mode';
    }
}

// Add this to your existing DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initializations
    initSkillBars();
    initPersonaToggle();
    initEasterEgg();
    
    // Add dark mode initialization
    initDarkMode();
});
// Navigation functionality
function initNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Toggle navigation
    burger.addEventListener('click', () => {
        // Toggle nav
        nav.classList.toggle('nav-active');
        
        // Toggle burger animation
        burger.classList.toggle('toggle');
        
        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(li => {
        const link = li.querySelector('a');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Scroll effect for navigation
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.main-nav');
        if (window.scrollY > 100) {
            nav.style.background = document.body.classList.contains('dark-mode') 
                ? 'rgba(30, 30, 30, 0.98)' 
                : 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = document.body.classList.contains('dark-mode') 
                ? 'rgba(30, 30, 30, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Add to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initializations
    initSkillBars();
    initPersonaToggle();
    initEasterEgg();
    initDarkMode();
    
    // Add navigation initialization
    initNavigation();
});
// Initialize dark mode toggle
function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Toggle dark mode on click
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'enabled');
            
            // Update navigation background for dark mode
            const nav = document.querySelector('.main-nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(30, 30, 30, 0.98)';
            } else {
                nav.style.background = 'rgba(30, 30, 30, 0.95)';
            }
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'disabled');
            
            // Update navigation background for light mode
            const nav = document.querySelector('.main-nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
    });
    
    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        
        // Update navigation background for dark mode
        const nav = document.querySelector('.main-nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(30, 30, 30, 0.98)';
        } else {
            nav.style.background = 'rgba(30, 30, 30, 0.95)';
        }
    }
}
// Scroll effect for navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 100) {
        nav.style.background = document.body.classList.contains('dark-mode') 
            ? 'rgba(30, 30, 30, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = document.body.classList.contains('dark-mode') 
            ? 'rgba(30, 30, 30, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});
