# Nynx Shield

<p align="center">
  <img src="assets/icons/icon128.png" alt="Nynx Shield Logo" width="128" height="128">
</p>

<p align="center">
  <strong>A powerful, privacy-focused ad blocker built with Manifest V3</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

---

## Features

- **🛡️ Ad Blocking** - Block intrusive ads across all websites
- **🔒 Privacy Protection** - Stop trackers, social widgets, and crypto miners
- **⚡ Fast & Lightweight** - Built with Manifest V3 for optimal performance
- **🌐 Cross-Browser** - Works on Chrome, Edge, Firefox, Opera, and Brave
- **📝 Custom Rules** - Add your own blocking rules
- **✅ Allowlist** - Easily disable protection on specific sites
- **📊 Statistics** - Track blocked ads and trackers
- **🎨 Modern UI** - Clean, dark-themed interface

## Installation

### From Source (Developer Mode)

1. Clone this repository:
   ```bash
   git clone https://github.com/bhaskarsaikia-17/Nynx-Shield.git
   ```

2. Open your browser's extension page:
   - **Chrome**: `chrome://extensions`
   - **Edge**: `edge://extensions`
   - **Firefox**: `about:debugging#/runtime/this-firefox`

3. Enable "Developer mode"

4. Click "Load unpacked" and select the `extension` folder

### Build from Source

```bash
# Install dependencies (if any)
npm install

# Build filter rules
npm run build
```

## Project Structure

```
nynx-shield/
├── extension/              # Extension source files
│   ├── assets/            # Icons and images
│   │   └── icons/         # Extension icons
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   │   ├── background.js  # Service worker
│   │   ├── content.js     # Content script
│   │   ├── popup.js       # Popup logic
│   │   └── options.js     # Settings page logic
│   ├── pages/             # HTML pages
│   │   ├── popup.html     # Popup UI
│   │   └── options.html   # Settings page
│   ├── rules/             # Blocking rules
│   │   └── rules.json     # DNR rules
│   └── manifest.json      # Extension manifest
├── scripts/               # Build scripts
├── docs/                  # Documentation
├── .gitignore
├── LICENSE
└── README.md
```

## Usage

### Basic Usage

1. Click the Nynx Shield icon in your browser toolbar
2. View blocked statistics for the current page
3. Toggle protection on/off for specific sites

### Settings

- **General** - Enable/disable protection features
- **Filters** - Manage filter lists
- **Protection** - Configure tracker and miner blocking
- **Allowlist** - Manage allowed domains
- **Custom Rules** - Add your own blocking rules

## Browser Support

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Chrome  | 88+            | ✅ Supported |
| Edge    | 88+            | ✅ Supported |
| Firefox | 109+           | ✅ Supported |
| Opera   | 74+            | ✅ Supported |
| Brave   | 1.19+          | ✅ Supported |

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Privacy

Nynx Shield is committed to user privacy:

- **No data collection** - We don't collect any user data
- **Local processing** - All blocking happens locally on your device
- **No external servers** - No connection to external servers for blocking

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Filter lists from [EasyList](https://easylist.to/)
- Community contributors

---

<p align="center">
  Made with ❤️ for a cleaner, faster, and more private web
</p>
