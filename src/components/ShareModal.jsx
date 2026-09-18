import React, { useState, useEffect } from 'react';
import { X, Share2, Copy, Check, ExternalLink, Code2, Sparkles, Shield, TrendingUp } from 'lucide-react';
import { formatDistance } from '../utils/formatters';

export default function ShareModal({ isOpen, onClose, currentMiles, unit = 'miles' }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  // Close on Escape key and lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentFormatted = formatDistance(currentMiles, unit, 0);
  const shareUrl = 'https://tesla-fsd-live.vercel.app';
  const tweetText = `Tesla's Full Self-Driving (Supervised) fleet just crossed ${currentFormatted} ${unit} driven, operating 7.4x safer than the US national average. Track live fleet telematics:`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (err) {
      // Fallback
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const embedBadge = `[![Tesla FSD Tracker](https://img.shields.io/badge/Tesla%20FSD-${encodeURIComponent(currentFormatted)}+${unit}-e82127?style=flat-square&logo=tesla&logoColor=white)](${shareUrl})`;

  const handleCopyEmbed = async () => {
    try {
      await navigator.clipboard.writeText(embedBadge);
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2500);
    } catch (err) {
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2500);
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}&hashtags=Tesla,FSD,AutonomousVehicles`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=600,height=450');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#111111] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close share dialog"
          className="absolute top-5 right-5 p-2 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-5">
          <div className="p-2.5 rounded-xl bg-tesla-red/10 text-tesla-red">
            <Share2 size={20} />
          </div>
          <div>
            <h3 id="share-modal-title" className="text-xl font-bold font-tesla text-neutral-900 dark:text-white">
              Share Fleet Telemetry
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Live OpenGraph social preview &amp; instant share
            </p>
          </div>
        </div>

        {/* Live OpenGraph Social Preview Card */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[#050505] p-5 text-white shadow-inner relative overflow-hidden group">
          {/* Subtle ambient back-glow */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-tesla-red animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                  Tesla Telemetry Live
                </span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                7.4x Safer
              </span>
            </div>

            <div className="my-4">
              <div className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
                Cumulative Fleet Telemetry
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-tesla tracking-tight text-white mt-0.5 tabular-nums">
                {currentFormatted} <span className="text-tesla-red text-xl sm:text-2xl">{unit}</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                Real-time Full Self-Driving (Supervised) distance across 2M+ active vehicles in 12 countries.
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
              <span>tesla-fsd-live.vercel.app</span>
              <span>Updated Live</span>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-5 space-y-2.5">
          {/* Share on X (Twitter) */}
          <button
            onClick={handleTwitterShare}
            className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 font-semibold text-xs tracking-wide transition-all flex items-center justify-center space-x-2 shadow-xs"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Share on X (Twitter)</span>
          </button>

          {/* Copy Direct Link */}
          <button
            onClick={handleCopyLink}
            className="w-full py-2.5 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-xs transition-colors flex items-center justify-center space-x-2 border border-neutral-200 dark:border-neutral-700"
          >
            {copiedLink ? (
              <>
                <Check size={15} className="text-emerald-500 shrink-0" />
                <span className="text-emerald-600 dark:text-emerald-400">Telemetry Link Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={15} className="shrink-0" />
                <span>Copy Live Telemetry Link</span>
              </>
            )}
          </button>
        </div>

        {/* Developer / Markdown Embed Section */}
        <div className="mt-5 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            <span className="flex items-center space-x-1.5">
              <Code2 size={13} className="text-tesla-red" />
              <span>Markdown Shield Badge</span>
            </span>
            <button
              onClick={handleCopyEmbed}
              className="text-[11px] text-tesla-red hover:underline font-mono"
            >
              {copiedEmbed ? 'Badge Copied!' : 'Copy Badge Code'}
            </button>
          </div>
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[10px] font-mono text-neutral-600 dark:text-neutral-400 overflow-x-auto whitespace-nowrap">
            {embedBadge}
          </div>
        </div>

      </div>
    </div>
  );
}
