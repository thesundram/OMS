'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { StatCard } from '@/components/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { mockOrders, mockInventory } from '@/lib/mock-data';

export default function DashboardPage() {
  // Calculate stats
  const dealerOrders = mockOrders.filter(o => o.customerType === 'dealer').length;
  const eCustomerOrders = mockOrders.filter(o => o.customerType === 'e-customer').length;
  const totalOrders = mockOrders.length;
  const activeOrders = mockOrders.filter(o => o.status === 'processing' || o.status === 'pending').length;

  // Get pending orders from last 5 days
  const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
  const pendingOrdersLast5Days = mockOrders.filter(
    o => o.status === 'pending' && o.createdDate >= fiveDaysAgo
  ).sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());

  // Get low stock items (current stock below minimum)
  const lowStockAlerts = mockInventory.filter(
    item => item.currentStock < item.minimumStock
  );

  const getStatusColor = (status: string) => {
    const colors: Record<string, 'default' | 'destructive' | 'outline' | 'secondary'> = {
      pending: 'destructive',
      processing: 'outline',
      shipped: 'secondary',
      delivered: 'default',
      cancelled: 'destructive',
    };
    return colors[status] || 'default';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your Order Management System</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Dealer Orders"
            value={dealerOrders}
            icon={<Users className="w-4 h-4" />}
            description="Total orders from dealers"
            color="blue"
          />
          <StatCard
            title="E-Customer Orders"
            value={eCustomerOrders}
            icon={<ShoppingCart className="w-4 h-4" />}
            description="Total orders from e-customers"
            color="green"
          />
          <StatCard
            title="Total Orders"
            value={totalOrders}
            icon={<Package className="w-4 h-4" />}
            description="All orders in system"
            color="purple"
          />
          <StatCard
            title="Active Orders"
            value={activeOrders}
            icon={<TrendingUp className="w-4 h-4" />}
            description="Orders in progress"
            color="orange"
          />
        </div>

        {/* Pending Orders Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pending Orders (Last 5 Days)</CardTitle>
                <CardDescription>Recent orders awaiting processing</CardDescription>
              </div>
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {pendingOrdersLast5Days.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingOrdersLast5Days.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.orderNumber}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {order.customerType === 'dealer' ? 'Dealer' : 'E-Customer'}
                          </Badge>
                        </TableCell>
                        <TableCell>₹{order.totalAmount.toLocaleString()}</TableCell>
                        <TableCell>{formatDate(order.createdDate)}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(order.status)} className="capitalize">
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No pending orders in the last 5 days
              </div>
            )}
          </CardContent>
        </Card>

        {/* Low Stock Alert Section */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-orange-900">Low Stock Alerts</CardTitle>
                <CardDescription className="text-orange-700">
                  Products below minimum stock level
                </CardDescription>
              </div>
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            {lowStockAlerts.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Product</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Minimum Level</TableHead>
                      <TableHead>Difference</TableHead>
                      <TableHead>Reorder Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lowStockAlerts.map((item) => (
                      <TableRow key={item.id} className="hover:bg-orange-100">
                        <TableCell className="font-medium">{item.productName}</TableCell>
                        <TableCell>
                          <span className="text-red-600 font-semibold">{item.currentStock}</span>
                        </TableCell>
                        <TableCell>{item.minimumStock}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">
                            -{item.minimumStock - item.currentStock} units
                          </Badge>
                        </TableCell>
                        <TableCell>{item.reorderLevel}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-orange-700">
                All products are at or above minimum stock level
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
