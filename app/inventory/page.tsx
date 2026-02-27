'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, AlertTriangle, TrendingUp, Edit2, Trash2 } from 'lucide-react';
import { mockInventory } from '@/lib/mock-data';

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  const filteredInventory = mockInventory.filter(item =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (currentStock: number, minimumStock: number) => {
    if (currentStock < minimumStock) {
      return { status: 'critical', color: 'destructive' as const, label: 'Low Stock' };
    } else if (currentStock < minimumStock * 1.5) {
      return { status: 'warning', color: 'outline' as const, label: 'Warning' };
    }
    return { status: 'healthy', color: 'default' as const, label: 'In Stock' };
  };

  const lowStockCount = mockInventory.filter(i => i.currentStock < i.minimumStock).length;
  const totalItems = mockInventory.length;
  const avgUtilization = Math.round(
    mockInventory.reduce((acc, item) => acc + (item.currentStock / item.maximumStock) * 100, 0) / totalItems
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Inventory Management</h1>
            <p className="text-muted-foreground mt-1">Track stock levels and manage inventory</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalItems}</div>
              <p className="text-xs text-muted-foreground">Products in inventory</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{lowStockCount}</div>
              <p className="text-xs text-orange-700">Below minimum level</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgUtilization}%</div>
              <p className="text-xs text-muted-foreground">Capacity usage</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and View Toggle */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => setViewMode('grid')}
                  size="sm"
                >
                  Grid View
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  onClick={() => setViewMode('table')}
                  size="sm"
                >
                  Table View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid View - Inventory Cards */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInventory.map((item) => {
              const stockStatus = getStockStatus(item.currentStock, item.minimumStock);
              const utilizationPercent = Math.round((item.currentStock / item.maximumStock) * 100);
              return (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Product Image */}
                  <div className="relative w-full h-64 bg-muted overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-foreground">{item.productName}</CardTitle>
                        <CardDescription className="mt-1">{item.unit}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {stockStatus.status === 'critical' && (
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        )}
                        <Badge variant={stockStatus.color}>
                          {stockStatus.label}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Stock Information */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Current Stock</span>
                        <span className={`text-lg font-bold ${stockStatus.status === 'critical' ? 'text-red-600' : 'text-foreground'}`}>
                          {item.currentStock}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Min: {item.minimumStock}</span>
                        <span className="text-muted-foreground">Max: {item.maximumStock}</span>
                      </div>
                    </div>

                    {/* Utilization Progress */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Capacity</span>
                        <span className="text-sm font-semibold text-primary">{utilizationPercent}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-full rounded-full transition-all ${
                            utilizationPercent < 50
                              ? 'bg-green-500'
                              : utilizationPercent < 80
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Reorder Level */}
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm text-muted-foreground">Reorder Level</span>
                      <span className="text-sm font-semibold text-foreground">{item.reorderLevel}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="ghost" size="sm" className="flex-1 gap-1 text-xs">
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 gap-1 text-xs text-destructive">
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Table View - Inventory Table */}
        {viewMode === 'table' && (
          <Card>
            <CardHeader>
              <CardTitle>Inventory Levels ({filteredInventory.length})</CardTitle>
              <CardDescription>Current stock information for all products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-sm text-muted-foreground">
                      <th className="text-left py-3 px-4">Product Name</th>
                      <th className="text-left py-3 px-4">Current Stock</th>
                      <th className="text-left py-3 px-4">Min Level</th>
                      <th className="text-left py-3 px-4">Max Level</th>
                      <th className="text-left py-3 px-4">Reorder Level</th>
                      <th className="text-left py-3 px-4">Unit</th>
                      <th className="text-left py-3 px-4">Utilization</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => {
                      const stockStatus = getStockStatus(item.currentStock, item.minimumStock);
                      const utilizationPercent = Math.round((item.currentStock / item.maximumStock) * 100);
                      return (
                        <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4 font-medium">{item.productName}</td>
                          <td className={`py-3 px-4 font-semibold ${stockStatus.status === 'critical' ? 'text-red-600' : ''}`}>
                            {item.currentStock}
                          </td>
                          <td className="py-3 px-4 text-sm">{item.minimumStock}</td>
                          <td className="py-3 px-4 text-sm">{item.maximumStock}</td>
                          <td className="py-3 px-4 text-sm">{item.reorderLevel}</td>
                          <td className="py-3 px-4 text-sm">{item.unit}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-12 bg-muted rounded h-1.5">
                                <div
                                  className={`h-full rounded transition-all ${
                                    utilizationPercent < 50
                                      ? 'bg-green-500'
                                      : utilizationPercent < 80
                                      ? 'bg-yellow-500'
                                      : 'bg-red-500'
                                  }`}
                                  style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
                                />
                              </div>
                              <span className="text-xs font-semibold">{utilizationPercent}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {stockStatus.status === 'critical' && (
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                              )}
                              <Badge variant={stockStatus.color}>
                                {stockStatus.label}
                              </Badge>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="text-xs gap-1">
                                <Edit2 className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-xs text-destructive gap-1">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredInventory.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No inventory items found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
