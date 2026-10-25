'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CodeBlock({ lang, content }: { lang: string; content: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be unavailable (e.g. insecure context) — nothing to do.
    }
  };

  return (
    <div className="mt-3 rounded-xl border border-line bg-black/40 overflow-hidden">
      <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-line">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-subtle">{lang}</span>
        <button
          onClick={copy}
          aria-label="Copy code"
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[11px] text-muted hover:text-fg hover:bg-fg/5 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed text-fg/90 [tab-size:14]">
        <code>{content}</code>
      </pre>
    </div>
  );
}
