'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Mail, Phone, CheckCircle } from 'lucide-react';
import { mockDealers } from '@/lib/mock-data';

export default function DealersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDealers = mockDealers.filter(dealer =>
    dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dealer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dealer.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeDealers = mockDealers.filter(d => d.status === 'active').length;
  const totalOrders = mockDealers.reduce((acc, d) => acc + d.totalOrders, 0);
  const avgOrders = Math.round(totalOrders / mockDealers.length);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, 'default' | 'destructive' | 'outline' | 'secondary'> = {
      active: 'default',
      inactive: 'outline',
      suspended: 'destructive',
    };
    return colors[status] || 'default';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Dealers & Dermatologists</h1>
            <p className="text-muted-foreground mt-1">Manage dealer and dermatologist accounts</p>
          </div>
          <Button className="gap-2 w-full md:w-auto">
            <Plus className="w-4 h-4" />
            Add Dealer
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Dealers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockDealers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Dealers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeDealers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Orders/Dealer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgOrders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by dealer name, email, or license number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Dealers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Dealer List ({filteredDealers.length})</CardTitle>
            <CardDescription>Active dealers and dermatologists</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dealer Name</TableHead>
                    <TableHead>License #</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Total Orders</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDealers.map((dealer) => (
                    <TableRow key={dealer.id}>
                      <TableCell className="font-medium">{dealer.name}</TableCell>
                      <TableCell className="font-mono text-sm">{dealer.licenseNumber}</TableCell>
                      <TableCell>
                        <a href={`mailto:${dealer.email}`} className="text-blue-600 hover:underline flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {dealer.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        <a href={`tel:${dealer.phone}`} className="text-blue-600 hover:underline flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {dealer.phone}
                        </a>
                      </TableCell>
                      <TableCell>{dealer.city}, {dealer.state}</TableCell>
                      <TableCell>{formatDate(dealer.joinDate)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{dealer.totalOrders}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(dealer.status)} className="capitalize flex items-center gap-1 w-fit">
                          {dealer.status === 'active' && <CheckCircle className="w-3 h-3" />}
                          {dealer.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredDealers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No dealers found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
