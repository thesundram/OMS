'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Warehouse, 
  Truck, 
  Users, 
  UserCheck,
  Menu,
  X,
  LogOut,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: string[];
}

export function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      roles: ['admin', 'manager', 'dealer', 'e-customer', 'staff'],
    },
    {
      label: 'Order Management',
      href: '/orders',
      icon: <ShoppingCart className="w-5 h-5" />,
      roles: ['admin', 'manager', 'dealer', 'e-customer', 'staff'],
    },
    {
      label: 'Products',
      href: '/products',
      icon: <Package className="w-5 h-5" />,
      roles: ['admin', 'manager', 'staff', 'dealer', 'e-customer'],
    },
    {
      label: 'Inventory',
      href: '/inventory',
      icon: <Warehouse className="w-5 h-5" />,
      roles: ['admin', 'manager', 'staff', 'dealer', 'e-customer'],
    },
    {
      label: 'Suppliers',
      href: '/suppliers',
      icon: <Truck className="w-5 h-5" />,
      roles: ['admin', 'manager', 'staff', 'dealer', 'e-customer'],
    },
    {
      label: 'Dealers',
      href: '/dealers',
      icon: <Users className="w-5 h-5" />,
      roles: ['admin', 'manager', 'staff', 'dealer', 'e-customer'],
    },
    {
      label: 'E-Customers',
      href: '/customers',
      icon: <UserCheck className="w-5 h-5" />,
      roles: ['admin', 'manager', 'staff', 'dealer', 'e-customer'],
    },
  ];

  const filteredItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-primary-foreground"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-card text-foreground border-r border-border transition-all duration-300 z-40 ${
          isOpen ? 'w-64' : 'w-0 overflow-hidden lg:w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Branding Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 ring-2 ring-primary/20">
                <Image
                  src="/logo.jpg"
                  alt="OMS Logo"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-primary leading-tight">OMS</h1>
                <p className="text-xs text-muted-foreground">Order Management</p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed pl-1">
              <p className="font-medium text-foreground mb-0.5">Designed by</p>
              <p className="font-semibold">Uttam Innovative Solution</p>
            </div>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {filteredItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent text-foreground'
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-border space-y-4">
            {/* User Info */}
            <div>
              <p className="text-sm text-muted-foreground">Logged in as</p>
              <p className="font-semibold text-foreground truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
