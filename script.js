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
    
    let storageInfo = '<h3>Інформація з localStorage:</h3><div class="storage-data">';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try {
            const value = JSON.parse(localStorage.getItem(key));
            storageInfo += `<details>
                <summary>${key}</summary>
                <div class="storage-value">${JSON.stringify(value, null, 2)}</div>
            </details>`;
        } catch (e) {
            storageInfo += `<p><strong>${key}:</strong> ${localStorage.getItem(key)}</p>`;
        }
    }
    storageInfo += '</div>';
    
    footer.innerHTML = storageInfo;
}

async function fetchComments() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/20/comments');
        if (!response.ok) {
            throw new Error('Помилка завантаження коментарів');
        }
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
        
        commentsSection.innerHTML = commentsHTML || '<p>Коментарі не знайдено</p>';
    } catch (error) {
        console.error('Error fetching comments:', error);
        const commentsSection = document.getElementById('comments-section');
        if (commentsSection) {
            commentsSection.innerHTML = '<p>Помилка завантаження коментарів</p>';
        }
    }
}

function showCommentsModal() {
    const modal = document.getElementById('comments-modal');
    if (modal) {
        modal.style.display = 'block';
        fetchComments(); // Завантажувати коментарі при відкритті модального вікна
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
    const body = document.body;
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        localStorage.setItem('theme', 'light');
    }
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.checked = body.classList.contains('dark');
    }
}

function setThemeByTime() {
    const currentHour = new Date().getHours();
    const isDayTime = currentHour >= 7 && currentHour < 21;
    
    const body = document.body;
    if (isDayTime) {
        body.classList.add('light');
        body.classList.remove('dark');
    } else {
        body.classList.add('dark');
        body.classList.remove('light');
    }
    
    localStorage.setItem('theme', isDayTime ? 'light' : 'dark');
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.checked = !isDayTime;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Додаємо футер, якщо його немає
    if (!document.getElementById('footer')) {
        const footer = document.createElement('footer');
        footer.id = 'footer';
        footer.className = 'footer';
        document.body.appendChild(footer);
    }

    // Ставимо базовий клас для теми
    document.body.classList.add('light');

    // Встановлюємо порядок виконання важливих функцій
    setThemeByTime();
    storeSystemInfo();
    
    // Встановлюємо таймер для відображення форми зворотнього зв'язку
    setInterval(showFeedbackModal, 10000); // 1 хвилина

    // Додаємо обробники подій
    const showCommentsBtn = document.getElementById('show-comments-btn');
    if (showCommentsBtn) {
        showCommentsBtn.addEventListener('click', showCommentsModal);
    }
    
    window.addEventListener('click', function(event) {
        const commentsModal = document.getElementById('comments-modal');
        if (event.target === commentsModal) {
            closeCommentsModal();
        }

        const feedbackModal = document.getElementById('feedback-modal');
        if (event.target === feedbackModal) {
            closeFeedbackModal();
        }
    });
});