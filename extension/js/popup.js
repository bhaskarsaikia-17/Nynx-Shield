// Nynx Shield - Popup Script
// Cross-browser compatible

const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const powerToggle = document.getElementById('powerToggle');
    const shieldCard = document.getElementById('shieldCard');
    const shieldStatus = document.getElementById('shieldStatus');
    const currentDomain = document.getElementById('currentDomain');
    const domainName = document.getElementById('domainName');
    const blockedToday = document.getElementById('blockedToday');
    const totalBlocked = document.getElementById('totalBlocked');

    let currentHost = null;

    // Initialize
    initializePopup();

    // Power toggle - adds/removes from allowlist
    powerToggle.addEventListener('click', () => {
        if (!currentHost) return;

        const isNowActive = powerToggle.classList.toggle('active');

        if (isNowActive) {
            browserAPI.runtime.sendMessage({
                action: 'removeFromAllowlist',
                domain: currentHost
            });
            shieldCard.classList.remove('inactive');
            shieldStatus.textContent = 'SHIELD ACTIVE';
        } else {
            browserAPI.runtime.sendMessage({
                action: 'addToAllowlist',
                domain: currentHost
            });
            shieldCard.classList.add('inactive');
            shieldStatus.textContent = 'SHIELD PAUSED';
        }
    });

    // Quick actions
    document.getElementById('refreshBtn').addEventListener('click', () => {
        browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) browserAPI.tabs.reload(tabs[0].id);
            window.close();
        });
    });

    document.getElementById('filterBtn').addEventListener('click', () => {
        browserAPI.tabs.create({ url: browserAPI.runtime.getURL('options.html#filters') });
    });

    document.getElementById('reportBtn').addEventListener('click', () => {
        browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const url = tabs[0]?.url || '';
            browserAPI.tabs.create({
                url: `https://github.com/nynx-shield/report?url=${encodeURIComponent(url)}`
            });
        });
    });

    document.getElementById('scanBtn').addEventListener('click', () => {
        browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                try {
                    const hostname = new URL(tabs[0].url).hostname;
                    browserAPI.tabs.create({
                        url: `https://www.virustotal.com/gui/domain/${hostname}`
                    });
                } catch (e) {
                    console.log('Invalid URL');
                }
            }
        });
    });

    document.getElementById('settingsBtn').addEventListener('click', () => {
        browserAPI.tabs.create({ url: browserAPI.runtime.getURL('options.html') });
    });

    // Functions
    function initializePopup() {
        browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.url) {
                const tabUrl = tabs[0].url;
                const specialPage = getSpecialPageName(tabUrl);

                if (specialPage) {
                    currentDomain.textContent = specialPage;
                    domainName.textContent = 'N/A';
                    powerToggle.style.opacity = '0.5';
                    powerToggle.style.pointerEvents = 'none';
                    shieldStatus.textContent = 'NOT APPLICABLE';
                    loadStats();
                    return;
                }

                try {
                    const url = new URL(tabUrl);
                    currentHost = url.hostname.replace('www.', '');
                    currentDomain.textContent = `Protecting ${currentHost}`;
                    domainName.textContent = currentHost;

                    browserAPI.runtime.sendMessage(
                        { action: 'checkAllowlist', domain: currentHost },
                        (response) => {
                            if (response?.isAllowed) {
                                powerToggle.classList.remove('active');
                                shieldCard.classList.add('inactive');
                                shieldStatus.textContent = 'SHIELD PAUSED';
                            } else {
                                powerToggle.classList.add('active');
                                shieldCard.classList.remove('inactive');
                                shieldStatus.textContent = 'SHIELD ACTIVE';
                            }
                        }
                    );
                } catch {
                    currentDomain.textContent = 'System Page';
                    domainName.textContent = 'N/A';
                    powerToggle.style.opacity = '0.5';
                    powerToggle.style.pointerEvents = 'none';
                }
            }
        });

        loadStats();
    }

    function getSpecialPageName(url) {
        if (url.startsWith('chrome-extension://')) return 'Extension Page';
        if (url.startsWith('moz-extension://')) return 'Extension Page';
        if (url.startsWith('extension://')) return 'Extension Page';
        if (url.startsWith('chrome://newtab')) return 'New Tab';
        if (url.startsWith('edge://newtab')) return 'New Tab';
        if (url.startsWith('about:newtab')) return 'New Tab';
        if (url.startsWith('chrome://extensions')) return 'Extensions Page';
        if (url.startsWith('edge://extensions')) return 'Extensions Page';
        if (url.startsWith('about:addons')) return 'Extensions Page';
        if (url.startsWith('chrome://')) return 'Browser Page';
        if (url.startsWith('edge://')) return 'Browser Page';
        if (url.startsWith('about:')) return 'Browser Page';
        if (url.startsWith('file://')) return 'Local File';
        if (url === 'about:blank') return 'Blank Page';
        return null;
    }

    function loadStats() {
        browserAPI.storage.local.get('stats', (result) => {
            const stats = result.stats || { today: 0, total: 0 };
            blockedToday.textContent = formatNum(stats.today);
            totalBlocked.textContent = formatNum(stats.total);
        });
    }

    function formatNum(n) {
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
        if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
        return n.toString();
    }
});
