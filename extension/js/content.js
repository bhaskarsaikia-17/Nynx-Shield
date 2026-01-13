// Nynx Shield - Cosmetic Filtering (Content Script)
// Cross-browser compatible

const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Common ad selectors for cosmetic filtering
const adSelectors = [
    '.ad-banner',
    '.ad-container',
    '.ad-wrapper',
    '.ad-slot',
    '.sponsored',
    '.sponsored-content',
    'div[id^="google_ads"]',
    'div[id^="div-gpt-ad"]',
    'iframe[src*="doubleclick.net"]',
    'iframe[src*="googlesyndication"]',
    '.adsbygoogle',
    'ins.adsbygoogle',
    'div[class*="sponsored"]',
    'div[class*="advertisement"]',
    'div[class*="ad-unit"]',
    'aside[class*="ad"]',
    '[data-ad]',
    '[data-ad-slot]',
    '[data-google-query-id]',
    '.native-ad',
    '.promoted-content'
];

let totalHidden = 0;
let reportedCount = 0;

// Check if current domain is allowlisted
let isAllowlisted = false;

function checkAllowlist() {
    const hostname = window.location.hostname.replace('www.', '');

    browserAPI.runtime.sendMessage(
        { action: 'checkAllowlist', domain: hostname },
        (response) => {
            isAllowlisted = response?.isAllowed || false;
            if (!isAllowlisted) {
                hideAds();
                initObserver();
            }
        }
    );
}

function hideAds() {
    if (isAllowlisted) return;

    let hiddenCount = 0;

    adSelectors.forEach(selector => {
        try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (!el.dataset.nynxHidden) {
                    el.style.setProperty('display', 'none', 'important');
                    el.style.setProperty('visibility', 'hidden', 'important');
                    el.style.setProperty('height', '0', 'important');
                    el.style.setProperty('overflow', 'hidden', 'important');
                    el.dataset.nynxHidden = 'true';
                    hiddenCount++;
                }
            });
        } catch (e) {
            // Invalid selector, skip
        }
    });

    if (hiddenCount > 0) {
        totalHidden += hiddenCount;

        // Report to background script periodically (not every single element)
        if (totalHidden - reportedCount >= 5) {
            const toReport = totalHidden - reportedCount;
            reportedCount = totalHidden;

            browserAPI.runtime.sendMessage({
                action: 'blockedElement',
                count: toReport
            }).catch(() => { });
        }
    }
}

// Observer for dynamic content
let observer = null;
let observerTimeout = null;

function initObserver() {
    if (observer) return;

    observer = new MutationObserver((mutations) => {
        // Debounce to avoid excessive calls
        if (observerTimeout) clearTimeout(observerTimeout);
        observerTimeout = setTimeout(hideAds, 100);
    });

    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// Wait for document ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAllowlist);
} else {
    checkAllowlist();
}

// Report remaining count before page unload
window.addEventListener('beforeunload', () => {
    if (totalHidden > reportedCount) {
        const toReport = totalHidden - reportedCount;
        browserAPI.runtime.sendMessage({
            action: 'blockedElement',
            count: toReport
        }).catch(() => { });
    }
});

console.log('[Nynx Shield] Cosmetic filtering active');
