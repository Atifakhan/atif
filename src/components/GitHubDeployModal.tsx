import React, { useState } from 'react';
import { X, Github, Copy, Check, Terminal, ExternalLink, Sparkles, BookOpen } from 'lucide-react';

interface GitHubDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubDeployModal: React.FC<GitHubDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const workflowYaml = `name: Deploy Profile to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

  const bashCommands = `# 1. Initialize Git in the project root
git init
git add .
git commit -m "feat: complete professional links hub for Muhammad Atif"

# 2. Add your GitHub repository remote
git branch -M main
git remote add origin https://github.com/Atifakhan/links.git

# 3. Push your code to GitHub
git push -u origin main`;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full max-h-[90vh] flex flex-col bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl text-stone-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-heading">Deploy Live to GitHub Pages</h2>
              <p className="text-xs text-stone-400">Step-by-step guide to make this hub live on your GitHub account</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-stone-300">
          {/* Step 1: Push Code to GitHub */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-stone-100 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 text-xs flex items-center justify-center font-bold">1</span>
                <span>Push Code to your GitHub Repo</span>
              </h3>
              <button
                onClick={() => copyToClipboard(bashCommands, 'bash')}
                className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
              >
                {copiedSection === 'bash' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'bash' ? 'Copied' : 'Copy Commands'}</span>
              </button>
            </div>
            <p className="text-xs text-stone-400 mb-2">
              Create a new public repository on your account (<a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">github.com/new</a>), for example <code className="text-stone-200 bg-stone-800 px-1 py-0.5 rounded">links</code>, then run:
            </p>
            <pre className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 text-xs font-mono text-stone-300 overflow-x-auto">
              {bashCommands}
            </pre>
          </div>

          {/* Step 2: Automated Deployment via GitHub Actions */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-stone-100 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 text-xs flex items-center justify-center font-bold">2</span>
                <span>Automatic GitHub Actions Deploy (Recommended)</span>
              </h3>
              <button
                onClick={() => copyToClipboard(workflowYaml, 'yaml')}
                className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
              >
                {copiedSection === 'yaml' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'yaml' ? 'Copied' : 'Copy deploy.yml'}</span>
              </button>
            </div>
            <p className="text-xs text-stone-400 mb-2">
              Save this workflow file in your repository at <code className="text-stone-200 bg-stone-800 px-1 py-0.5 rounded">.github/workflows/deploy.yml</code>. Whenever you push to main, GitHub will automatically build and publish your site!
            </p>
            <pre className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 text-xs font-mono text-stone-300 overflow-x-auto max-h-48">
              {workflowYaml}
            </pre>
          </div>

          {/* Step 3: Enable GitHub Pages in Repo Settings */}
          <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60 space-y-2">
            <h3 className="font-semibold text-stone-100 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 text-xs flex items-center justify-center font-bold">3</span>
              <span>Enable Pages in GitHub Settings</span>
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-xs text-stone-300">
              <li>Go to your GitHub repository: <strong className="text-stone-100">Settings → Pages</strong></li>
              <li>Under <strong className="text-stone-100">Build and deployment &gt; Source</strong>, choose <strong className="text-amber-400">GitHub Actions</strong></li>
              <li>Your site will go live immediately at: <code className="text-emerald-400 bg-stone-900 px-1.5 py-0.5 rounded font-mono">https://atifakhan.github.io/links/</code></li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-stone-800 bg-stone-900/90">
          <a
            href="https://github.com/Atifakhan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-100 transition-colors"
          >
            <span>Visit @Atifakhan on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-200 bg-stone-800 hover:bg-stone-700 rounded-xl transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
