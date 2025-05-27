
function storeSystemInfo() {
    const systemInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookiesEnabled: navigator.cookieEnabled,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        timeStamp: new Date().toString()
    };
    
    localStorage.setItem('systemInfo', JSON.stringify(systemInfo));
    displayLocalStorageInfo();
}

function displayLocalStorageInfo() {
    const footer = document.getElementById('footer');
    if (!footer) return;
    
    let storageInfo = '';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try {
            const value = JSON.parse(localStorage.getItem(key));
            storageInfo += `<details>
                <summary>${key}</summary>
                <pre>${JSON.stringify(value, null, 2)}</pre>
            </details>`;
        } catch (e) {
            storageInfo += `<p><strong>${key}:</strong> ${localStorage.getItem(key)}</p>`;
        }
    }
    
    footer.innerHTML = storageInfo;
}

async function fetchComments() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/20/comments');
        const comments = await response.json();
        
        const commentsSection = document.getElementById('comments-section');
        if (!commentsSection) return;
        
        let commentsHTML = '';
        comments.forEach(comment => {
            commentsHTML += `
                <div class="comment">
                    <h3>${comment.name}</h3>
                    <p><em>${comment.email}</em></p>
                    <p>${comment.body}</p>
                </div>
            `;
        });
        
        commentsSection.innerHTML = commentsHTML;
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

function showCommentsModal() {
    const modal = document.getElementById('comments-modal');
    if (modal) {
        modal.style.display = 'block';
        
        const commentsSection = document.getElementById('comments-section');
        if (!commentsSection.innerHTML.trim()) {
            fetchComments();
        }
    }
}

function closeCommentsModal() {
    const modal = document.getElementById('comments-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function showFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.checked = newTheme === 'dark';
    }
}

function setThemeByTime() {
    const currentHour = new Date().getHours();
    const isDayTime = currentHour >= 7 && currentHour < 21;
    
    document.body.className = isDayTime ? 'light' : 'dark';
    localStorage.setItem('theme', isDayTime ? 'light' : 'dark');
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.checked = !isDayTime;
    }
}

document.addEventListener('DOMContentLoaded', function() {

    if (!document.getElementById('footer')) {
        const footer = document.createElement('footer');
        footer.id = 'footer';
        footer.className = 'footer';
        document.body.appendChild(footer);
    }

    storeSystemInfo();
    
    fetchComments();
    
    setThemeByTime();
    
    setTimeout(showFeedbackModal, 10000);

    const showCommentsBtn = document.getElementById('show-comments-btn');
    if (showCommentsBtn) {
        showCommentsBtn.addEventListener('click', showCommentsModal);
    }
    
    window.addEventListener('click', function(event) {
        const commentsModal = document.getElementById('comments-modal');
        if (event.target === commentsModal) {
            closeCommentsModal();
        }
    });

    window.addEventListener('click', function(event) {
        const modal = document.getElementById('feedback-modal');
        if (event.target === modal) {
            closeFeedbackModal();
        }
    });
});