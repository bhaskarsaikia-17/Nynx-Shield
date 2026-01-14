# Installing Nynx Shield on Google Chrome

<p align="center">
  <img src="../extension/assets/icons/icon128.png" alt="Nynx Shield" width="64" height="64">
</p>

This guide will walk you through installing Nynx Shield from source on Google Chrome.

---

## Prerequisites

- Google Chrome version **88 or higher**
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

### Step 2: Open Chrome Extensions Page

Open Chrome and navigate to the extensions page using one of these methods:

- **Method 1**: Type `chrome://extensions` in the address bar and press Enter
- **Method 2**: Click the menu (⋮) → **Extensions** → **Manage Extensions**

---

### Step 3: Enable Developer Mode

1. Look for the **Developer mode** toggle in the top-right corner
2. Click to enable it (toggle should turn blue)

<p align="center">
  <img src="https://developer.chrome.com/static/docs/extensions/get-started/tutorial/hello-world/image/extensions-page-e702277e21e9f.png" alt="Developer Mode Toggle" width="500">
</p>

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

## Pin the Extension (Recommended)

1. Click the **puzzle piece icon** (🧩) in the toolbar
2. Find **Nynx Shield** in the dropdown
3. Click the **pin icon** (📌) next to it

Now you can easily access Nynx Shield with one click!

---

## Updating the Extension

When you download a new version:

1. Replace the old `extension` folder with the new one
2. Go to `chrome://extensions`
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
- Make sure you have Chrome 88 or higher

---

## Need Help?

- 📖 [Full Documentation](../README.md)
- 🐛 [Report Issues](https://github.com/bhaskarsaikia-17/Nynx-Shield/issues)
- 💬 [Discussions](https://github.com/bhaskarsaikia-17/Nynx-Shield/discussions)
