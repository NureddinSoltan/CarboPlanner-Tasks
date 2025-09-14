'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  onThemeChange?: (isDark: boolean) => void;
}

export default function ThemeToggle({ onThemeChange }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
    onThemeChange?.(isDarkMode);

    // Ensure proper class is set
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [onThemeChange]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    onThemeChange?.(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`group relative p-3 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 ${isDark
        ? 'bg-white/10 border border-white/20 hover:bg-white/20'
        : 'bg-gray-100/80 border border-gray-200 hover:bg-gray-200/80'
        }`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6">
        <Sun className={`absolute inset-0 w-6 h-6 text-amber-400 transition-all duration-500 ${isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`} />
        <Moon className={`absolute inset-0 w-6 h-6 text-blue-300 transition-all duration-500 ${isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`} />
      </div>
    </button>
  );
}
