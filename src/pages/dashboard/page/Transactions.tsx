import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  ShoppingCart,
  RefreshCw,
  Calendar,
  Search
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

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: "income" | "expense" | "refund";
  amount: number;
  status: "completed" | "pending" | "failed";
  reference: string;
}

function Transactions() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for demonstration
  const transactions: Transaction[] = [
    {
      id: "1",
      date: "2024-12-08",
      description: "Order #12345 Payment",
      category: "sales",
      type: "income",
      amount: 1250.00,
      status: "completed",
      reference: "PAY-2024-12345"
    },
    {
      id: "2",
      date: "2024-12-08",
      description: "Monthly Subscription Fee",
      category: "subscription",
      type: "expense",
      amount: 99.00,
      status: "completed",
      reference: "SUB-2024-00123"
    },
    {
      id: "3",
      date: "2024-12-07",
      description: "Refund - Order #12340",
      category: "refund",
      type: "refund",
      amount: 450.00,
      status: "pending",
      reference: "REF-2024-00456"
    },
    {
      id: "4",
      date: "2024-12-07",
      description: "Order #12341 Payment",
      category: "sales",
      type: "income",
      amount: 2100.50,
      status: "completed",
      reference: "PAY-2024-12341"
    },
    {
      id: "5",
      date: "2024-12-06",
      description: "Payout to Bank Account",
      category: "payout",
      type: "expense",
      amount: 5000.00,
      status: "completed",
      reference: "PAYOUT-2024-789"
    },
  ];

  // Calculate summary stats
  const totalIncome = transactions
    .filter(t => t.type === "income" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => (t.type === "expense" || t.type === "refund") && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const netBalance = totalIncome - totalExpenses;

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "income":
        return <ArrowDownRight className="h-4 w-4" />;
      case "expense":
        return <ArrowUpRight className="h-4 w-4" />;
      case "refund":
        return <RefreshCw className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "income":
        return "text-emerald-600 dark:text-emerald-400";
      case "expense":
        return "text-red-600 dark:text-red-400";
      case "refund":
        return "text-orange-600 dark:text-orange-400";
      default:
        return "";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">{t("Completed")}</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400">{t("Pending")}</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400">{t("Failed")}</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex   m-1 flex-1 flex-col gap-6 p-6">
        <Title
          title={t("Transactions")}
          Subtitle={t("Track all your financial transactions and payment history")}
          className="text-3xl"
          classNamee=""
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("Total Income")}</p>
                  <p className="text-2xl font-bold mt-1">EGP {totalIncome.toFixed(2)}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm text-emerald-600 dark:text-emerald-400">+12.4%</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("Total Expenses")}</p>
                  <p className="text-2xl font-bold mt-1">EGP {totalExpenses.toFixed(2)}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <span className="text-sm text-red-600 dark:text-red-400">-5.2%</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("Net Balance")}</p>
                  <p className="text-2xl font-bold mt-1">EGP {netBalance.toFixed(2)}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary">+8.7%</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="glass-card border-0">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("Search transactions...")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full md:w-[300px]"
                  />
                </div>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder={t("Type")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("All Types")}</SelectItem>
                    <SelectItem value="income">{t("Income")}</SelectItem>
                    <SelectItem value="expense">{t("Expense")}</SelectItem>
                    <SelectItem value="refund">{t("Refund")}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder={t("Status")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("All Status")}</SelectItem>
                    <SelectItem value="completed">{t("Completed")}</SelectItem>
                    <SelectItem value="pending">{t("Pending")}</SelectItem>
                    <SelectItem value="failed">{t("Failed")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className=" border-gray-200 dark:border-gray-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  {t("Date Range")}
                </Button>
                <Button variant="outline" size="sm"  className=" border-gray-200 dark:border-gray-700">
                  <Filter className="h-4 w-4 mr-2" />
                  {t("More Filters")}
                </Button>
                <Button size="sm" className="glow-on-hover border-gray-200 dark:border-gray-700">
                  <Download className="h-4 w-4 mr-2" />
                  {t("Export")}
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
                    <TableHead>{t("Date")}</TableHead>
                    <TableHead>{t("Description")}</TableHead>
                    <TableHead>{t("Type")}</TableHead>
                    <TableHead>{t("Amount")}</TableHead>
                    <TableHead>{t("Status")}</TableHead>
                    <TableHead>{t("Reference")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-2 ${getTypeColor(transaction.type)}`}>
                          {getTypeIcon(transaction.type)}
                          <span className="capitalize">{t(transaction.type)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`font-semibold ${getTypeColor(transaction.type)}`}>
                          {transaction.type === "expense" || transaction.type === "refund" ? "-" : "+"}
                          EGP {transaction.amount.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      <TableCell className="text-muted-foreground">{transaction.reference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {filteredTransactions.map((transaction) => (
                <Card key={transaction.id} className="glass-card border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                      {getStatusBadge(transaction.status)}
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                      <div className={`flex items-center gap-2 ${getTypeColor(transaction.type)}`}>
                        {getTypeIcon(transaction.type)}
                        <span className="capitalize">{t(transaction.type)}</span>
                      </div>
                      <span className={`font-semibold ${getTypeColor(transaction.type)}`}>
                        {transaction.type === "expense" || transaction.type === "refund" ? "-" : "+"}
                        EGP {transaction.amount.toFixed(2)}
                      </span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      {t("Ref")}: {transaction.reference}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                {t("Showing")} 1-{filteredTransactions.length} {t("of")} {transactions.length} {t("transactions")}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  {t("Previous")}
                </Button>
                <Button variant="outline" size="sm">
                  {t("Next")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Transactions;
