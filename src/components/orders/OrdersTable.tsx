 
import { SimpleDataTable, type Column } from "@/components/shared/DataTable/SimpleDataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MoreVertical, Printer, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

interface OrdersTableProps {
  orders: Order[];
  onViewOrder?: (order: Order) => void;
  onUpdateStatus?: (orderId: string, status: Order['status']) => void;
}

export function OrdersTable({ orders, onViewOrder, onUpdateStatus }: OrdersTableProps) {
  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      refunded: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const columns: Column<Order>[] = [
    {
      key: 'orderNumber',
      header: "Order  Number",
      sortable: true,
      render: (value) => (
        <div className="font-medium">#{value}</div>
      ),
    },
    {
      key: 'customer.name',
      header: "Customer",
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium">{row.customer.name}</div>
          <div className="text-sm text-muted-foreground">{row.customer.phone}</div>
        </div>
      ),
    },
    {
      key: 'items',
      header: "Items",
      sortable: true,
      className: 'text-center',
      render: (value) => (
        <div className="text-center">{value}</div>
      ),
    },
    {
      key: 'total',
      header: "Total",
      sortable: true,
      render: (value: number) => (
        <div className="font-medium">{"E G P"} {value.toLocaleString()}</div>
      ),
    },
    {
      key: 'status',
      header: "Status",
      sortable: true,
      render: (value: Order['status']) => (
        <Badge className={cn("capitalize", getStatusColor(value))}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'paymentMethod',
      header: "Payment",
      render: (value: string) => (
        <div className="text-sm">{value}</div>
      ),
    },
    {
      key: 'createdAt',
      header: "Date",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm">
          {new Date(value).toLocaleDateString()}
          <div className="text-xs text-muted-foreground">
            {new Date(value).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewOrder?.(row)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{"Actions"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onViewOrder?.(row)}>
                <Eye className="mr-2 h-4 w-4" />
                {"View  Details"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Printer className="mr-2 h-4 w-4" />
                {"Print  Invoice"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                {"Download  P D F"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {row.status === 'pending' && (
                <DropdownMenuItem 
                  onClick={() => onUpdateStatus?.(row.id, 'processing')}
                  className="text-blue-600"
                >
                  {"Mark as  Processing"}
                </DropdownMenuItem>
              )}
              {row.status === 'processing' && (
                <DropdownMenuItem 
                  onClick={() => onUpdateStatus?.(row.id, 'shipped')}
                  className="text-purple-600"
                >
                  {"Mark as  Shipped"}
                </DropdownMenuItem>
              )}
              {row.status === 'shipped' && (
                <DropdownMenuItem 
                  onClick={() => onUpdateStatus?.(row.id, 'delivered')}
                  className="text-green-600"
                >
                  {"Mark as  Delivered"}
                </DropdownMenuItem>
              )}
              {['pending', 'processing'].includes(row.status) && (
                <DropdownMenuItem 
                  onClick={() => onUpdateStatus?.(row.id, 'cancelled')}
                  className="text-red-600"
                >
                  {"Cancel  Order"}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <SimpleDataTable
      data={orders}
      columns={columns}
      searchKey="orderNumber"
      searchPlaceholder={""}
      pageSize={10}
    />
  );
}