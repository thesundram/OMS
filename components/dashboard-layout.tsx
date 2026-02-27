'use client';

import React from 'react';
import { Sidebar } from '@/components/sidebar';
import { Footer } from '@/components/footer';
import { useAuth } from '@/contexts/auth-context';
import { redirect } from 'next/navigation';

export function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto pl-0 lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">
          {children}
        </div>
        <div className="container mx-auto px-4 mb-4">
          <Footer />
        </div>
      </main>
    </div>
  );
}
