// Nynx Shield - Options/Settings Script
// Cross-browser compatible

const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const pageSections = document.querySelectorAll('.page-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;

            // Update nav
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Update sections
            pageSections.forEach(section => section.classList.remove('active'));
            document.getElementById(`page-${page}`).classList.add('active');
        });
    });

    // Toggle switches
    document.querySelectorAll('.toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');

            const id = toggle.id;
            const isActive = toggle.classList.contains('active');

            if (id) {
                const key = id.replace('toggle', '').toLowerCase();
                browserAPI.storage.local.get('settings', (result) => {
                    const settings = result.settings || {};
                    settings[key] = isActive;
                    browserAPI.storage.local.set({ settings });
                });
            }
        });
    });

    // Load settings
    loadSettings();
    loadAllowlist();
    loadStats();

    // Allowlist functionality
    document.getElementById('addAllowlistBtn').addEventListener('click', addToAllowlist);
    document.getElementById('allowlistInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addToAllowlist();
    });

    // Advanced buttons
    document.getElementById('resetStatsBtn').addEventListener('click', () => {
        if (confirm('Reset all statistics?')) {
            browserAPI.storage.local.set({ stats: { today: 0, total: 0 } }, loadStats);
        }
    });

    document.getElementById('clearAllowlistBtn').addEventListener('click', () => {
        if (confirm('Clear all allowlisted domains?')) {
            browserAPI.storage.local.set({ allowlist: [] }, loadAllowlist);
        }
    });

    // Custom rules
    document.getElementById('saveRulesBtn').addEventListener('click', () => {
        const rules = document.getElementById('customRules').value;
        browserAPI.storage.local.set({ customRules: rules }, () => {
            alert('Rules saved!');
        });
    });

    // Load custom rules
    browserAPI.storage.local.get('customRules', (result) => {
        if (result.customRules) {
            document.getElementById('customRules').value = result.customRules;
        }
    });
});

function loadSettings() {
    browserAPI.storage.local.get('settings', (result) => {
        const settings = result.settings || {
            protection: true,
            cosmetic: true,
            trackers: true,
            social: true,
            crypto: true
        };

        Object.keys(settings).forEach(key => {
            const toggle = document.getElementById(`toggle${capitalize(key)}`);
            if (toggle) {
                if (settings[key]) {
                    toggle.classList.add('active');
                } else {
                    toggle.classList.remove('active');
                }
            }
        });
    });
}

function loadAllowlist() {
    browserAPI.storage.local.get('allowlist', (result) => {
        const allowlist = result.allowlist || [];
        const container = document.getElementById('allowlistItems');

        // Update stats
        const statEl = document.getElementById('statAllowlist');
        if (statEl) statEl.textContent = allowlist.length;

        if (allowlist.length === 0) {
            container.innerHTML = '<div class="allowlist-empty">No domains in allowlist</div>';
            return;
        }

        container.innerHTML = allowlist.map(domain => `
            <div class="allowlist-item" data-domain="${domain}">
                <span class="allowlist-domain">${domain}</span>
                <button class="btn btn-danger remove-btn" data-domain="${domain}">Remove</button>
            </div>
        `).join('');

        // Add remove handlers
        container.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                removeFromAllowlist(btn.dataset.domain);
            });
        });
    });
}

function loadStats() {
    browserAPI.storage.local.get('stats', (result) => {
        const stats = result.stats || { today: 0, total: 0 };

        const totalEl = document.getElementById('statTotal');
        const todayEl = document.getElementById('statToday');

        if (totalEl) totalEl.textContent = formatNum(stats.total);
        if (todayEl) todayEl.textContent = formatNum(stats.today);
    });
}

function addToAllowlist() {
    const input = document.getElementById('allowlistInput');
    let domain = input.value.trim().toLowerCase();

    if (!domain) return;

    // Clean domain
    domain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];

    browserAPI.storage.local.get('allowlist', (result) => {
        const allowlist = result.allowlist || [];

        if (!allowlist.includes(domain)) {
            allowlist.push(domain);
            browserAPI.storage.local.set({ allowlist }, () => {
                loadAllowlist();
                input.value = '';

                // Notify background to update rules
                browserAPI.runtime.sendMessage({ action: 'updateAllowlist', allowlist });
            });
        }
    });
}

function removeFromAllowlist(domain) {
    browserAPI.storage.local.get('allowlist', (result) => {
        let allowlist = result.allowlist || [];
        allowlist = allowlist.filter(d => d !== domain);

        browserAPI.storage.local.set({ allowlist }, () => {
            loadAllowlist();

            // Notify background to update rules
            browserAPI.runtime.sendMessage({ action: 'updateAllowlist', allowlist });
        });
    });
}

function formatNum(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
