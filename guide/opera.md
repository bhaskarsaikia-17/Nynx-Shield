# Installing Nynx Shield on Opera

<p align="center">
  <img src="../extension/assets/icons/icon128.png" alt="Nynx Shield" width="64" height="64">
</p>

This guide will walk you through installing Nynx Shield from source on Opera browser.

---

## Prerequisites

- Opera version **74 or higher**
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

### Step 2: Open Opera Extensions Page

Open Opera and navigate to the extensions page using one of these methods:

- **Method 1**: Type `opera://extensions` in the address bar and press Enter
- **Method 2**: Click the Opera menu (top-left) → **Extensions** → **Extensions**
- **Method 3**: Press `Ctrl + Shift + E` (Windows/Linux) or `Cmd + Shift + E` (Mac)

---

### Step 3: Enable Developer Mode

1. Look for the **Developer mode** toggle in the top-right corner
2. Click to enable it (toggle should turn on)

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
- ✅ The Nynx Shield icon appears in your browser toolbar (or extension area)
- ✅ No error messages are displayed

---

## Pin the Extension to Toolbar

1. Look for the **cube icon** (Extensions) in the toolbar
2. Find **Nynx Shield** in the dropdown
3. Click the **pin icon** (📌) next to it

Now you can easily access Nynx Shield with one click!

---

## Enable in Private Windows (Optional)

If you want Nynx Shield to work in private windows:

1. Go to `opera://extensions`
2. Click **Details** under Nynx Shield
3. Enable **Allow in Private**

---

## Note About Opera's Built-in Ad Blocker

Opera has a built-in ad blocker. You can use both, but for best results:

1. Go to Opera Settings (Alt + P)
2. Navigate to **Basic** → **Privacy protection**
3. You can either:
   - Disable Opera's blocker and use only Nynx Shield
   - Use both for enhanced protection

---

## Updating the Extension

When you download a new version:

1. Replace the old `extension` folder with the new one
2. Go to `opera://extensions`
3. Click the **reload icon** (🔄) on the Nynx Shield card

---

## Troubleshooting

### Extension doesn't load?
- Make sure you selected the **`extension`** folder, not the root project folder
- Check that `manifest.json` exists inside the selected folder

### Icon doesn't appear?
- Click the cube/extensions icon and pin Nynx Shield
- Try reloading the extension

### Errors in the extension card?
- Click to see error details
- Make sure you have Opera 74 or higher

### Conflicts with Opera's built-in blocker?
- Try disabling Opera's built-in ad blocker in settings
- Or whitelist Nynx Shield in Opera's blocker

### Extension marked as "disabled"?
- Check if Opera flagged it as potentially unsafe
- Re-enable it from the extensions page

---

## Opera GX Users

The installation process is identical for Opera GX:

1. Opera GX is based on the same engine as Opera
2. Use `opera://extensions` the same way
3. All features work identically

---

## Need Help?

- 📖 [Full Documentation](../README.md)
- 🐛 [Report Issues](https://github.com/bhaskarsaikia-17/Nynx-Shield/issues)
- 💬 [Discussions](https://github.com/bhaskarsaikia-17/Nynx-Shield/discussions)
