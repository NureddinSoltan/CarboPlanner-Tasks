'use client';

import { Item } from '@/types';
import { formatKcal, formatTags, capitalize } from '@/utils/tableUtils';
import { X } from 'lucide-react';

interface ItemDetailModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export default function ItemDetailModal({ item, isOpen, onClose, isDark = true }: ItemDetailModalProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={`relative w-full max-w-md backdrop-blur-xl rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200 ${isDark
        ? 'bg-white/10 border border-white/20'
        : 'bg-white/20 border border-white/30'
        }`}>
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
        >
          <X className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
        </button>

        <div className="space-y-6">
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h2>
            <p className={isDark ? 'text-white/60' : 'text-gray-600'}>Detailed information</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={`text-sm font-semibold ${isDark ? 'text-white/80' : 'text-gray-700'}`}>ID</label>
              <p className={`text-sm font-mono p-3 rounded-xl ${isDark
                ? 'text-white/60 bg-white/10'
                : 'text-gray-600 bg-gray-100'
                }`}>{item.id}</p>
            </div>

            <div className="space-y-2">
              <label className={`text-sm font-semibold ${isDark ? 'text-white/80' : 'text-gray-700'}`}>Type</label>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white ${item.type === 'meal'
                ? 'bg-gradient-to-r from-emerald-400 to-teal-600'
                : 'bg-gradient-to-r from-violet-400 to-purple-600'
                }`}>
                {capitalize(item.type)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className={`text-sm font-semibold ${isDark ? 'text-white/80' : 'text-gray-700'}`}>Calories</label>
            <div className="bg-gradient-to-r from-orange-400 to-red-500 p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-white">{item.kcal} kcal</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className={`text-sm font-semibold ${isDark ? 'text-white/80' : 'text-gray-700'}`}>Tags</label>
            <div className="flex flex-wrap gap-2">
              {item.tags.length > 0 ? (
                item.tags.map((tag, index) => (
                  <span key={index} className={`px-3 py-1 text-sm rounded-full ${isDark
                    ? 'bg-white/20 text-white/80'
                    : 'bg-gray-200 text-gray-700'
                    }`}>
                    {tag}
                  </span>
                ))
              ) : (
                <p className={`text-sm italic ${isDark ? 'text-white/60' : 'text-gray-600'}`}>No tags</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}