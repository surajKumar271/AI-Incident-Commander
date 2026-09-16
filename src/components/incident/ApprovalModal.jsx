import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlertIcon, ArrowRightIcon, XIcon, CheckIcon, UserCheckIcon } from 'lucide-react';

export function ApprovalModal({ open, recovery, onCancel, onConfirm }) {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') onCancel();
    }
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => confirmRef.current && confirmRef.current.focus(), 60);
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
          className="absolute inset-0 bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          onClick={onCancel} />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="approval-title"
          className="relative w-full max-w-lg overflow-hidden rounded-xl border border-line2 bg-panel shadow-2xl"
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}>
          
            <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ai/10 ring-1 ring-inset ring-ai/30">
                  <UserCheckIcon className="h-4 w-4 text-ai" aria-hidden="true" />
                </span>
                <div>
                  <h2 id="approval-title" className="text-sm font-semibold tracking-tight text-fg">
                    Human Approval Required
                  </h2>
                  <p className="text-2xs text-fg3">Guarded action · production</p>
                </div>
              </div>
              <button
              type="button"
              onClick={onCancel}
              className="rounded-md p-1.5 text-fg3 transition-colors duration-150 ease-smooth hover:bg-white/[0.05] hover:text-fg"
              aria-label="Close dialog">
              
                <XIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </header>

            <div className="px-5 py-4">
              <p className="flex items-start gap-2.5 rounded-lg border border-warn/30 bg-warn/[0.06] px-3.5 py-3 text-xs leading-relaxed text-fg">
                <ShieldAlertIcon className="mt-0.5 h-4 w-4 shrink-0 text-warn" aria-hidden="true" />
                The AI Recovery Agent is requesting permission to execute a production rollback.
              </p>

              <div className="mt-4 flex items-center gap-3 rounded-lg border border-line bg-panel2 px-4 py-3">
                <div>
                  <p className="text-2xs uppercase tracking-wide text-fg3">Current version</p>
                  <p className="mt-1 font-mono text-sm font-semibold text-crit">{recovery.from}</p>
                </div>
                <ArrowRightIcon className="mt-4 h-4 w-4 shrink-0 text-fg3" aria-hidden="true" />
                <div>
                  <p className="text-2xs uppercase tracking-wide text-fg3">Target version</p>
                  <p className="mt-1 font-mono text-sm font-semibold text-ok">{recovery.to}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-2xs uppercase tracking-wide text-fg3">Risk</p>
                  <p className="mt-1 text-sm font-semibold text-warn">{recovery.risk}</p>
                </div>
              </div>

              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="text-2xs font-semibold uppercase tracking-wide text-fg3">Reason</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-fg">
                    Database connection exhaustion began shortly after v2.4 deployment.
                  </dd>
                </div>
                <div>
                  <dt className="text-2xs font-semibold uppercase tracking-wide text-fg3">Scope</dt>
                  <dd className="mt-1 text-sm text-fg2">
                    {recovery.blastRadius} · estimated {recovery.eta}
                  </dd>
                </div>
              </dl>
            </div>

            <footer className="flex flex-col-reverse gap-2.5 border-t border-line px-5 py-4 sm:flex-row sm:justify-end">
              <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center rounded-md border border-line2 bg-panel2 px-4 py-2.5 text-sm font-semibold text-fg2 transition-colors duration-150 ease-smooth hover:border-fg3 hover:text-fg">
              
                Cancel
              </button>
              <button
              ref={confirmRef}
              type="button"
              onClick={onConfirm}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-ai px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 ease-smooth hover:bg-ai/85">
              
                <CheckIcon className="h-4 w-4" aria-hidden="true" />
                Approve &amp; Execute
              </button>
            </footer>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}