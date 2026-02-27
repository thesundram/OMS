'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Star, Mail, Phone, X, Edit2, Save } from 'lucide-react';
import { mockSuppliers } from '@/lib/mock-data';
import type { Supplier } from '@/lib/mock-data';

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Supplier | null>(null);

  const filteredSuppliers = mockSuppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewSupplier = (supplier: Supplier) => {
    console.log('[v0] View Supplier clicked:', supplier.name);
    setSelectedSupplier(supplier);
    setEditData({ ...supplier });
    setIsEditing(false);
  };

  const handleEditChange = (field: keyof Supplier, value: any) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: value,
      });
    }
  };

  const handleSaveChanges = () => {
    // In a real app, this would update the database
    if (editData) {
      setSelectedSupplier(editData);
      setIsEditing(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedSupplier(null);
    setEditData(null);
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Suppliers</h1>
            <p className="text-muted-foreground mt-1">Manage supplier information and relationships</p>
          </div>
          <Button className="gap-2 w-full md:w-auto">
            <Plus className="w-4 h-4" />
            Add Supplier
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockSuppliers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">High Rated (&ge;4.5)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockSuppliers.filter(s => s.rating >= 4.5).length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(
                mockSuppliers.reduce((acc, s) => acc + s.rating, 0) / mockSuppliers.length
              ).toFixed(1)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by supplier name, contact person, or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Suppliers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Supplier List ({filteredSuppliers.length})</CardTitle>
            <CardDescription>All supplier information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">{supplier.name}</TableCell>
                      <TableCell>{supplier.contactPerson}</TableCell>
                      <TableCell>
                        <a href={`mailto:${supplier.email}`} className="text-blue-600 hover:underline flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {supplier.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        <a href={`tel:${supplier.phone}`} className="text-blue-600 hover:underline flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {supplier.phone}
                        </a>
                      </TableCell>
                      <TableCell>{supplier.city}, {supplier.state}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {supplier.products.length} products
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{supplier.rating.toFixed(1)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs gap-1"
                          onClick={() => handleViewSupplier(supplier)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredSuppliers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No suppliers found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Supplier Detail Modal */}
      {selectedSupplier && editData && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 overflow-auto">
          <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-2xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Supplier Details</CardTitle>
                  <CardDescription className="mt-1">{selectedSupplier.name}</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCloseModal}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent className="space-y-6 max-h-[calc(90vh-200px)] overflow-y-auto">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Supplier Name</label>
                    {isEditing ? (
                      <Input
                        value={editData.name}
                        onChange={(e) => handleEditChange('name', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-foreground">{editData.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Contact Person</label>
                    {isEditing ? (
                      <Input
                        value={editData.contactPerson}
                        onChange={(e) => handleEditChange('contactPerson', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-foreground">{editData.contactPerson}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleEditChange('email', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-blue-600">{editData.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    {isEditing ? (
                      <Input
                        value={editData.phone}
                        onChange={(e) => handleEditChange('phone', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-blue-600">{editData.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Street Address</label>
                    {isEditing ? (
                      <Input
                        value={editData.address}
                        onChange={(e) => handleEditChange('address', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-foreground">{editData.address}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">City</label>
                    {isEditing ? (
                      <Input
                        value={editData.city}
                        onChange={(e) => handleEditChange('city', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-foreground">{editData.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">State</label>
                    {isEditing ? (
                      <Input
                        value={editData.state}
                        onChange={(e) => handleEditChange('state', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-foreground">{editData.state}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Zip Code</label>
                    {isEditing ? (
                      <Input
                        value={editData.zipCode}
                        onChange={(e) => handleEditChange('zipCode', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-foreground">{editData.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Products & Rating */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Products & Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Products Supplied</label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {editData.products.map((product) => (
                        <Badge key={product} variant="outline">{product}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Rating</label>
                    {isEditing ? (
                      <Input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={editData.rating}
                        onChange={(e) => handleEditChange('rating', parseFloat(e.target.value))}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{editData.rating.toFixed(1)}/5.0</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {!isEditing ? (
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    className="gap-2 flex-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Information
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={handleSaveChanges} 
                      className="gap-2 flex-1"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditData(selectedSupplier);
                        setIsEditing(false);
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </>
                )}
                <Button 
                  variant="outline" 
                  onClick={handleCloseModal}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
