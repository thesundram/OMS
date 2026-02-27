'use client';

import React from 'react';
import { Order } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, CheckCircle, Clock, Truck, Package, XCircle, RotateCcw } from 'lucide-react';

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

export function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'returned':
        return <RotateCcw className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-red-100 text-red-800 border-red-300',
      processing: 'bg-blue-100 text-blue-800 border-blue-300',
      shipped: 'bg-orange-100 text-orange-800 border-orange-300',
      delivered: 'bg-green-100 text-green-800 border-green-300',
      cancelled: 'bg-amber-100 text-amber-800 border-amber-300',
      returned: 'bg-slate-100 text-slate-800 border-slate-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStatusCircleColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-red-500 border-red-600',
      processing: 'bg-blue-500 border-blue-600',
      shipped: 'bg-orange-500 border-orange-600',
      delivered: 'bg-green-500 border-green-600',
      cancelled: 'bg-amber-600 border-amber-700',
      returned: 'bg-slate-600 border-slate-700',
    };
    return colors[status] || 'bg-gray-500 border-gray-600';
  };

  const getTimelineLineColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-red-500',
      processing: 'bg-blue-500',
      shipped: 'bg-orange-500',
      delivered: 'bg-green-500',
      cancelled: 'bg-amber-600',
      returned: 'bg-slate-600',
    };
    return colors[status] || 'bg-gray-500';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const allStatuses = [
    { status: 'pending', label: 'Order Placed', icon: Clock },
    { status: 'processing', label: 'Processing', icon: Package },
    { status: 'shipped', label: 'Shipped', icon: Truck },
    { status: 'delivered', label: 'Delivered', icon: CheckCircle },
    { status: 'cancelled', label: 'Cancelled', icon: XCircle },
    { status: 'returned', label: 'Returned', icon: RotateCcw },
  ];

  const getStatusIndex = (status: string) => {
    return allStatuses.findIndex((s) => s.status === status);
  };

  const currentStatusIndex = getStatusIndex(order.status);

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 overflow-auto">
      <div className="flex items-center justify-center min-h-screen w-full">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b">
            <div>
              <CardTitle className="text-2xl">{order.orderNumber}</CardTitle>
              <CardDescription className="mt-2">
                Order placed on {formatDate(order.createdDate)}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 hover:bg-destructive/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-8 pt-6">
            {/* Order Status Timeline */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Order Status Progress</h3>
              <div className="space-y-4">
                {allStatuses.map((step, index) => {
                  const isCompleted = index <= currentStatusIndex;
                  const isCurrent = index === currentStatusIndex;
                  const StatusIcon = step.icon;
                  const stepHistory = order.statusHistory.find((s) => s.status === step.status);

                  return (
                    <div key={step.status} className="flex gap-4">
                      {/* Timeline dot and line */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                            isCompleted
                              ? `${getStatusCircleColor(step.status)} text-white`
                              : 'bg-muted border-muted-foreground text-muted-foreground'
                          } ${isCurrent ? 'ring-4 ring-opacity-25' : ''}`}
                          style={isCurrent ? { boxShadow: `0 0 0 4px rgba(${step.status === 'pending' ? '239, 68, 68' : step.status === 'processing' ? '59, 130, 246' : step.status === 'shipped' ? '249, 115, 22' : '34, 197, 94'}, 0.25)` } : {}}
                        >
                          <StatusIcon className="w-5 h-5" />
                        </div>
                        {index < allStatuses.length - 1 && (
                          <div
                            className={`w-1 h-12 transition-all ${
                              isCompleted ? getTimelineLineColor(order.statusHistory[index]?.status || step.status) : 'bg-muted'
                            }`}
                          />
                        )}
                      </div>

                      {/* Status info */}
                      <div className="flex-1 pt-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{step.label}</h4>
                          {isCompleted && (
                            <Badge variant="outline" className="text-xs">
                              Completed
                            </Badge>
                          )}
                          {isCurrent && (
                            <Badge className="text-xs">Current</Badge>
                          )}
                        </div>
                        {stepHistory ? (
                          <p className="text-sm text-muted-foreground mt-1">
                            {stepHistory.description}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground mt-1">Pending</p>
                        )}
                        {stepHistory && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(stepHistory.timestamp)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Order Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Status</p>
                    <Badge variant="outline" className={`mt-1 capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Customer Type</p>
                    <p className="font-medium capitalize">{order.customerType === 'dealer' ? 'Dealer' : 'E-Customer'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="font-semibold text-lg">₹{order.totalAmount.toLocaleString()}</p>
                  </div>
                  {order.trackingNumber && (
                    <div>
                      <p className="text-sm text-muted-foreground">Tracking Number</p>
                      <p className="font-mono text-sm">{order.trackingNumber}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer Name</p>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-sm">{order.email}</p>
                  </div>
                  {order.shippingAddress && (
                    <div>
                      <p className="text-sm text-muted-foreground">Shipping Address</p>
                      <p className="text-sm">{order.shippingAddress}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Order Items ({order.items.length})</h3>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} × ₹{item.unitPrice}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{(item.quantity * item.unitPrice).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 border-t pt-6">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Close
              </Button>
              <Button className="flex-1">Print Details</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
