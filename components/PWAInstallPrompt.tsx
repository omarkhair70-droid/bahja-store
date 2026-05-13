'use client';

import { useEffect, useMemo, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const DISMISS_KEY = 'bahja-pwa-prompt-dismissed-until';
const DISMISS_MS = 1000 * 60 * 60 * 24 * 7;

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  const inStandalone = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (inStandalone) return;

    const dismissedUntil = Number(window.localStorage.getItem(DISMISS_KEY) || '0');
    if (dismissedUntil > Date.now()) return;

    const ua = window.navigator.userAgent;
    const iosDevice = /iPad|iPhone|iPod/.test(ua) || (/Mac/.test(ua) && 'ontouchend' in document);
    const safari = /^((?!chrome|android).)*safari/i.test(ua);
    const shouldShowIOSGuide = iosDevice && safari;
    setIsIOS(shouldShowIOSGuide);

    if (shouldShowIOSGuide) setVisible(true);

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    const onInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, [inStandalone]);

  if (!visible || inStandalone) return null;

  const dismissPrompt = () => {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_MS));
    setVisible(false);
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome !== 'accepted') {
      dismissPrompt();
    }
    setDeferredPrompt(null);
  };

  return (
    <aside className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-2xl border border-stone-200 bg-[#FDF8F1] p-4 shadow-xl" aria-live="polite">
      <p className="text-sm font-semibold text-stone-900">نزّلي بهجة على موبايلك</p>
      <p className="mt-1 text-sm text-stone-700">
        {isIOS
          ? 'من زر المشاركة في Safari اختاري Add to Home Screen لفتح بهجة كتطبيق.'
          : 'افتحيه كتطبيق من الشاشة الرئيسية لتجربة أسرع وأجمل.'}
      </p>
      <div className="mt-3 flex items-center gap-2">
        {!isIOS && deferredPrompt ? (
          <button onClick={handleInstall} className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white">
            تثبيت
          </button>
        ) : null}
        <button onClick={dismissPrompt} className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-800">
          لاحقًا
        </button>
      </div>
    </aside>
  );
}
