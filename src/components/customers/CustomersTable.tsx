import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SimpleDataTable, type Column } from "@/components/shared/DataTable/SimpleDataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MoreVertical, Mail, Phone, ShoppingBag, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  orders: {
    total: number;
    completed: number;
    cancelled: number;
  };
  totalSpent: number;
  status: 'active' | 'inactive' | 'blocked';
  tags?: string[];
  createdAt: string;
  lastOrderAt?: string;
}

interface CustomersTableProps {
  customers: Customer[];
  onViewCustomer?: (customer: Customer) => void;
  onContactCustomer?: (customer: Customer) => void;
  onViewOrders?: (customer: Customer) => void;
  onBlockCustomer?: (customerId: string) => void;
}

export function CustomersTable({ 
  customers, 
  onViewCustomer, 
  onContactCustomer,
  onViewOrders,
  onBlockCustomer 
}: CustomersTableProps) {
  const { t } = useTranslation();

  const getStatusColor = (status: Customer['status']) => {
    const colors = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      blocked: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const columns: Column<Customer>[] = [
    {
      key: 'name',
      header: t('Customer'),
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            {row.avatar && <AvatarImage src={row.avatar} alt={row.name} />}
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              {getInitials(row.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Mail className="h-3 w-3" />
              {row.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      header: t('Phone'),
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-3 w-3 text-muted-foreground" />
          {value}
        </div>
      ),
    },
    {
      key: 'orders',
      header: t('Orders'),
      sortable: true,
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{row.orders.total}</span>
            <span className="text-sm text-muted-foreground">{t('total')}</span>
          </div>
          <div className="flex gap-3 text-xs">
            <span className="text-green-600">{row.orders.completed} {t('completed')}</span>
            {row.orders.cancelled > 0 && (
              <span className="text-red-600">{row.orders.cancelled} {t('cancelled')}</span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'totalSpent',
      header: t('Total Spent'),
      sortable: true,
      render: (value) => (
        <div className="font-medium">{t('EGP')} {value.toLocaleString()}</div>
      ),
    },
    {
      key: 'status',
      header: t('Status'),
      sortable: true,
      render: (value) => (
        <Badge className={cn("capitalize", getStatusColor(value))}>
          {t(value)}
        </Badge>
      ),
    },
    {
      key: 'lastOrderAt',
      header: t('Last Order'),
      sortable: true,
      render: (value) => (
        <div className="text-sm">
          {value ? (
            <>
              <div>{new Date(value).toLocaleDateString()}</div>
              <div className="text-xs text-muted-foreground">
                {new Date(value).toLocaleTimeString()}
              </div>
            </>
          ) : (
            <span className="text-muted-foreground">{t('No orders yet')}</span>
          )}
        </div>
      ),
    },
    {
      key: 'tags',
      header: t('Tags'),
      render: (value) => (
        <div className="flex flex-wrap gap-1">
          {value && value.length > 0 ? (
            value.map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">-</span>
          )}
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
            onClick={() => onViewCustomer?.(row)}
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
              <DropdownMenuLabel>{t("Actions")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onViewCustomer?.(row)}>
                <Eye className="mr-2 h-4 w-4" />
                {t("View Profile")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onContactCustomer?.(row)}>
                <Mail className="mr-2 h-4 w-4" />
                {t("Send Email")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onContactCustomer?.(row)}>
                <Phone className="mr-2 h-4 w-4" />
                {t("Call Customer")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewOrders?.(row)}>
                <ShoppingBag className="mr-2 h-4 w-4" />
                {t("View Orders")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {row.status !== 'blocked' ? (
                <DropdownMenuItem 
                  onClick={() => onBlockCustomer?.(row.id)}
                  className="text-red-600 dark:text-red-400"
                >
                  {t("Block Customer")}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem 
                  onClick={() => onBlockCustomer?.(row.id)}
                  className="text-green-600 dark:text-green-400"
                >
                  {t("Unblock Customer")}
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
      data={customers}
      columns={columns}
      searchKey="name"
      searchPlaceholder={t("Search customers by name...")}
      pageSize={10}
    />
  );
}