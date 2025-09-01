// PART 1: EVENT HANDLING AND THEME TOGGLE
/**
 * Theme Toggle Functionality
 * Demonstrates event handling and DOM manipulation
 */
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.themeText = document.getElementById('themeText');
        this.currentTheme = 'light';
        
        this.init();
    }

    init() {
        // Load saved theme preference from memory (simulating localStorage)
        this.themePreference = 'light'; 
        this.setTheme(this.themePreference);
        
        // Add click event listener
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Add keyboard support for accessibility
        this.themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        if (theme === 'dark') {
            this.themeIcon.textContent = '☀️';
            this.themeText.textContent = 'Light Mode';
        } else {
            this.themeIcon.textContent = '🌙';
            this.themeText.textContent = 'Dark Mode';
        }
        
        // Save preference in memory (simulating localStorage)
        this.themePreference = theme;
        console.log(`Theme changed to: ${theme}`);
    }
}


// PART 2: INTERACTIVE ELEMENTS
/**
 * Interactive Counter Game
 * Demonstrates event handling and dynamic content updates
 */
class CounterGame {
    constructor() {
        this.counter = 0;
        this.display = document.getElementById('counterDisplay');
        this.message = document.getElementById('counterMessage');
        this.history = [];
        
        this.init();
    }

    init() {
        // Button event listeners
        document.getElementById('incrementBtn').addEventListener('click', () => {
            this.increment();
        });

        document.getElementById('decrementBtn').addEventListener('click', () => {
            this.decrement();
        });

        document.getElementById('multiplyBtn').addEventListener('click', () => {
            this.multiply();
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.reset();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                switch(e.key) {
                    case 'ArrowUp':
                    case '+':
                        e.preventDefault();
                        this.increment();
                        break;
                    case 'ArrowDown':
                    case '-':
                        e.preventDefault();
                        this.decrement();
                        break;
                    case '*':
                        e.preventDefault();
                        this.multiply();
                        break;
                    case 'r':
                    case 'R':
                        if (e.ctrlKey) {
                            e.preventDefault();
                            this.reset();
                        }
                        break;
                }
            }
        });
    }

    increment() {
        this.counter++;
        this.updateDisplay();
        this.showMessage(`+1! Current: ${this.counter}`, 'success');
        this.addPulseEffect();
    }

    decrement() {
        this.counter--;
        this.updateDisplay();
        this.showMessage(`-1! Current: ${this.counter}`, 'info');
        this.addPulseEffect();
    }

    multiply() {
        const oldValue = this.counter;
        this.counter *= 2;
        this.updateDisplay();
        this.showMessage(`Doubled from ${oldValue} to ${this.counter}!`, 'success');
        this.addPulseEffect();
    }

    reset() {
        const oldValue = this.counter;
        this.counter = 0;
        this.updateDisplay();
        this.showMessage(`Reset from ${oldValue} to 0`, 'warning');
        this.addPulseEffect();
    }

    updateDisplay() {
        this.display.textContent = this.counter;
        
        // Add color coding based on value
        this.display.style.color = this.counter > 0 ? 'var(--success)' : 
                                  this.counter < 0 ? 'var(--error)' : 'var(--accent)';
    }

    showMessage(text, type) {
        this.message.textContent = text;
        this.message.style.color = type === 'success' ? 'var(--success)' : 
                                  type === 'warning' ? 'var(--warning)' : 'var(--accent)';
        
        // Clear message after 3 seconds
        setTimeout(() => {
            this.message.textContent = '';
        }, 3000);
    }

    addPulseEffect() {
        this.display.classList.add('pulse');
        setTimeout(() => {
            this.display.classList.remove('pulse');
        }, 500);
    }
}

/**
 * FAQ Accordion Component
 * Demonstrates event delegation and smooth animations
 */
class FAQAccordion {
    constructor() {
        this.faqContainer = document.querySelector('.faq-section');
        this.init();
    }

    init() {
        // Use event delegation for better performance
        this.faqContainer.addEventListener('click', (e) => {
            const question = e.target.closest('.faq-question');
            if (question) {
                this.toggleFAQ(question);
            }
        });

        // Keyboard accessibility
        this.faqContainer.addEventListener('keydown', (e) => {
            const question = e.target.closest('.faq-question');
            if (question && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                this.toggleFAQ(question);
            }
        });

        // Make FAQ questions focusable
        document.querySelectorAll('.faq-question').forEach(question => {
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
        });
    }

    toggleFAQ(questionElement) {
        const faqItem = questionElement.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const arrow = questionElement.querySelector('.faq-arrow');
        const isOpen = answer.classList.contains('show');

        // Close other open FAQs (optional - remove for multiple open)
        document.querySelectorAll('.faq-answer.show').forEach(openAnswer => {
            if (openAnswer !== answer) {
                openAnswer.classList.remove('show');
                openAnswer.parentElement.querySelector('.faq-arrow').classList.remove('rotate');
                openAnswer.parentElement.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle current FAQ
        if (isOpen) {
            answer.classList.remove('show');
            arrow.classList.remove('rotate');
            questionElement.setAttribute('aria-expanded', 'false');
        } else {
            answer.classList.add('show');
            arrow.classList.add('rotate');
            questionElement.setAttribute('aria-expanded', 'true');
        }
    }
}

/**
 * Tabbed Interface Component
 * Demonstrates dynamic content switching
 */
class TabbedInterface {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabPanes = document.querySelectorAll('.tab-pane');
        this.init();
    }

    init() {
        // Add click event listeners to tab buttons
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                this.switchTab(tabId);
            });

            // Keyboard navigation
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const tabId = button.getAttribute('data-tab');
                    this.switchTab(tabId);
                }
            });
        });

        // Arrow key navigation
        const tabContainer = document.querySelector('.tab-buttons');
        tabContainer.addEventListener('keydown', (e) => {
            const currentTab = document.querySelector('.tab-btn:focus');
            if (!currentTab) return;

            let nextTab = null;
            if (e.key === 'ArrowRight') {
                nextTab = currentTab.nextElementSibling;
                if (!nextTab) nextTab = this.tabButtons[0];
            } else if (e.key === 'ArrowLeft') {
                nextTab = currentTab.previousElementSibling;
                if (!nextTab) nextTab = this.tabButtons[this.tabButtons.length - 1];
            }

            if (nextTab) {
                e.preventDefault();
                nextTab.focus();
                const tabId = nextTab.getAttribute('data-tab');
                this.switchTab(tabId);
            }
        });
    }

    switchTab(targetTabId) {
        // Remove active class from all buttons and panes
        this.tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        
        this.tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });

        // Add active class to target elements
        const targetButton = document.querySelector(`[data-tab="${targetTabId}"]`);
        const targetPane = document.getElementById(targetTabId);

        if (targetButton && targetPane) {
            targetButton.classList.add('active');
            targetButton.setAttribute('aria-selected', 'true');
            targetPane.classList.add('active');
        }
    }
}


// PART 3: INITIALIZATION
// Initialize components after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new CounterGame();
    new FAQAccordion();
    new TabbedInterface();
});
