// main.js - Main JavaScript for NotesHub

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('NotesHub initialized');
    
    // Check if user is logged in
    checkLoginStatus();
    
    // Set current year in footer
    setCurrentYear();
    
    // Initialize tooltips
    initTooltips();
});

// Check login status
function checkLoginStatus() {
    const user = localStorage.getItem('notesHubUser');
    if (user) {
        // Update header with user info
        const userElements = document.querySelectorAll('.user-name, .user-info');
        userElements.forEach(el => {
            if (el.classList.contains('user-name')) {
                el.textContent = JSON.parse(user).name;
            }
        });
    }
}

// Set current year in footer
function setCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[title]');
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = this.title;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 10000;
        pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.top = (rect.top - 30) + 'px';
    tooltip.style.left = (rect.left + rect.width/2 - tooltip.offsetWidth/2) + 'px';
    
    this.tooltipElement = tooltip;
}

function hideTooltip() {
    if (this.tooltipElement) {
        this.tooltipElement.remove();
        this.tooltipElement = null;
    }
}

// Notes functions
function downloadNote(noteId, noteTitle) {
    // Simulate download
    console.log(`Downloading note: ${noteTitle}`);
    alert(`Download started: ${noteTitle}`);
    
    // Increment download count in UI
    const downloadBtn = event.target.closest('.btn-download');
    if (downloadBtn) {
        const currentText = downloadBtn.textContent;
        const match = currentText.match(/\((\d+)\)/);
        if (match) {
            const count = parseInt(match[1]) + 1;
            downloadBtn.innerHTML = `<i class="fas fa-download"></i> Download (${count})`;
        }
    }
    
    // Save download in localStorage
    const downloads = JSON.parse(localStorage.getItem('noteDownloads') || '[]');
    downloads.push({
        id: noteId,
        title: noteTitle,
        date: new Date().toISOString()
    });
    localStorage.setItem('noteDownloads', JSON.stringify(downloads));
}

function previewNote(noteTitle, noteDescription) {
    alert(`Preview: ${noteTitle}\n\n${noteDescription}`);
}

// Search function
function searchNotes() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase();
    if (query.length < 2) return;
    
    console.log(`Searching for: ${query}`);
    // In real app, this would filter notes
}

// Filter notes by category
function filterNotes(category) {
    console.log(`Filtering by: ${category}`);
    
    // Update active filter button
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(category) || btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    // In real app, this would filter the notes
}

// Upload functions
function validateUploadForm() {
    const title = document.getElementById('noteTitle')?.value;
    const subject = document.getElementById('noteSubject')?.value;
    const file = document.getElementById('fileInput')?.files[0];
    
    if (!title || !subject || !file) {
        alert('Please fill all fields and select a file');
        return false;
    }
    
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
        alert('Please upload only PDF or Word documents');
        return false;
    }
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return false;
    }
    
    return true;
}

function uploadNote() {
    if (!validateUploadForm()) return;
    
    const title = document.getElementById('noteTitle').value;
    
    // Show loading
    const uploadBtn = document.querySelector('.upload-btn');
    const originalText = uploadBtn.innerHTML;
    uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
    uploadBtn.disabled = true;
    
    // Simulate upload
    setTimeout(() => {
        alert(`Note "${title}" uploaded successfully!`);
        
        // Reset form
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteSubject').value = 'Select Subject';
        document.getElementById('fileInput').value = '';
        
        // Reset button
        uploadBtn.innerHTML = originalText;
        uploadBtn.disabled = false;
    }, 2000);
}

// Login/Signup functions
function login() {
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    
    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }
    
    // Simple validation
    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    // Save user in localStorage (demo only)
    const user = {
        email: email,
        name: email.split('@')[0],
        loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('notesHubUser', JSON.stringify(user));
    
    alert('Login successful!');
    window.location.href = 'index.html';
}

function signup() {
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    
    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }
    
    // Simple validation
    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    // Check if user already exists
    const existingUser = localStorage.getItem('notesHubUser');
    if (existingUser) {
        if (JSON.parse(existingUser).email === email) {
            alert('User already exists. Please login.');
            return;
        }
    }
    
    // Save new user
    const user = {
        email: email,
        name: email.split('@')[0],
        signupTime: new Date().toISOString()
    };
    
    localStorage.setItem('notesHubUser', JSON.stringify(user));
    
    alert('Account created successfully! Please login.');
    window.location.href = 'login.html';
}

// Logout function
function logout() {
    localStorage.removeItem('notesHubUser');
    alert('Logged out successfully');
    window.location.href = 'index.html';
}

// Make functions available globally
window.downloadNote = downloadNote;
window.previewNote = previewNote;
window.searchNotes = searchNotes;
window.filterNotes = filterNotes;
window.validateUploadForm = validateUploadForm;
window.uploadNote = uploadNote;
window.login = login;
window.signup = signup;
window.logout = logout;