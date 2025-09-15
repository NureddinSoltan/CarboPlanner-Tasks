'use client';

import { useState, useEffect } from 'react';
import { Item } from '@/types';
import { loadItemsData } from '@/lib/data';
import DataTable from '@/components/DataTable';
import ItemDetailModal from '@/components/ItemDetailModal';
import ThemeToggle from '@/components/ThemeToggle';
import StatusCards from '@/components/StatusCards';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertCircle } from 'lucide-react';

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await loadItemsData();
        setItems(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    fetchData();
  }, []);

  const handleRowClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <Card className="w-96 simple-card simple-hover animate-fade-in">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-6" />
            <p className="text-muted-foreground text-lg">Loading data...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <Card className="w-96 simple-card simple-hover animate-fade-in">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle className="h-10 w-10 text-destructive mb-6" />
            <h2 className="text-xl font-bold mb-3">Error</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => window.location.reload()} className="simple-hover">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 ${isDark
      ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
      : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${isDark ? 'bg-purple-500/10' : 'bg-purple-400/20'
          }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${isDark ? 'bg-blue-500/10' : 'bg-blue-400/20'
          }`} style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 container mx-auto py-12 px-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-12 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
          <div className="space-y-4">
            <h1 className={`text-6xl font-bold tracking-tight bg-gradient-to-r ${isDark
              ? 'from-white via-purple-200 to-blue-200'
              : 'from-gray-900 via-purple-600 to-blue-600'
              } bg-clip-text text-transparent`}>
              CarboPlanner
            </h1>
            <p className={`text-xl ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
              Luxury nutrition and fitness management
            </p>
          </div>
          <ThemeToggle onThemeChange={setIsDark} />
        </div>

        {/* Status Cards */}
        <StatusCards items={items} isDark={isDark} />

        {/* Data Table */}
        <div className="animate-fade-in-up" style={{ animationDelay: '800ms' }}>
          <DataTable items={items} onRowClick={handleRowClick} isDark={isDark} />
        </div>
      </div>

      <ItemDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isDark={isDark}
      />
    </div>
  );
}
