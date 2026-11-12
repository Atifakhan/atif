import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  MessageCircle, 
  Linkedin, 
  Twitter, 
  Mail,
  QrCode
} from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>('');

  useEffect(() => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://atifakhan.github.io/portfolio/';
    setShareUrl(currentUrl);

    QRCode.toDataURL(currentUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#1c1917', // stone-900
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR code generation error:', err));
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${PROFILE_INFO.name} — Profile & Links Hub`,
          text: `Check out Muhammad Atif's professional engineering profiles, portfolio and contact hub:`,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  const downloadQrCode = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `Muhammad_Atif_Profile_QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareText = encodeURIComponent(`Connect with Muhammad Atif — Network Infrastructure & Security Engineer: ${shareUrl}`);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-sm w-full bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-2xl text-stone-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold font-heading">Share Profile</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Code Canvas */}
        <div className="mt-5 flex flex-col items-center">
          <div className="p-3 bg-white rounded-2xl shadow-inner flex items-center justify-center">
            {qrDataUrl ? (
              <img 
                src={qrDataUrl} 
                alt={`QR code for ${PROFILE_INFO.name}'s profile`} 
                className="w-48 h-48 rounded-lg"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-xs text-stone-400">
                Generating QR Code...
              </div>
            )}
          </div>
          <p className="mt-3 text-xs text-stone-400 text-center">
            Scan with smartphone camera to open Muhammad Atif's profile instantly.
          </p>
        </div>

        {/* URL Box & Copy */}
        <div className="mt-5 flex items-center gap-2 p-1.5 bg-stone-800/90 border border-stone-700/70 rounded-xl">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full bg-transparent text-xs text-stone-300 px-2 py-1 outline-none truncate font-mono"
          />
          <button
            onClick={handleCopy}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-semibold rounded-lg transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-stone-950" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-950" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={downloadQrCode}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Save QR Image</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 rounded-xl transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Share Link</span>
          </button>
        </div>

        {/* Quick Social Share Links */}
        <div className="mt-5 pt-4 border-t border-stone-800 flex items-center justify-around">
          <a
            href={`https://wa.me/?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-stone-400 hover:text-emerald-400 hover:bg-stone-800 rounded-lg transition-colors"
            title="Share to WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-stone-400 hover:text-sky-400 hover:bg-stone-800 rounded-lg transition-colors"
            title="Share to LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-stone-400 hover:text-blue-400 hover:bg-stone-800 rounded-lg transition-colors"
            title="Share to X (Twitter)"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href={`mailto:?subject=Connect%20with%20Muhammad%20Atif&body=${shareText}`}
            className="p-2 text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded-lg transition-colors"
            title="Share via Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
