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

    if (!document.getElementById('footer')) {
        const footer = document.createElement('footer');
        footer.id = 'footer';
        footer.className = 'footer';
        document.body.appendChild(footer);
    }

    document.body.classList.add('light');

    setThemeByTime();
    storeSystemInfo();
    
});