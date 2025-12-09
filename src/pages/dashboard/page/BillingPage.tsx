import { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Search,
  Receipt,
  CreditCard,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Mail,
  Printer
} from "lucide-react";
import Title from "@/components/Title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customer: string;
  customerEmail: string;
  amount: number;
  tax: number;
  total: number;
  status: "paid" | "pending" | "overdue" | "cancelled";
  paymentMethod?: string;
  items: number;
}

function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState("all");

  // Mock data for demonstration
  const invoices: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      date: "2024-12-08",
      dueDate: "2024-12-15",
      customer: "Ahmed Hassan",
      customerEmail: "ahmed@example.com",
      amount: 5000.00,
      tax: 750.00,
      total: 5750.00,
      status: "paid",
      paymentMethod: "Credit Card",
      items: 3
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      date: "2024-12-07",
      dueDate: "2024-12-14",
      customer: "Fatima Ali",
      customerEmail: "fatima@example.com",
      amount: 12500.00,
      tax: 1875.00,
      total: 14375.00,
      status: "pending",
      items: 5
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      date: "2024-12-05",
      dueDate: "2024-12-12",
      customer: "Mohamed Youssef",
      customerEmail: "mohamed@example.com",
      amount: 3200.00,
      tax: 480.00,
      total: 3680.00,
      status: "overdue",
      items: 2
    },
    {
      id: "4",
      invoiceNumber: "INV-2024-004",
      date: "2024-12-04",
      dueDate: "2024-12-11",
      customer: "Sara Ibrahim",
      customerEmail: "sara@example.com",
      amount: 8900.00,
      tax: 1335.00,
      total: 10235.00,
      status: "paid",
      paymentMethod: "Bank Transfer",
      items: 4
    },
    {
      id: "5",
      invoiceNumber: "INV-2024-005",
      date: "2024-12-03",
      dueDate: "2024-12-10",
      customer: "Omar Khaled",
      customerEmail: "omar@example.com",
      amount: 1500.00,
      tax: 225.00,
      total: 1725.00,
      status: "cancelled",
      items: 1
    },
  ];

  // Calculate summary stats
  const totalBilled = invoices
    .filter(inv => inv.status !== "cancelled")
    .reduce((sum, inv) => sum + inv.total, 0);
  
  const totalPaid = invoices
    .filter(inv => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.total, 0);
  
  const totalPending = invoices
    .filter(inv => inv.status === "pending" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0);

  const overdueCount = invoices.filter(inv => inv.status === "overdue").length;

  // Filter invoices
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 flex items-center gap-1">
            {getStatusIcon(status)}
            {"Paid"}
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400 flex items-center gap-1">
            {getStatusIcon(status)}
            {"Pending"}
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400 flex items-center gap-1">
            {getStatusIcon(status)}
            {"Overdue"}
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            {getStatusIcon(status)}
            {"Cancelled"}
          </Badge>
        );
      default:
        return null;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex  rounded-2xl m-1 flex-1 flex-col gap-6 p-6">
        <Title
          title={"Billing &  Invoices"}
          Subtitle={"Manage your invoices"}
          className="text-3xl"
          classNamee=""
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-card border-0 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{"Total  Billed"}</p>
                  <p className="text-2xl font-bold mt-1">EGP {totalBilled.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-2">{"This month"}</p>
                </div>
                <div className="h-12 w-12 rounded-full gradient-border bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{"Paid  Invoices"}</p>
                  <p className="text-2xl font-bold mt-1">EGP {totalPaid.toFixed(2)}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                    {((totalPaid / totalBilled) * 100).toFixed(0)}% {"Collected"}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{"Pending  Amount"}</p>
                  <p className="text-2xl font-bold mt-1">EGP {totalPending.toFixed(2)}</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                    {invoices.filter(inv => inv.status === "pending").length} {"Invoices"}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-50 dark:bg-yellow-950/30 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{"Overdue"}</p>
                  <p className="text-2xl font-bold mt-1">{overdueCount}</p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                    {"Requires attention"}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <Card className="glass-card border-0">
          <CardHeader className="pb-4">
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={""}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full md:w-[300px]"
                  />
                </div>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder={"Status"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{"All  Status"}</SelectItem>
                    <SelectItem value="paid">{"Paid"}</SelectItem>
                    <SelectItem value="pending">{"Pending"}</SelectItem>
                    <SelectItem value="overdue">{"Overdue"}</SelectItem>
                    <SelectItem value="cancelled">{"Cancelled"}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder={"Period"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{"All  Time"}</SelectItem>
                    <SelectItem value="today">{"Today"}</SelectItem>
                    <SelectItem value="week">{"This  Week"}</SelectItem>
                    <SelectItem value="month">{"This  Month"}</SelectItem>
                    <SelectItem value="quarter">{"This  Quarter"}</SelectItem>
                    <SelectItem value="year">{"This  Year"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  {"Date  Range"}
                </Button>
                <Button size="sm" className="glow-on-hover gradient-border">
                  <Receipt className="h-4 w-4 mr-2" />
                  {"Create  Invoice"}
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden md:block rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 dark:border-gray-700">
                    <TableHead>{"Invoice"}</TableHead>
                    <TableHead>{"Customer"}</TableHead>
                    <TableHead>{"Date"}</TableHead>
                    <TableHead>{"Due  Date"}</TableHead>
                    <TableHead>{"Amount"}</TableHead>
                    <TableHead>{"Status"}</TableHead>
                    <TableHead className="text-right">{"Actions"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => {
                    const daysUntilDue = getDaysUntilDue(invoice.dueDate);
                    
                    return (
                      <TableRow
                        key={invoice.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-muted/50 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{invoice.invoiceNumber}</p>
                              <p className="text-xs text-muted-foreground">{invoice.items} {"Items"}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{invoice.customer}</p>
                            <p className="text-xs text-muted-foreground">{invoice.customerEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(invoice.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{new Date(invoice.dueDate).toLocaleDateString()}</p>
                            {invoice.status === "pending" && daysUntilDue > 0 && (
                              <p className="text-xs text-muted-foreground">
                                {"Due in"} {daysUntilDue} {"Days"}
                              </p>
                            )}
                            {invoice.status === "overdue" && (
                              <p className="text-xs text-red-600 dark:text-red-400">
                                {Math.abs(daysUntilDue)} {"Days overdue"}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold">EGP {invoice.total.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">
                              {"Tax"}: EGP {invoice.tax.toFixed(2)}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                {"Actions"}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>{"Invoice  Actions"}</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer">
                                <Eye className="h-4 w-4 mr-2" />
                                {"View  Invoice"}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Download className="h-4 w-4 mr-2" />
                                {"Download  P D F"}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Mail className="h-4 w-4 mr-2" />
                                {"Send by  Email"}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Printer className="h-4 w-4 mr-2" />
                                {"Print"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer">
                                <CreditCard className="h-4 w-4 mr-2" />
                                {"Record  Payment"}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer text-destructive">
                                <XCircle className="h-4 w-4 mr-2" />
                                {"Cancel  Invoice"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {filteredInvoices.map((invoice) => {
                const daysUntilDue = getDaysUntilDue(invoice.dueDate);
                
                return (
                  <Card key={invoice.id} className="glass-card border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{invoice.invoiceNumber}</p>
                            <p className="text-xs text-muted-foreground">{invoice.items} {"Items"}</p>
                          </div>
                        </div>
                        {getStatusBadge(invoice.status)}
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium">{invoice.customer}</p>
                          <p className="text-xs text-muted-foreground">{invoice.customerEmail}</p>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{"Date"}</span>
                          <span>{new Date(invoice.date).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{"Due  Date"}</span>
                          <div className="text-right">
                            <p>{new Date(invoice.dueDate).toLocaleDateString()}</p>
                            {invoice.status === "pending" && daysUntilDue > 0 && (
                              <p className="text-xs text-muted-foreground">
                                {"Due in"} {daysUntilDue} {"Days"}
                              </p>
                            )}
                            {invoice.status === "overdue" && (
                              <p className="text-xs text-red-600 dark:text-red-400">
                                {Math.abs(daysUntilDue)} {"Days overdue"}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-lg">EGP {invoice.total.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">
                            {"Tax"}: EGP {invoice.tax.toFixed(2)}
                          </p>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              {"Actions"}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{"Invoice  Actions"}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="h-4 w-4 mr-2" />
                              {"View  Invoice"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Download className="h-4 w-4 mr-2" />
                              {"Download  P D F"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Mail className="h-4 w-4 mr-2" />
                              {"Send by  Email"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Printer className="h-4 w-4 mr-2" />
                              {"Print"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                              <CreditCard className="h-4 w-4 mr-2" />
                              {"Record  Payment"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-destructive">
                              <XCircle className="h-4 w-4 mr-2" />
                              {"Cancel  Invoice"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                {"Showing"} 1-{filteredInvoices.length} {"Of"} {invoices.length} {"Invoices"}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  {"Previous"}
                </Button>
                <Button variant="outline" size="sm">
                  {"Next"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default BillingPage;