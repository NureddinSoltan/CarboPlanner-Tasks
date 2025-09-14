'use client';

import { useState, useMemo } from 'react';
import { Item, FilterConfig, SortConfig, SortField, SortDirection } from '@/types';
import { filterItems, sortItems, getNextSortDirection, formatKcal, formatTags, capitalize } from '@/utils/tableUtils';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronUp, ChevronDown, Search, Filter } from 'lucide-react';

interface DataTableProps {
  items: Item[];
  onRowClick: (item: Item) => void;
  isDark?: boolean;
}

interface SortableHeaderProps {
  field: SortField;
  label: string;
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
  isDark?: boolean;
}

function SortableHeader({ field, label, sortConfig, onSort, isDark = true }: SortableHeaderProps) {
  const isActive = sortConfig.field === field;

  return (
    <th
      className="text-left p-6 cursor-pointer hover:bg-white/5 transition-colors duration-200"
      onClick={() => onSort(field)}
      tabIndex={0}
      role="columnheader"
      aria-sort={isActive ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
      aria-label={`Sort by ${label}${isActive ? ` (currently ${sortConfig.direction === 'asc' ? 'ascending' : 'descending'})` : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSort(field);
        }
      }}
    >
      <div className="flex items-center space-x-2">
        <span className={`font-semibold ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{label}</span>
        {isActive && (
          <span className={isDark ? 'text-white/70' : 'text-gray-600'}>
            {sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </span>
        )}
      </div>
    </th>
  );
}

export default function DataTable({ items, onRowClick, isDark = true }: DataTableProps) {
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    searchText: '',
    typeFilter: 'all'
  });

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'title',
    direction: 'asc'
  });

  const filteredAndSortedItems = useMemo(() => {
    const filtered = filterItems(items, filterConfig);
    return sortItems(filtered, sortConfig);
  }, [items, filterConfig, sortConfig]);

  const handleSort = (field: SortField) => {
    setSortConfig(prev => ({
      field,
      direction: getNextSortDirection(prev.field, prev.direction, field)
    }));
  };

  const handleSearchChange = (value: string) => {
    setFilterConfig(prev => ({ ...prev, searchText: value }));
  };

  const handleTypeFilterChange = (value: string) => {
    setFilterConfig(prev => ({
      ...prev,
      typeFilter: value === 'all' ? 'all' : value as 'meal' | 'training'
    }));
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative">
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/50' : 'text-gray-600'}`} />
          <input
            type="text"
            placeholder="Search by title or tags..."
            value={filterConfig.searchText}
            onChange={(e) => handleSearchChange(e.target.value)}
            className={`w-full pl-12 pr-4 py-4 backdrop-blur-xl rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${isDark
              ? 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-white/30 focus:bg-white/15'
              : 'bg-white/20 border border-white/30 text-gray-900 placeholder-gray-600 focus:ring-white/40 focus:bg-white/25'
              }`}
          />
        </div>

        <div className="relative">
          <select
            value={filterConfig.typeFilter}
            onChange={(e) => handleTypeFilterChange(e.target.value)}
            className={`appearance-none backdrop-blur-xl rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:ring-2 transition-all duration-300 min-w-[200px] ${isDark
              ? 'bg-white/10 border border-white/20 text-white focus:ring-white/30 focus:bg-white/15 [&>option]:bg-slate-800 [&>option]:text-white'
              : 'bg-white/20 border border-white/30 text-gray-900 focus:ring-white/40 focus:bg-white/25 [&>option]:bg-white [&>option]:text-gray-900'
              }`}
            style={{
              colorScheme: isDark ? 'dark' : 'light'
            }}
          >
            <option value="all">All Types</option>
            <option value="meal">Meals</option>
            <option value="training">Training</option>
          </select>
          <Filter className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-white/50' : 'text-gray-600'}`} />
        </div>
      </div>

      {/* Results count */}
      <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
        Showing {filteredAndSortedItems.length} of {items.length} items
      </p>

      {/* Table */}
      <div className={`backdrop-blur-xl rounded-3xl overflow-hidden ${isDark
        ? 'bg-white/5 border border-white/20'
        : 'bg-white/10 border border-white/30'
        }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <SortableHeader
                  field="title"
                  label="Title"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  isDark={isDark}
                />
                <SortableHeader
                  field="type"
                  label="Type"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  isDark={isDark}
                />
                <SortableHeader
                  field="kcal"
                  label="Calories"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  isDark={isDark}
                />
                <th className={`text-left p-6 font-semibold ${isDark ? 'text-white/90' : 'text-gray-800'}`}>Tags</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedItems.length === 0 ? (
                <tr>
                  <td colSpan={4} className={`text-center py-12 ${isDark ? 'text-white/50' : 'text-gray-600'}`}>
                    No items found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredAndSortedItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-white/5 cursor-pointer transition-all duration-200 border-t border-white/10"
                    onClick={() => onRowClick(item)}
                  >
                    <td className="p-6">
                      <p className={`font-semibold transition-colors duration-200 ${isDark
                        ? 'text-white group-hover:text-white/90'
                        : 'text-gray-900 group-hover:text-gray-700'
                        }`}>
                        {item.title}
                      </p>
                    </td>
                    <td className="p-6">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${item.type === 'meal'
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-600'
                        : 'bg-gradient-to-r from-violet-400 to-purple-600'
                        }`}>
                        {capitalize(item.type)}
                      </span>
                    </td>
                    <td className="p-6">
                      <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.kcal} kcal</p>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span key={tagIndex} className={`px-2 py-1 text-xs rounded-full ${isDark
                            ? 'bg-white/20 text-white/70'
                            : 'bg-gray-200 text-gray-700'
                            }`}>
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 2 && (
                          <span className={`px-2 py-1 text-xs rounded-full ${isDark
                            ? 'bg-white/20 text-white/70'
                            : 'bg-gray-200 text-gray-700'
                            }`}>
                            +{item.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}