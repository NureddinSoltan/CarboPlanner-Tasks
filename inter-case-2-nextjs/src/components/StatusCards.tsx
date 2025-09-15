'use client';

import { Item } from '@/types';
import { Utensils, Dumbbell, Hash, Flame } from 'lucide-react';

interface StatusCardsProps {
  items: Item[];
  isDark?: boolean;
}

export default function StatusCards({ items, isDark = true }: StatusCardsProps) {
  const mealCount = items.filter(item => item.type === 'meal').length;
  const trainingCount = items.filter(item => item.type === 'training').length;
  const totalItems = items.length;
  const totalCalories = items.reduce((sum, item) => sum + item.kcal, 0);

  const stats = [
    {
      title: 'Total Meals',
      value: mealCount,
      icon: Utensils,
      type: 'meal',
      description: 'Meal items'
    },
    {
      title: 'Training Sessions',
      value: trainingCount,
      icon: Dumbbell,
      type: 'training',
      description: 'Workout items'
    },
    {
      title: 'Total Items',
      value: totalItems,
      icon: Hash,
      type: 'total',
      description: 'All items'
    },
    {
      title: 'Total Calories',
      value: `${totalCalories.toLocaleString()} kcal`,
      icon: Flame,
      type: 'calories',
      description: 'Combined calories'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className={`group relative overflow-hidden rounded-3xl backdrop-blur-xl p-8 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 animate-fade-in-up shadow-lg ${isDark
              ? 'bg-white/10 border border-white/20 hover:bg-white/15 hover:shadow-xl'
              : 'bg-white/90 border border-gray-200 hover:bg-white hover:shadow-xl hover:border-gray-300'
              }`}
            style={{ animationDelay: `${200 + index * 150}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.type === 'meal' ? 'from-emerald-400 to-teal-600' :
                  stat.type === 'training' ? 'from-violet-400 to-purple-600' :
                    stat.type === 'total' ? 'from-blue-400 to-indigo-600' :
                      'from-orange-400 to-red-500'
                  } shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <p className={`text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                <p className={`text-lg font-semibold ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{stat.title}</p>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>View details</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
