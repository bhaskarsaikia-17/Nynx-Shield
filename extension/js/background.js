// Nynx Shield - Background Service Worker
// Cross-browser compatible

// Browser API polyfill - works with Chrome, Edge, Firefox, Opera
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Initialize on install
browserAPI.runtime.onInstalled.addListener(() => {
    console.log('[Nynx Shield] Extension Installed');

    // Initialize storage with defaults
    browserAPI.storage.local.get(['shieldActive', 'allowlist', 'stats', 'settings', 'lastResetDate'], (result) => {
        const today = new Date().toDateString();

        if (result.shieldActive === undefined) {
            browserAPI.storage.local.set({ shieldActive: true });
        }
        if (!result.allowlist) {
            browserAPI.storage.local.set({ allowlist: [] });
        }
        if (!result.stats) {
            browserAPI.storage.local.set({
                stats: { today: 0, total: 0 },
                lastResetDate: today
            });
        }
        if (!result.settings) {
            browserAPI.storage.local.set({
                settings: {
                    protection: true,
                    cosmetic: true,
                    trackers: true,
                    social: true,
                    crypto: true
                }
            });
        }
    });

    // Log enabled rulesets (Chromium browsers)
    if (browserAPI.declarativeNetRequest?.getEnabledRulesets) {
        browserAPI.declarativeNetRequest.getEnabledRulesets((rulesets) => {
            console.log('[Nynx Shield] Enabled Rulesets:', rulesets);
        });
    }
});

// Track blocked requests - Chromium with onRuleMatchedDebug
if (browserAPI.declarativeNetRequest?.onRuleMatchedDebug) {
    browserAPI.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
        incrementBlockedCount();
    });
}

// Fallback: Listen for messages from content script (for cosmetic blocking count)
browserAPI.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Handle blocked count from content script
    if (message.action === 'blockedElement') {
        incrementBlockedCount(message.count || 1);
        sendResponse({ success: true });
        return true;
    }

    if (message.action === 'addToAllowlist') {
        addDomainToAllowlist(message.domain);
        sendResponse({ success: true });
    }
    else if (message.action === 'removeFromAllowlist') {
        removeDomainFromAllowlist(message.domain);
        sendResponse({ success: true });
    }
    else if (message.action === 'updateAllowlist') {
        console.log('[Nynx Shield] Allowlist updated:', message.allowlist);
    }
    else if (message.action === 'checkAllowlist') {
        browserAPI.storage.local.get('allowlist', (result) => {
            const allowlist = result.allowlist || [];
            const isAllowed = allowlist.includes(message.domain);
            sendResponse({ isAllowed });
        });
        return true;
    }
    else if (message.action === 'getStats') {
        browserAPI.storage.local.get('stats', (result) => {
            sendResponse({ stats: result.stats || { today: 0, total: 0 } });
        });
        return true;
    }
    return true;
});

// Increment blocked count in storage
function incrementBlockedCount(count = 1) {
    browserAPI.storage.local.get(['stats', 'lastResetDate'], (result) => {
        const today = new Date().toDateString();
        let stats = result.stats || { today: 0, total: 0 };

        // Reset daily count if new day
        if (result.lastResetDate !== today) {
            stats.today = 0;
            browserAPI.storage.local.set({ lastResetDate: today });
        }

        stats.today += count;
        stats.total += count;

        browserAPI.storage.local.set({ stats }, () => {
            updateBadge(stats.today);
        });
    });
}

// Update extension badge with blocked count
function updateBadge(count) {
    let text = '';
    if (count > 0) {
        if (count >= 1000) {
            text = Math.floor(count / 1000) + 'K';
        } else {
            text = count.toString();
        }
    }

    // Use action API (MV3) or browserAction API (MV2/Firefox)
    const actionAPI = browserAPI.action || browserAPI.browserAction;
    if (actionAPI) {
        actionAPI.setBadgeText({ text });
        actionAPI.setBadgeBackgroundColor({ color: '#00cc6a' });
    }
}

// Add domain to allowlist
function addDomainToAllowlist(domain) {
    domain = cleanDomain(domain);

    browserAPI.storage.local.get('allowlist', (result) => {
        const allowlist = result.allowlist || [];

        if (!allowlist.includes(domain)) {
            allowlist.push(domain);
            browserAPI.storage.local.set({ allowlist }, () => {
                console.log('[Nynx Shield] Added to allowlist:', domain);
                updateSessionRules(allowlist);
            });
        }
    });
}

// Remove domain from allowlist
function removeDomainFromAllowlist(domain) {
    domain = cleanDomain(domain);

    browserAPI.storage.local.get('allowlist', (result) => {
        let allowlist = result.allowlist || [];
        allowlist = allowlist.filter(d => d !== domain);

        browserAPI.storage.local.set({ allowlist }, () => {
            console.log('[Nynx Shield] Removed from allowlist:', domain);
            updateSessionRules(allowlist);
        });
    });
}

// Update session rules for allowlist (Chromium browsers)
function updateSessionRules(allowlist) {
    if (!browserAPI.declarativeNetRequest?.updateSessionRules) {
        console.log('[Nynx Shield] Session rules not supported');
        return;
    }

    browserAPI.declarativeNetRequest.getSessionRules((existingRules) => {
        const existingIds = existingRules.map(r => r.id);

        const newRules = allowlist.map((domain, index) => ({
            id: index + 1,
            priority: 1,
            action: { type: 'allow' },
            condition: {
                urlFilter: `||${domain}`,
                resourceTypes: [
                    'main_frame', 'sub_frame', 'stylesheet', 'script',
                    'image', 'font', 'object', 'xmlhttprequest', 'ping',
                    'media', 'websocket', 'other'
                ]
            }
        }));

        browserAPI.declarativeNetRequest.updateSessionRules({
            removeRuleIds: existingIds,
            addRules: newRules
        }, () => {
            console.log('[Nynx Shield] Session rules updated');
        });
    });
}

// Clean domain helper
function cleanDomain(domain) {
    return domain
        .toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .split('/')[0];
}

// Check daily reset on startup
browserAPI.storage.local.get(['lastResetDate', 'stats'], (result) => {
    const today = new Date().toDateString();

    if (result.lastResetDate !== today) {
        const stats = result.stats || { today: 0, total: 0 };
        stats.today = 0;
        browserAPI.storage.local.set({
            lastResetDate: today,
            stats
        });
    }

    if (result.stats) {
        updateBadge(result.stats.today);
    }
});
