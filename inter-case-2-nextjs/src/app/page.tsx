'use client';

import { useState, useEffect } from 'react';
import { Item } from '@/types';
import { loadItemsData } from '@/lib/data';
import DataTable from '@/components/DataTable';
import ItemDetailModal from '@/components/ItemDetailModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertCircle } from 'lucide-react';

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <Card className="w-96 glass-card hover-lift animate-fade-in-up">
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
        <Card className="w-96 glass-card hover-lift animate-fade-in-up">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle className="h-10 w-10 text-destructive mb-6" />
            <h2 className="text-xl font-bold mb-3">Error</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => window.location.reload()} className="hover-lift">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold tracking-tight title-gradient mb-2">CarboPlanner Items</h1>
          <p className="text-muted-foreground text-lg">
            Filter and sort through your meals and training sessions
          </p>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <DataTable items={items} onRowClick={handleRowClick} />
        </div>
      </div>

      <ItemDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
