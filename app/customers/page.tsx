'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Mail, Phone, TrendingUp } from 'lucide-react';
import { mockECustomers } from '@/lib/mock-data';

export default function ECustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = mockECustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const totalCustomers = mockECustomers.length;
  const totalRevenue = mockECustomers.reduce((acc, c) => acc + c.totalSpent, 0);
  const avgSpending = Math.round(totalRevenue / totalCustomers);

  const formatDate = (date: Date | null) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent > 4000) return { tier: 'Premium', color: 'default' as const };
    if (totalSpent > 2000) return { tier: 'Gold', color: 'secondary' as const };
    return { tier: 'Regular', color: 'outline' as const };
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground">E-Customers</h1>
            <p className="text-muted-foreground mt-1">Manage online retail customers</p>
          </div>
          <Button className="gap-2 w-full md:w-auto">
            <Plus className="w-4 h-4" />
            Add Customer
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{avgSpending}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer name, email, or phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer List ({filteredCustomers.length})</CardTitle>
            <CardDescription>Online retail customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Total Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead>Tier</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => {
                    const tier = getCustomerTier(customer.totalSpent);
                    return (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>
                          <a href={`mailto:${customer.email}`} className="text-blue-600 hover:underline flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {customer.email}
                          </a>
                        </TableCell>
                        <TableCell>
                          <a href={`tel:${customer.phone}`} className="text-blue-600 hover:underline flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {customer.phone}
                          </a>
                        </TableCell>
                        <TableCell>{customer.city}, {customer.state}</TableCell>
                        <TableCell>{formatDate(customer.registrationDate)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{customer.totalOrders}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">₹{customer.totalSpent.toLocaleString()}</TableCell>
                        <TableCell>{formatDate(customer.lastOrderDate)}</TableCell>
                        <TableCell>
                          <Badge variant={tier.color} className="flex items-center gap-1 w-fit">
                            <TrendingUp className="w-3 h-3" />
                            {tier.tier}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {filteredCustomers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No customers found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
