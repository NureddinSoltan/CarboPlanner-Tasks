'use client';

import { useState, useMemo } from 'react';
import { Item, FilterConfig, SortConfig, SortField, SortDirection } from '@/types';
import { filterItems, sortItems, getNextSortDirection, formatKcal, formatTags, capitalize } from '@/utils/tableUtils';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface DataTableProps {
  items: Item[];
  onRowClick: (item: Item) => void;
}

interface SortableHeaderProps {
  field: SortField;
  label: string;
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
}

function SortableHeader({ field, label, sortConfig, onSort }: SortableHeaderProps) {
  const isActive = sortConfig.field === field;

  return (
    <TableHead
      className="cursor-pointer hover:bg-muted/50 focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring"
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
        <span>{label}</span>
        {isActive && (
          <span className="text-primary" aria-hidden="true">
            {sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </span>
        )}
      </div>
    </TableHead>
  );
}

export default function DataTable({ items, onRowClick }: DataTableProps) {
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
    <Card className="glass-card hover-lift">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Items</CardTitle>
        <CardDescription className="text-base">
          Filter and sort through your meals and training sessions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1 space-y-2">
            <label htmlFor="search" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Search
            </label>
            <Input
              id="search"
              type="text"
              placeholder="Search by title or tags..."
              value={filterConfig.searchText}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-label="Search items by title or tags"
              className="search-input"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="type-filter" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Type
            </label>
            <Select value={filterConfig.typeFilter} onValueChange={handleTypeFilterChange}>
              <SelectTrigger id="type-filter" className="w-[180px]" aria-label="Filter by item type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="meal">Meals</SelectItem>
                <SelectItem value="training">Training</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredAndSortedItems.length} of {items.length} items
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border/50 overflow-hidden shadow-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <SortableHeader
                  field="title"
                  label="Title"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="type"
                  label="Type"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="kcal"
                  label="Calories"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <TableHead className="font-semibold">Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    No items found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className="table-row-hover cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                    onClick={() => onRowClick(item)}
                    tabIndex={0}
                    role="row"
                    aria-label={`Item: ${item.title}, Type: ${item.type}, Calories: ${item.kcal}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onRowClick(item);
                      }
                    }}
                  >
                    <TableCell className="font-semibold text-foreground">
                      {item.title}
                    </TableCell>
                    <TableCell>
                      <span className={item.type === 'meal' ? 'meal-badge' : 'training-badge'}>
                        {capitalize(item.type)}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {formatKcal(item.kcal)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatTags(item.tags)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}