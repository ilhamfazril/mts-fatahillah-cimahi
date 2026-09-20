import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  X, 
  Radio, 
  Clock, 
  Database,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export interface RealtimeSuccessInfo {
  isOpen: boolean;
  sectionName: string;
  itemTitle?: string;
  actionType?: 'update' | 'create' | 'delete' | 'reset';
  timestamp?: string;
  targetTab?: string;
  targetElementId?: string;
  details?: string;
}

interface RealtimeSuccessModalProps {
  info: RealtimeSuccessInfo | null;
  onClose: () => void;
  onNavigatePublic?: (tab: string, elementId?: string) => void;
}

export const RealtimeSuccessModal: React.FC<RealtimeSuccessModalProps> = ({
  info,
  onClose,
  onNavigatePublic,
}) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!info?.isOpen) {
      setProgress(100);
      return;
    }

    const duration = 6000; // 6 seconds auto-close
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - step;
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [info?.isOpen, isPaused, onClose]);

  if (!info || !info.isOpen) return null;

  const nowFormatted = info.timestamp || new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }) + ' WIB';

  const getActionBadge = () => {
    switch (info.actionType) {
      case 'create':
        return { label: 'Data Baru Ditambahkan', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'delete':
        return { label: 'Data Berhasil Dihapus', color: 'bg-rose-100 text-rose-800 border-rose-300' };
      case 'reset':
        return { label: 'Reset ke Standar', color: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'update':
      default:
        return { label: 'Pembaruan Berhasil', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    }
  };

  const actionBadge = getActionBadge();

  const handleGoToPublic = () => {
    onClose();
    if (onNavigatePublic && info.targetTab) {
      onNavigatePublic(info.targetTab, info.targetElementId);
    }
  };

  return (
    <div 
      id="realtime-success-modal-backdrop"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-popup-title"
    >
      <div 
        id="realtime-success-modal-card"
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-emerald-300/80 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Top Real-time Indicator Bar */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 px-6 py-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
            </span>
            <span className="text-xs font-black tracking-widest uppercase text-emerald-200 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-300" />
              Siaran Real-Time Cloud Firestore
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-emerald-200 hover:text-white hover:bg-emerald-600/50 p-1.5 rounded-lg transition-colors"
            title="Tutup Notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* Main Status Header */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="flex-grow">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${actionBadge.color}`}>
                  {actionBadge.label}
                </span>
                <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {nowFormatted}
                </span>
              </div>

              <h2 id="success-popup-title" className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Perubahan Berhasil Diterapkan!
              </h2>
            </div>
          </div>

          {/* Detailed Context Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-slate-700">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 font-semibold text-slate-800">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {info.sectionName}
              </span>
              <span className="text-[11px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded font-mono font-bold">
                100% LIVE
              </span>
            </div>

            {info.itemTitle && (
              <p className="text-sm font-bold text-slate-900 line-clamp-2">
                &ldquo;{info.itemTitle}&rdquo;
              </p>
            )}

            <p className="text-slate-600 leading-relaxed">
              {info.details || 'Data telah berhasil disimpan ke database Cloud Firestore dan langsung disinkronkan ke layar pengunjung website saat ini tanpa perlu memuat ulang (refresh) halaman.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-500 border-t border-slate-200/80">
              <span className="flex items-center gap-1">
                <Database className="w-3 h-3 text-emerald-600" />
                Database: <strong className="text-slate-700 font-mono font-normal">Firestore (main_config)</strong>
              </span>
              <span className="text-emerald-700 font-semibold">
                • Real-Time Listener Aktif
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {info.targetTab && (
              <button
                type="button"
                id="btn-view-public-realtime"
                onClick={handleGoToPublic}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
              >
                <span>Lihat Tampilan Publik</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              id="btn-close-realtime-popup"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
            >
              Tetap di Dashboard Admin
            </button>
          </div>
        </div>

        {/* Auto Dismiss Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 overflow-hidden">
          <div 
            className="bg-emerald-600 h-full transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
