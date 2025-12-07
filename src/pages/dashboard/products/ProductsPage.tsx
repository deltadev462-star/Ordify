import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Package, TrendingUp, AlertTriangle, Archive } from "lucide-react";
import { MetricCard } from "@/components/dashboard/widgets/MetricCard";
import { ProductCard, type Product } from "@/components/products/ProductCard";
import { ProductFilters, type ProductFilters as ProductFiltersType } from "@/components/products/ProductFilters";
import { SimpleDataTable, type Column } from "@/components/shared/DataTable/SimpleDataTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ProductsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ProductFiltersType>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState("");

  // Sample product data - replace with API call
  const sampleProducts: Product[] = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      price: 899,
      comparePrice: 1299,
      currency: "EGP",
      images: ["https://via.placeholder.com/300x300?text=Headphones"],
      category: "Electronics",
      inventory: {
        quantity: 45,
        trackInventory: true
      },
      status: "active",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "2",
      name: "Smart Watch Pro",
      description: "Advanced fitness tracking and health monitoring",
      price: 2499,
      currency: "EGP",
      images: ["https://via.placeholder.com/300x300?text=SmartWatch"],
      category: "Electronics",
      inventory: {
        quantity: 8,
        trackInventory: true
      },
      status: "active",
      createdAt: "2024-01-14T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "3",
      name: "Organic Cotton T-Shirt",
      description: "Comfortable and sustainable cotton t-shirt",
      price: 299,
      comparePrice: 399,
      currency: "EGP",
      images: ["https://via.placeholder.com/300x300?text=T-Shirt"],
      category: "Clothing",
      inventory: {
        quantity: 120,
        trackInventory: true
      },
      status: "active",
      createdAt: "2024-01-13T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "4",
      name: "Premium Coffee Beans",
      description: "Arabica coffee beans from Colombia",
      price: 159,
      currency: "EGP",
      images: ["https://via.placeholder.com/300x300?text=Coffee"],
      category: "Food & Beverages",
      inventory: {
        quantity: 0,
        trackInventory: true
      },
      status: "active",
      createdAt: "2024-01-12T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "5",
      name: "Yoga Mat - Premium",
      description: "Non-slip exercise and yoga mat",
      price: 449,
      currency: "EGP",
      images: [],
      category: "Sports & Outdoors",
      inventory: {
        quantity: 35,
        trackInventory: true
      },
      status: "draft",
      createdAt: "2024-01-11T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "6",
      name: "Vintage Table Lamp",
      description: "Classic design table lamp for home decor",
      price: 699,
      comparePrice: 999,
      currency: "EGP",
      images: ["https://via.placeholder.com/300x300?text=Lamp"],
      category: "Home & Garden",
      inventory: {
        quantity: 15,
        trackInventory: false
      },
      status: "archived",
      createdAt: "2024-01-10T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    }
  ];

  // Product statistics
  const productStats = [
    {
      title: t("Total Products"),
      value: "256",
      change: 5.2,
      changeType: 'increase' as const,
      icon: Package,
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBgColor: 'bg-blue-50 dark:bg-blue-950/30',
      trend: 'up' as const,
      period: t("vs last month")
    },
    {
      title: t("Active Products"),
      value: "198",
      change: 3.8,
      changeType: 'increase' as const,
      icon: TrendingUp,
      iconColor: 'text-green-600 dark:text-green-400',
      iconBgColor: 'bg-green-50 dark:bg-green-950/30',
      trend: 'up' as const,
      period: t("vs last month")
    },
    {
      title: t("Low Stock"),
      value: "23",
      change: 15.2,
      changeType: 'increase' as const,
      icon: AlertTriangle,
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      iconBgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
      trend: 'up' as const,
      period: t("Items below 10")
    },
    {
      title: t("Archived"),
      value: "35",
      change: -2.1,
      changeType: 'decrease' as const,
      icon: Archive,
      iconColor: 'text-gray-600 dark:text-gray-400',
      iconBgColor: 'bg-gray-50 dark:bg-gray-950/30',
      trend: 'down' as const,
      period: t("vs last month")
    }
  ];

  // Filter products based on filters and search
  const filteredProducts = sampleProducts.filter(product => {
    // Search filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (filters.status && product.status !== filters.status) {
      return false;
    }
    
    // Category filter
    if (filters.category && product.category.toLowerCase() !== filters.category) {
      return false;
    }
    
    // Stock status filter
    if (filters.stockStatus) {
      if (filters.stockStatus === 'in-stock' && product.inventory.quantity <= 0) return false;
      if (filters.stockStatus === 'low-stock' && (product.inventory.quantity === 0 || product.inventory.quantity >= 10)) return false;
      if (filters.stockStatus === 'out-of-stock' && product.inventory.quantity > 0) return false;
    }
    
    // Price range filter
    if (filters.priceRange) {
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false;
      }
    }
    
    return true;
  });

  const handleViewProduct = (product: Product) => {
    navigate(`/dashboard/products/${product.id}`);
  };

  const handleEditProduct = (product: Product) => {
    navigate(`/dashboard/products/${product.id}/edit`);
  };

  const handleDeleteProduct = (product: Product) => {
    console.log('Delete product:', product.id);
    // Implement delete functionality
  };

  const handleDuplicateProduct = (product: Product) => {
    console.log('Duplicate product:', product.id);
    // Implement duplicate functionality
  };

  const handleExport = () => {
    console.log('Export products');
    // Implement export functionality
  };

  const handleCreateProduct = () => {
    navigate('/dashboard/products/new');
  };

  // Table columns for list view
  const tableColumns: Column<Product>[] = [
    {
      key: 'name',
      header: t('Product'),
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          {row.images.length > 0 ? (
            <img
              src={row.images[0]}
              alt={row.name}
              className="h-10 w-10 rounded object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/40x40?text=No+Image';
              }}
            />
          ) : (
            <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
              <Package className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground">{row.category}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      header: t('Price'),
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium">{row.currency} {value.toLocaleString()}</div>
          {row.comparePrice && (
            <div className="text-sm text-muted-foreground line-through">
              {row.currency} {row.comparePrice.toLocaleString()}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'inventory.quantity',
      header: t('Stock'),
      sortable: true,
      render: (value, row) => (
        <div>
          {row.inventory.trackInventory ? (
            <Badge
              variant={
                row.inventory.quantity === 0 ? "destructive" :
                row.inventory.quantity < 10 ? "secondary" :
                "default"
              }
            >
              {row.inventory.quantity} {t('units')}
            </Badge>
          ) : (
            <span className="text-sm text-muted-foreground">{t('Not tracked')}</span>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: t('Status'),
      sortable: true,
      render: (value) => (
        <Badge
          variant={
            value === 'active' ? 'default' :
            value === 'draft' ? 'secondary' :
            'outline'
          }
        >
          {t(value)}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditProduct(row)}
          >
            {t('Edit')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewProduct(row)}
          >
            {t('View')}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">{t("Products & Catalog")}</h1>
        <p className="text-muted-foreground mt-1">
          {t("Manage your product inventory and catalog")}
        </p>
      </div>

      {/* Product Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {productStats.map((stat, index) => (
          <MetricCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            iconColor={stat.iconColor}
            iconBgColor={stat.iconBgColor}
            trend={stat.trend}
            period={stat.period}
          />
        ))}
      </div>

      {/* Products Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder={t("Search products...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              onExport={handleExport}
              onCreateProduct={handleCreateProduct}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onView={handleViewProduct}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    onDuplicate={handleDuplicateProduct}
                  />
                ))}
              </div>
            ) : (
              <SimpleDataTable
                data={filteredProducts}
                columns={tableColumns}
                pageSize={10}
              />
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t("No products found")}</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || Object.keys(filters).length > 0
                    ? t("Try adjusting your search or filters")
                    : t("Start by adding your first product")}
                </p>
                <Button onClick={handleCreateProduct}>
                  {t("Add Product")}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}