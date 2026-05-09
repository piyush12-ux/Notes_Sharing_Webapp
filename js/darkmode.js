// Dark Mode Function - 100% Working
function toggleDark() {
    console.log('Dark mode button clicked!');
    
    const body = document.body;
    const isDark = body.classList.toggle('dark-mode');
    
    // Save to localStorage
    localStorage.setItem('darkMode', isDark);
    console.log('Dark Mode saved:', isDark);
    
    // Update button
    const darkBtn = document.querySelector('.dark-mode-toggle');
    if (darkBtn) {
        const icon = darkBtn.querySelector('i');
        const text = darkBtn.querySelector('span');
        
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            console.log('Icon updated');
        }
        
        if (text) {
            text.textContent = isDark ? 'Light Mode' : 'Dark Mode';
            console.log('Text updated');
        }
    }
    
    // Show alert for testing
    alert(isDark ? '🌙 Dark Mode ON' : '☀️ Light Mode ON');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, checking dark mode...');
    
    // Check saved preference
    const savedMode = localStorage.getItem('darkMode');
    console.log('Saved mode from storage:', savedMode);
    
    if (savedMode === 'true') {
        document.body.classList.add('dark-mode');
        console.log('Applied dark mode from storage');
        
        // Update button
        const darkBtn = document.querySelector('.dark-mode-toggle');
        if (darkBtn) {
            const icon = darkBtn.querySelector('i');
            const text = darkBtn.querySelector('span');
            
            if (icon) {
                icon.className = 'fas fa-sun';
            }
            
            if (text) {
                text.textContent = 'Light Mode';
            }
        }
    }
    
    // Make sure function is available globally
    window.toggleDark = toggleDark;
    console.log('toggleDark function is ready!');
    
    // Test: Log all dark mode buttons
    const darkBtns = document.querySelectorAll('.dark-mode-toggle');
    console.log('Found dark mode buttons:', darkBtns.length);
});