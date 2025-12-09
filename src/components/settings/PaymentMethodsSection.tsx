import React, { useState } from 'react';
import { CreditCard, Banknote, Smartphone, Globe, AlertCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function PaymentMethodsSection() {
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [newMethod, setNewMethod] = useState({
    name: '',
    type: '',
    apiKey: '',
    secretKey: '',
    webhook: ''
  });

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      name: 'Stripe',
      type: 'credit_card',
      icon: CreditCard,
      status: 'active',
      transactions: 1234,
      revenue: '$12,345.00',
      fee: '2.9% + $0.30'
    },
    {
      id: 2,
      name: 'PayPal',
      type: 'digital_wallet',
      icon: Globe,
      status: 'active',
      transactions: 567,
      revenue: '$5,678.00',
      fee: '3.49% + $0.49'
    },
    {
      id: 3,
      name: 'Cash on Delivery',
      type: 'cash',
      icon: Banknote,
      status: 'active',
      transactions: 89,
      revenue: '$890.00',
      fee: 'Free'
    },
    {
      id: 4,
      name: 'Apple Pay',
      type: 'mobile',
      icon: Smartphone,
      status: 'inactive',
      transactions: 0,
      revenue: '$0.00',
      fee: '2.9% + $0.30'
    }
  ]);

  const handleToggleMethod = (id: number) => {
    setPaymentMethods(methods => 
      methods.map(method => 
        method.id === id 
          ? { ...method, status: method.status === 'active' ? 'inactive' : 'active' }
          : method
      )
    );
  };

  const handleAddMethod = () => {
    console.log('Adding payment method:', newMethod);
    setShowAddMethod(false);
    setNewMethod({
      name: '',
      type: '',
      apiKey: '',
      secretKey: '',
      webhook: ''
    });
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-0">
          {"Active"}
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-0">
        {"Inactive"}
      </Badge>
    );
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">{"Title"}</CardTitle>
              <CardDescription className="text-gray-100 mt-1">
                {"Description"}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {"Essential"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <Alert className="border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800">
          <AlertCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <AlertDescription className="text-emerald-800 dark:text-emerald-200">
            {"Conversion Alert"}
          </AlertDescription>
        </Alert>

        {/* Payment Methods List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {"Configured Methods"}
            </h3>
            <Dialog open={showAddMethod} onOpenChange={setShowAddMethod}>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {"Add Method"}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-gray-900 dark:text-gray-100">
                    {"Title"}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 dark:text-gray-400">
                    {"Description"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">
                      {"Payment Provider"}
                    </Label>
                    <Select 
                      value={newMethod.type} 
                      onValueChange={(value) => setNewMethod({...newMethod, type: value})}
                    >
                      <SelectTrigger className="border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                        <SelectValue placeholder={"Select Provider"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">{"Stripe"}</SelectItem>
                        <SelectItem value="paypal">{"Paypal"}</SelectItem>
                        <SelectItem value="square">{"Square"}</SelectItem>
                        <SelectItem value="razorpay">{"Razorpay"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">
                      {"Display Name"}
                    </Label>
                    <Input
                      value={newMethod.name}
                      onChange={(e) => setNewMethod({...newMethod, name: e.target.value})}
                      placeholder={"Display Name Placeholder"}
                      className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">
                      {"Api Key"}
                    </Label>
                    <Input
                      value={newMethod.apiKey}
                      onChange={(e) => setNewMethod({...newMethod, apiKey: e.target.value})}
                      placeholder={"Api Key Placeholder"}
                      className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">
                      {"Secret Key"}
                    </Label>
                    <Input
                      type="password"
                      value={newMethod.secretKey}
                      onChange={(e) => setNewMethod({...newMethod, secretKey: e.target.value})}
                      placeholder={"Secret Key Placeholder"}
                      className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">
                      {"Webhook Url"} ({"Optional"})
                    </Label>
                    <Input
                      value={newMethod.webhook}
                      onChange={(e) => setNewMethod({...newMethod, webhook: e.target.value})}
                      placeholder={"Webhook Url Placeholder"}
                      className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddMethod(false)}
                    className="border-gray-300 dark:border-gray-700"
                  >
                    {"Cancel"}
                  </Button>
                  <Button 
                    onClick={handleAddMethod}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                  >
                    {"Add Method Button"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
                <TableRow>
                  <TableHead className="text-gray-700 dark:text-gray-300">{"Method"}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">{"Status"}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">{"Transactions"}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">{"Revenue"}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">{"Fee"}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300 text-right">{"Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <TableRow key={method.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          </div>
                          <span className="text-gray-900 dark:text-gray-100">{method.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(method.status)}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400">
                        {method.transactions.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100 font-semibold">
                        {method.revenue}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400">
                        {method.fee}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Switch
                            checked={method.status === 'active'}
                            onCheckedChange={() => handleToggleMethod(method.id)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                          >
                            {"Configure"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">
            {"Title"}
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-normal">
                  {"Test Mode"}
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {"Test Mode Description"}
                </p>
              </div>
              <Switch className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-normal">
                  {"Auto Capture"}
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {"Auto Capture Description"}
                </p>
              </div>
              <Switch
                defaultChecked
                className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-normal">
                  {"Save Card Details"}
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {"Save Card Details Description"}
                </p>
              </div>
              <Switch
                defaultChecked
                className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PaymentMethodsSection;