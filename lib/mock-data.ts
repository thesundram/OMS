'use client';

export interface OrderStatus {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  timestamp: Date;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerType: 'dealer' | 'e-customer';
  customerName: string;
  email: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  createdDate: Date;
  items: OrderItem[];
  statusHistory: OrderStatus[];
  shippingAddress?: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  reorderLevel: number;
  unit: string;
  image: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  products: string[];
  rating: number;
}

export interface Dealer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  licenseNumber: string;
  joinDate: Date;
  totalOrders: number;
  status: 'active' | 'inactive' | 'suspended';
}

export interface ECustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  registrationDate: Date;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date | null;
}

// Mock data
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2025-001',
    customerType: 'dealer',
    customerName: 'Beauty Plus Store',
    email: 'beauty@plus.com',
    totalAmount: 5000,
    status: 'pending',
    createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    items: [
      { productId: '1', productName: 'Premium Cream', quantity: 50, unitPrice: 100 },
    ],
    shippingAddress: '100 Beauty Street, New York, NY 10001',
    trackingNumber: 'TRACK-2025-001',
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), description: 'Order placed' },
    ],
  },
  {
    id: '2',
    orderNumber: 'ORD-2025-002',
    customerType: 'e-customer',
    customerName: 'Sarah Johnson',
    email: 'sarah@email.com',
    totalAmount: 2500,
    status: 'processing',
    createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    items: [
      { productId: '2', productName: 'Face Serum', quantity: 10, unitPrice: 250 },
    ],
    shippingAddress: '101 Main Street, Boston, MA 02101',
    trackingNumber: 'TRACK-2025-002',
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), description: 'Order placed' },
      { status: 'processing', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), description: 'Order is being processed' },
    ],
  },
  {
    id: '3',
    orderNumber: 'ORD-2025-003',
    customerType: 'dealer',
    customerName: 'Glow Cosmetics',
    email: 'glow@cosmetics.com',
    totalAmount: 7500,
    status: 'pending',
    createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    items: [
      { productId: '3', productName: 'Lipstick Set', quantity: 25, unitPrice: 300 },
    ],
    shippingAddress: '200 Glamour Avenue, Miami, FL 33101',
    trackingNumber: 'TRACK-2025-003',
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), description: 'Order placed' },
    ],
  },
  {
    id: '4',
    orderNumber: 'ORD-2025-004',
    customerType: 'e-customer',
    customerName: 'Emily Davis',
    email: 'emily@email.com',
    totalAmount: 1800,
    status: 'shipped',
    createdDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    items: [
      { productId: '4', productName: 'Nail Polish Collection', quantity: 6, unitPrice: 300 },
    ],
    shippingAddress: '202 Oak Lane, Seattle, WA 98101',
    trackingNumber: 'TRACK-2025-004',
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), description: 'Order placed' },
      { status: 'processing', timestamp: new Date(Date.now() - 3.5 * 24 * 60 * 60 * 1000), description: 'Order is being processed' },
      { status: 'shipped', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), description: 'Package shipped' },
    ],
  },
  {
    id: '5',
    orderNumber: 'ORD-2025-005',
    customerType: 'dealer',
    customerName: 'Derma Care Center',
    email: 'derma@care.com',
    totalAmount: 4200,
    status: 'pending',
    createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    items: [
      { productId: '5', productName: 'Sunscreen SPF 50', quantity: 100, unitPrice: 42 },
    ],
    shippingAddress: '300 Medical Plaza, Chicago, IL 60601',
    trackingNumber: 'TRACK-2025-005',
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), description: 'Order placed' },
    ],
  },
  {
    id: '6',
    orderNumber: 'ORD-2025-006',
    customerType: 'e-customer',
    customerName: 'Michael Chen',
    email: 'michael@email.com',
    totalAmount: 3200,
    status: 'pending',
    createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    items: [
      { productId: '1', productName: 'Premium Cream', quantity: 32, unitPrice: 100 },
    ],
    shippingAddress: '303 Pine Road, San Francisco, CA 94101',
    trackingNumber: 'TRACK-2025-006',
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), description: 'Order placed' },
    ],
  },
  {
    id: '7',
    orderNumber: 'ORD-2025-007',
    customerType: 'dealer',
    customerName: 'Radiant Beauty',
    email: 'radiant@beauty.com',
    totalAmount: 6000,
    status: 'delivered',
    createdDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    items: [
      { productId: '2', productName: 'Face Serum', quantity: 24, unitPrice: 250 },
    ],
    shippingAddress: '400 Shine Boulevard, Los Angeles, CA 90001',
    trackingNumber: 'TRACK-2025-007',
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), description: 'Order placed' },
      { status: 'processing', timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), description: 'Order is being processed' },
      { status: 'shipped', timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), description: 'Package shipped' },
      { status: 'delivered', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), description: 'Package delivered' },
    ],
  },
  {
    id: '8',
    orderNumber: 'ORD-2025-008',
    customerType: 'e-customer',
    customerName: 'Jessica Martinez',
    email: 'jessica@email.com',
    totalAmount: 4500,
    status: 'processing',
    createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    items: [
      { productId: '3', productName: 'Lipstick Set', quantity: 15, unitPrice: 300 },
    ],
    shippingAddress: '404 Elm Street, Denver, CO 80201',
    trackingNumber: 'TRACK-2025-008',
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), description: 'Order placed' },
      { status: 'processing', timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), description: 'Order is being processed' },
    ],
  },
  {
    id: '9',
    orderNumber: 'ORD-2025-009',
    customerType: 'dealer',
    customerName: 'Elite Beauty Store',
    email: 'elite@beauty.com',
    totalAmount: 3500,
    status: 'cancelled',
    createdDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    items: [
      { productId: '4', productName: 'Nail Polish Collection', quantity: 10, unitPrice: 350 },
    ],
    shippingAddress: '505 Fashion Street, Chicago, IL 60601',
    trackingNumber: 'TRACK-2025-009',
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), description: 'Order placed' },
      { status: 'cancelled', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), description: 'Order cancelled by customer' },
    ],
  },
  {
    id: '10',
    orderNumber: 'ORD-2025-010',
    customerType: 'e-customer',
    customerName: 'Amanda Wilson',
    email: 'amanda@email.com',
    totalAmount: 2800,
    status: 'returned',
    createdDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    items: [
      { productId: '2', productName: 'Face Serum', quantity: 8, unitPrice: 350 },
    ],
    shippingAddress: '606 Garden Lane, Austin, TX 78701',
    trackingNumber: 'TRACK-2025-010',
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), description: 'Order placed' },
      { status: 'processing', timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), description: 'Order is being processed' },
      { status: 'shipped', timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), description: 'Package shipped' },
      { status: 'delivered', timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), description: 'Package delivered' },
      { status: 'returned', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), description: 'Product returned' },
    ],
  },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Cream',
    category: 'Face Care',
    price: 100,
    description: 'Luxury moisturizing cream for all skin types',
    image: '/products/cream.jpg',
  },
  {
    id: '2',
    name: 'Face Serum',
    category: 'Face Care',
    price: 250,
    description: 'Anti-aging facial serum with vitamin C',
    image: '/products/serum.jpg',
  },
  {
    id: '3',
    name: 'Lipstick Set',
    category: 'Makeup',
    price: 300,
    description: 'Premium lipstick collection - 6 shades',
    image: '/products/lipstick.jpg',
  },
  {
    id: '4',
    name: 'Nail Polish Collection',
    category: 'Makeup',
    price: 300,
    description: 'Professional nail polish set - 6 colors',
    image: '/products/nailpolish.jpg',
  },
  {
    id: '5',
    name: 'Sunscreen SPF 50',
    category: 'Sun Care',
    price: 42,
    description: 'Daily sunscreen protection SPF 50',
    image: '/products/sunscreen.jpg',
  },
  {
    id: '6',
    name: 'Cleanser',
    category: 'Face Care',
    price: 75,
    description: 'Gentle facial cleanser',
    image: '/products/cleanser.jpg',
  },
];

export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Premium Cream',
    currentStock: 150,
    minimumStock: 100,
    maximumStock: 500,
    reorderLevel: 200,
    unit: 'units',
    image: '/products/cream.jpg',
  },
  {
    id: '2',
    productId: '2',
    productName: 'Face Serum',
    currentStock: 45,
    minimumStock: 50,
    maximumStock: 300,
    reorderLevel: 100,
    unit: 'units',
    image: '/products/serum.jpg',
  },
  {
    id: '3',
    productId: '3',
    productName: 'Lipstick Set',
    currentStock: 32,
    minimumStock: 50,
    maximumStock: 200,
    reorderLevel: 75,
    unit: 'sets',
    image: '/products/lipstick.jpg',
  },
  {
    id: '4',
    productId: '4',
    productName: 'Nail Polish Collection',
    currentStock: 80,
    minimumStock: 50,
    maximumStock: 250,
    reorderLevel: 100,
    unit: 'sets',
    image: '/products/nailpolish.jpg',
  },
  {
    id: '5',
    productId: '5',
    productName: 'Sunscreen SPF 50',
    currentStock: 200,
    minimumStock: 100,
    maximumStock: 600,
    reorderLevel: 250,
    unit: 'units',
    image: '/products/sunscreen.jpg',
  },
  {
    id: '6',
    productId: '6',
    productName: 'Cleanser',
    currentStock: 25,
    minimumStock: 75,
    maximumStock: 300,
    reorderLevel: 150,
    unit: 'units',
    image: '/products/cleanser.jpg',
  },
];

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Premium Ingredients Inc',
    contactPerson: 'John Smith',
    email: 'john@premiumingredients.com',
    phone: '+1-234-567-8901',
    address: '123 Industrial Ave',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    products: ['1', '2', '5'],
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Global Cosmetics Supply',
    contactPerson: 'Maria Garcia',
    email: 'maria@globalcos.com',
    phone: '+1-234-567-8902',
    address: '456 Trade Street',
    city: 'Houston',
    state: 'TX',
    zipCode: '77001',
    products: ['3', '4'],
    rating: 4.2,
  },
  {
    id: '3',
    name: 'Nature Beauty Sourcing',
    contactPerson: 'David Lee',
    email: 'david@natureleigh.com',
    phone: '+1-234-567-8903',
    address: '789 Organic Lane',
    city: 'Portland',
    state: 'OR',
    zipCode: '97201',
    products: ['6'],
    rating: 4.8,
  },
];

export const mockDealers: Dealer[] = [
  {
    id: '1',
    name: 'Beauty Plus Store',
    email: 'beauty@plus.com',
    phone: '+1-555-0101',
    address: '100 Beauty Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    licenseNumber: 'LIC-NY-001',
    joinDate: new Date('2023-01-15'),
    totalOrders: 45,
    status: 'active',
  },
  {
    id: '2',
    name: 'Glow Cosmetics',
    email: 'glow@cosmetics.com',
    phone: '+1-555-0102',
    address: '200 Glamour Avenue',
    city: 'Miami',
    state: 'FL',
    zipCode: '33101',
    licenseNumber: 'LIC-FL-002',
    joinDate: new Date('2023-03-20'),
    totalOrders: 32,
    status: 'active',
  },
  {
    id: '3',
    name: 'Derma Care Center',
    email: 'derma@care.com',
    phone: '+1-555-0103',
    address: '300 Medical Plaza',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    licenseNumber: 'LIC-IL-003',
    joinDate: new Date('2023-05-10'),
    totalOrders: 28,
    status: 'active',
  },
  {
    id: '4',
    name: 'Radiant Beauty',
    email: 'radiant@beauty.com',
    phone: '+1-555-0104',
    address: '400 Shine Boulevard',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    licenseNumber: 'LIC-CA-004',
    joinDate: new Date('2023-07-05'),
    totalOrders: 52,
    status: 'active',
  },
];

export const mockECustomers: ECustomer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@email.com',
    phone: '+1-555-1001',
    address: '101 Main Street',
    city: 'Boston',
    state: 'MA',
    zipCode: '02101',
    registrationDate: new Date('2024-01-10'),
    totalOrders: 12,
    totalSpent: 3500,
    lastOrderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    name: 'Emily Davis',
    email: 'emily@email.com',
    phone: '+1-555-1002',
    address: '202 Oak Lane',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    registrationDate: new Date('2024-02-15'),
    totalOrders: 8,
    totalSpent: 2100,
    lastOrderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@email.com',
    phone: '+1-555-1003',
    address: '303 Pine Road',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94101',
    registrationDate: new Date('2024-03-20'),
    totalOrders: 15,
    totalSpent: 5200,
    lastOrderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    name: 'Jessica Martinez',
    email: 'jessica@email.com',
    phone: '+1-555-1004',
    address: '404 Elm Street',
    city: 'Denver',
    state: 'CO',
    zipCode: '80201',
    registrationDate: new Date('2024-04-10'),
    totalOrders: 6,
    totalSpent: 1800,
    lastOrderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
];
