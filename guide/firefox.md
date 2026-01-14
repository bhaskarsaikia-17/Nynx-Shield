# Installing Nynx Shield on Mozilla Firefox

<p align="center">
  <img src="../extension/assets/icons/icon128.png" alt="Nynx Shield" width="64" height="64">
</p>

This guide will walk you through installing Nynx Shield from source on Mozilla Firefox.

---

## Prerequisites

- Mozilla Firefox version **109 or higher**
- The Nynx Shield source code (downloaded or cloned)

---

## Important Note About Firefox

Firefox handles developer extensions differently than Chromium-based browsers:

- **Temporary Add-ons**: Extensions loaded via "Load Temporary Add-on" are removed when Firefox closes
- **For permanent installation**: You need to use Firefox Developer Edition or Firefox Nightly with signing disabled

---

## Step-by-Step Installation

### Step 1: Download the Source Code

**Option A: Clone with Git**
```bash
git clone https://github.com/bhaskarsaikia-17/Nynx-Shield.git
```

**Option B: Download ZIP**
1. Go to the [GitHub repository](https://github.com/bhaskarsaikia-17/Nynx-Shield)
2. Click the green **Code** button
3. Select **Download ZIP**
4. Extract the ZIP file to a folder on your computer

---

### Step 2: Open Firefox Debugging Page

Open Firefox and navigate to the debugging page:

- Type `about:debugging#/runtime/this-firefox` in the address bar and press Enter

---

### Step 3: Load Temporary Add-on

1. Click the **Load Temporary Add-on...** button
2. Navigate to the Nynx Shield folder you downloaded/cloned
3. Go into the **`extension`** folder
4. Select the **`manifest.json`** file
5. Click **Open**

---

### Step 4: Verify Installation

After loading, you should see:
- ✅ Nynx Shield appears in the "Temporary Extensions" section
- ✅ The Nynx Shield icon appears in your browser toolbar
- ✅ No error messages are displayed

---

## Pin the Extension to Toolbar

1. Right-click the Nynx Shield icon in the toolbar
2. Select **Pin to Toolbar** (if available)
3. Or drag it to your preferred position

---

## Permanent Installation (Advanced)

For permanent installation without re-loading after every Firefox restart:

### Option 1: Firefox Developer Edition / Nightly

1. Download [Firefox Developer Edition](https://www.mozilla.org/firefox/developer/) or [Firefox Nightly](https://www.mozilla.org/firefox/nightly/)
2. Open `about:config` in the address bar
3. Accept the risk warning
4. Search for `xpinstall.signatures.required`
5. Toggle it to `false`
6. Now you can install unsigned extensions permanently

### Option 2: Create a Signed Extension

1. Create an account on [Firefox Add-ons](https://addons.mozilla.org/)
2. Submit your extension for signing (you can keep it unlisted)
3. Download and install the signed `.xpi` file

---

## Updating the Extension

When you download a new version:

1. Go to `about:debugging#/runtime/this-firefox`
2. Click **Reload** on the Nynx Shield entry
3. Or remove and re-add the extension

---

## Troubleshooting

### Extension doesn't load?
- Make sure you selected the **`manifest.json`** file inside the `extension` folder
- Check that the manifest.json is valid JSON

### Icon doesn't appear?
- Check if Firefox assigned a keyboard shortcut instead
- Look in the overflow menu (>>)

### "This extension is not supported" error?
- Make sure you have Firefox 109 or higher
- Check that the manifest.json has proper Firefox compatibility

### Extension disappears after restart?
- This is expected behavior for temporary add-ons
- See "Permanent Installation" section above

### Web Extension API errors?
- Firefox may have slightly different API implementations
- Report any Firefox-specific issues on GitHub

---

## Firefox-Specific Features

Firefox has some unique features that work with Nynx Shield:

- **Enhanced Tracking Protection**: Works alongside Firefox's built-in protection
- **Container Tabs**: Nynx Shield works in all container tabs
- **Private Browsing**: Check "Run in Private Windows" in extension settings

---

## Need Help?

- 📖 [Full Documentation](../README.md)
- 🐛 [Report Issues](https://github.com/bhaskarsaikia-17/Nynx-Shield/issues)
- 💬 [Discussions](https://github.com/bhaskarsaikia-17/Nynx-Shield/discussions)
