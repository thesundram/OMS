'use client';

import React from 'react';
import { useTheme, ThemeType } from '@/contexts/theme-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';

const themes: { value: ThemeType; label: string; description: string }[] = [
  { value: 'ocean-blue', label: 'Ocean Blue', description: 'Professional ocean blue and white' },
  { value: 'soft-pink', label: 'Soft Pink', description: 'Gentle pink and white aesthetic' },
  { value: 'gen-z-green', label: 'Gen-Z Green', description: 'Vibrant green theme' },
  { value: 'matcha-mochi', label: 'Matcha Mochi', description: 'Serene matcha green theme' },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        onClick={(e) => e.preventDefault()}
        asChild
      >
        <button className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          <span className="hidden md:inline text-xs">Theme</span>
        </button>
      </Button>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((t) => (
          <DropdownMenuCheckboxItem
            key={t.value}
            checked={theme === t.value}
            onCheckedChange={() => setTheme(t.value)}
            className="cursor-pointer"
          >
            <div>
              <p className="font-medium text-sm">{t.label}</p>
              <p className="text-xs text-muted-foreground">{t.description}</p>
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
