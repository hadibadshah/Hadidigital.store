# Hadi Digital Store (HDS) — hadidigital.store

Official web application for **Hadi Digital Store (HDS)**.

## 🚀 Features
- **Dark/Light Mode**: Premium dark theme by default with instant toggle.
- **25,000+ Happy Customers Metric**: Proof of trust and market liquidity.
- **EzToolbox Integration**: Link and featured section for `https://eztoolbox.xyz` (Free YouTube Channel & Video Analyzer, IP checker, USD to PKR live price, QR generator).
- **VIP WhatsApp Integration**: Direct WhatsApp ordering (`+923116797819`) & WhatsApp Channel link.
- **Hidden Admin Panel**: Access via footer discreet Admin button. Password protected (`admin123`) for managing products, prices, articles, and store settings.

## 📦 How to Deploy on Hostinger / GitHub

### 1. Build locally or via GitHub Actions
Run the build command:
```bash
npm install
npm run build
```
This generates a production-ready static website inside the `dist/` folder.

### 2. Uploading to Hostinger
1. Log in to your Hostinger hPanel.
2. Go to **File Manager** -> `public_html`.
3. Upload all contents inside the `dist/` folder directly to `public_html`.
4. Your site `hadidigital.store` will be live instantly!

### 3. GitHub Actions
When you push code to `main` or `master` branch on GitHub, GitHub Actions will automatically run `.github/workflows/deploy.yml` and produce a downloadable `hostinger-dist-build` artifact in the Actions tab.
