import React, { useState } from 'react';
import { Globe, Link, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function DomainConfigurationSection() {
  const [newDomain, setNewDomain] = useState('');
  const [domains, setDomains] = useState([
    { 
      id: 1, 
      domain: 'mystore.com', 
      status: 'active', 
      ssl: true, 
      primary: true,
      verifiedAt: '2024-01-15'
    },
    { 
      id: 2, 
      domain: 'shop.mystore.com', 
      status: 'active', 
      ssl: true, 
      primary: false,
      verifiedAt: '2024-02-20'
    },
    { 
      id: 3, 
      domain: 'new.mystore.com', 
      status: 'pending', 
      ssl: false, 
      primary: false,
      verifiedAt: null
    }
  ]);

  const handleAddDomain = () => {
    if (!newDomain) return;
    
    const newDomainEntry = {
      id: domains.length + 1,
      domain: newDomain,
      status: 'pending',
      ssl: false,
      primary: false,
      verifiedAt: null
    };
    
    setDomains([...domains, newDomainEntry]);
    setNewDomain('');
  };

  const handleRemoveDomain = (id: number) => {
    setDomains(domains.filter(d => d.id !== id));
  };

  const handleSetPrimary = (id: number) => {
    setDomains(domains.map(d => ({
      ...d,
      primary: d.id === id
    })));
  };

  const handleVerifyDomain = (id: number) => {
    console.log('Verifying domain:', id);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { 
        variant: 'default' as const, 
        className: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-0',
        icon: <CheckCircle className="h-3 w-3" />
      },
      pending: { 
        variant: 'secondary' as const, 
        className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 border-0',
        icon: <AlertCircle className="h-3 w-3" />
      },
      failed: { 
        variant: 'destructive' as const, 
        className: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-0',
        icon: <XCircle className="h-3 w-3" />
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <Badge variant={config.variant} className={config.className}>
        <span className="flex items-center gap-1">
          {config.icon}
          {"Status ${status}"}
        </span>
      </Badge>
    );
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">{"Title"}</CardTitle>
              <CardDescription className="text-gray-100 mt-1">
                {"Description"}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {"Advanced"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            {"Dns Instructions"}
          </AlertDescription>
        </Alert>

        {/* Add New Domain */}
        <div className="space-y-4">
          <div>
            <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
              <Link className="h-4 w-4 text-gray-500" />
              {"Add New Domain"}
            </Label>
            <div className="flex gap-3">
              <Input
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                placeholder={"Domain Placeholder"}
                className="flex-1 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
              <Button 
                onClick={handleAddDomain}
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white"
              >
                {"Add Domain Button"}
              </Button>
            </div>
          </div>
        </div>

        {/* Domains List */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {"Configured Domains"}
          </h3>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
                <TableRow>
                  <TableHead className="text-gray-700 dark:text-gray-300">{"Domain"}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">{"Status"}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">{"Ssl"}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">{"Type"}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">{"Verified"}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300 text-right">{"Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {domains.map((domain) => (
                  <TableRow key={domain.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-500" />
                        {domain.domain}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(domain.status)}</TableCell>
                    <TableCell>
                      {domain.ssl ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-0">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {"Active"}
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-0">
                          {"Not Configured"}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {domain.primary ? (
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 border-0">
                          {"Primary"}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-gray-300 dark:border-gray-700">
                          {"Secondary"}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {domain.verifiedAt ? new Date(domain.verifiedAt).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        {domain.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerifyDomain(domain.id)}
                            className="text-green-600 hover:text-green-700 border-green-200 hover:bg-green-50 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/20"
                          >
                            {"Verify"}
                          </Button>
                        )}
                        {!domain.primary && domain.status === 'active' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSetPrimary(domain.id)}
                            className="text-purple-600 hover:text-purple-700 border-purple-200 hover:bg-purple-50 dark:text-purple-400 dark:border-purple-800 dark:hover:bg-purple-900/20"
                          >
                            {"Set Primary"}
                          </Button>
                        )}
                        {!domain.primary && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveDomain(domain.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            {"Remove"}
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* DNS Configuration Info */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
            {"Dns Configuration"}
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {"A Record"}
              </span>
              <span className="text-gray-800 dark:text-gray-200 font-mono">192.168.1.1</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {"Cname"}
              </span>
              <span className="text-gray-800 dark:text-gray-200 font-mono">verify.mystore.com</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DomainConfigurationSection;