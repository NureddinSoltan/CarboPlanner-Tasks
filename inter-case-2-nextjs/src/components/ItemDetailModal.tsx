'use client';

import { Item } from '@/types';
import { formatKcal, formatTags, capitalize } from '@/utils/tableUtils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ItemDetailModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ItemDetailModal({ item, isOpen, onClose }: ItemDetailModalProps) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] glass-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold title-gradient">{item.title}</DialogTitle>
          <DialogDescription className="text-base">
            Detailed information about this item
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">
                ID
              </label>
              <p className="text-sm text-muted-foreground font-mono bg-muted/50 p-2 rounded">{item.id}</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">
                Type
              </label>
              <div>
                <span className={item.type === 'meal' ? 'meal-badge' : 'training-badge'}>
                  {capitalize(item.type)}
                </span>
              </div>
            </div>

            <div className="space-y-3 col-span-2">
              <label className="text-sm font-semibold text-foreground">
                Calories
              </label>
              <p className="text-lg font-bold text-primary bg-primary/10 p-3 rounded-lg text-center">
                {formatKcal(item.kcal)}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {item.tags.length > 0 ? (
                item.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs hover-lift bg-accent/50 border-primary/20">
                    {tag}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">No tags</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}