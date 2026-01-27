import { FilterOptions, TechStack } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { mockCohorts, techStackOptions } from '@/data/mockData';

interface ProjectFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export function ProjectFilters({ filters, onFilterChange }: ProjectFiltersProps) {
  const hasActiveFilters = filters.cohort || filters.techStack || filters.search;

  const clearFilters = () => {
    onFilterChange({ cohort: '', techStack: '', search: '' });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="pl-9"
        />
      </div>
      
      <Select
        value={filters.cohort}
        onValueChange={(value) => onFilterChange({ ...filters, cohort: value === 'all' ? '' : value })}
      >
        <SelectTrigger className="w-full sm:w-[160px] bg-card">
          <SelectValue placeholder="All Cohorts" />
        </SelectTrigger>
        <SelectContent className="bg-popover border border-border">
          <SelectItem value="all">All Cohorts</SelectItem>
          {mockCohorts.map((cohort) => (
            <SelectItem key={cohort.id} value={cohort.name}>
              {cohort.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select
        value={filters.techStack}
        onValueChange={(value) => onFilterChange({ ...filters, techStack: value === 'all' ? '' : value as TechStack })}
      >
        <SelectTrigger className="w-full sm:w-[160px] bg-card">
          <SelectValue placeholder="All Tech" />
        </SelectTrigger>
        <SelectContent className="bg-popover border border-border">
          <SelectItem value="all">All Tech</SelectItem>
          {techStackOptions.map((tech) => (
            <SelectItem key={tech} value={tech}>
              {tech}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="ghost" size="icon" onClick={clearFilters} className="shrink-0">
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
