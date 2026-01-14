# Installing Nynx Shield on Brave Browser

<p align="center">
  <img src="../extension/assets/icons/icon128.png" alt="Nynx Shield" width="64" height="64">
</p>

This guide will walk you through installing Nynx Shield from source on Brave browser.

---

## Prerequisites

- Brave Browser version **1.19 or higher**
- The Nynx Shield source code (downloaded or cloned)

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

### Step 2: Open Brave Extensions Page

Open Brave and navigate to the extensions page using one of these methods:

- **Method 1**: Type `brave://extensions` in the address bar and press Enter
- **Method 2**: Click the **hamburger menu** (☰) → **Extensions** → **Manage Extensions**
- **Method 3**: Click the **puzzle piece** icon → **Manage extensions**

---

### Step 3: Enable Developer Mode

1. Look for the **Developer mode** toggle in the top-right corner
2. Click to enable it (toggle should turn blue)

---

### Step 4: Load the Extension

1. Click the **Load unpacked** button that appears after enabling Developer mode
2. Navigate to the Nynx Shield folder you downloaded/cloned
3. Select the **`extension`** folder (not the root folder)
4. Click **Select Folder**

---

### Step 5: Verify Installation

After loading, you should see:
- ✅ Nynx Shield appears in your extensions list
- ✅ The Nynx Shield icon appears in your browser toolbar
- ✅ No error messages are displayed

---

## Pin the Extension to Toolbar

1. Click the **puzzle piece icon** (🧩) in the toolbar
2. Find **Nynx Shield** in the dropdown
3. Click the **pin icon** (📌) next to it

Now you can easily access Nynx Shield with one click!

---

## Note About Brave Shields

Brave has a powerful built-in content blocker called **Brave Shields**. You have options:

### Option 1: Use Both (Recommended)
- Nynx Shield adds additional blocking rules
- May catch ads that Brave Shields misses
- Provides more detailed statistics

### Option 2: Disable Brave Shields per site
1. Click the **lion icon** in the address bar
2. Toggle Shields off for sites where you want only Nynx Shield

### Option 3: Adjust Brave Shields settings
1. Go to `brave://settings/shields`
2. Customize which features to use from each blocker

---

## Enable in Private Windows (Optional)

If you want Nynx Shield to work in Private windows:

1. Go to `brave://extensions`
2. Find Nynx Shield and click **Details**
3. Enable **Allow in Private**

---

## Updating the Extension

When you download a new version:

1. Replace the old `extension` folder with the new one
2. Go to `brave://extensions`
3. Click the **reload icon** (🔄) on the Nynx Shield card

---

## Troubleshooting

### Extension doesn't load?
- Make sure you selected the **`extension`** folder, not the root project folder
- Check that `manifest.json` exists inside the selected folder

### Icon doesn't appear?
- Click the puzzle piece icon (🧩) and pin Nynx Shield
- Try reloading the extension

### Errors in the extension card?
- Click **Errors** to see details
- Make sure you have Brave 1.19 or higher

### Double blocking / Page issues?
- Some sites may be blocked twice by both Nynx Shield and Brave Shields
- Try disabling Brave Shields on problematic sites
- Or allowlist the site in Nynx Shield

### Brave Rewards ads still showing?
- Brave Rewards ads are opt-in system ads, not website ads
- These are not blocked by ad blockers by design
- Disable Brave Rewards in settings if you don't want them

---

## Brave-Specific Features

Brave's privacy features work well with Nynx Shield:

- **Fingerprint Protection**: Both Brave and Nynx Shield help prevent tracking
- **HTTPS Everywhere**: Brave upgrades connections while Nynx blocks trackers
- **Script Blocking**: Use Brave Shields for fine-grained script control

---

## Need Help?

- 📖 [Full Documentation](../README.md)
- 🐛 [Report Issues](https://github.com/bhaskarsaikia-17/Nynx-Shield/issues)
- 💬 [Discussions](https://github.com/bhaskarsaikia-17/Nynx-Shield/discussions)
