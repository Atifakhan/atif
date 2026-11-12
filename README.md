# Muhammad Atif — Professional Profile & Links Hub

A digital business card, personal link-in-bio, and portfolio showcase built for **Muhammad Atif** — *Network Infrastructure & Security Engineer at IOTA Solutions*.

## 🌟 Features Included

- **Personalized Executive Bio**: Featuring Muhammad Atif's real portrait, professional title, IOTA Solutions affiliation, location, and verified status.
- **Complete Categorized Links Catalog**:
  - **Featured Portfolios**: Official Engineering Portfolio (`atifakhan.github.io/portfolio`), Hatchable Expertise Hub, and Supabase Community Platform.
  - **Professional & Technical Networks**: LinkedIn, GitHub (`@Atifakhan`), and Asani.pk Verified Profile.
  - **Social Channels**: X (Twitter), Facebook, Instagram, Reddit, TikTok.
  - **Direct Contact & Inquiries**: WhatsApp Chat (`0314 9881406`), Email (`atifat45@gmail.com`), and Direct Call.
- **Save Contact (vCard / `.vcf`)**: Instant 1-click download of `Muhammad_Atif.vcf` to save directly to iOS or Android contacts.
- **Interactive Share & Dynamic QR Code**: Generates sharp scannable QR code on the fly for sharing at events, resumes, or business cards with 1-click PNG download.
- **Direct Inquiry Modal**: In-browser message composer for email and WhatsApp.
- **Search & Filter**: Real-time search across platforms and skills.

---

## 🚀 How to Deploy Live to GitHub Pages

### Option 1: Automatic GitHub Actions (Recommended)

1. Create a new repository on your GitHub account (e.g. `links` or `atifakhan.github.io`).
2. Push this project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete professional links hub for Muhammad Atif"
   git branch -M main
   git remote add origin https://github.com/Atifakhan/links.git
   git push -u origin main
   ```
3. In your repository on GitHub:
   - Go to **Settings** > **Pages**
   - Under **Build and deployment** > **Source**, choose **GitHub Actions**
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site!

### Option 2: Manual Build

```bash
npm install
npm run build
```
This produces a static distribution in `./dist` that can be hosted on GitHub Pages, Vercel, Netlify, or any static web host.
