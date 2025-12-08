import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator, FileText, Globe, MapPin, Percent, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

function TaxSettingsSection() {
  const { t } = useTranslation();
  const [showAddRate, setShowAddRate] = useState(false);
  const [editingRate, setEditingRate] = useState<number | null>(null);

  const [taxSettings, setTaxSettings] = useState({
    enabled: true,
    includedInPrices: false,
    displayPricesWithTax: true,
    roundAtSubtotal: false,
    additionalTaxClasses: ['Reduced rate', 'Zero rate']
  });

  const [taxRates, setTaxRates] = useState([
    {
      id: 1,
      country: 'United States',
      state: 'California',
      zip: '*',
      city: '*',
      rate: 7.25,
      name: 'CA State Tax',
      priority: 1,
      compound: false,
      shipping: true,
      class: 'Standard'
    },
    {
      id: 2,
      country: 'United States',
      state: 'New York',
      zip: '*',
      city: '*',
      rate: 8.875,
      name: 'NY State Tax',
      priority: 1,
      compound: false,
      shipping: true,
      class: 'Standard'
    },
    {
      id: 3,
      country: 'Germany',
      state: '*',
      zip: '*',
      city: '*',
      rate: 19,
      name: 'German VAT',
      priority: 1,
      compound: false,
      shipping: true,
      class: 'Standard'
    }
  ]);

  const [newRate, setNewRate] = useState({
    country: '',
    state: '',
    zip: '*',
    city: '*',
    rate: '',
    name: '',
    priority: '1',
    compound: false,
    shipping: true,
    class: 'Standard'
  });

  const handleAddRate = () => {
    if (!newRate.country || !newRate.rate || !newRate.name) return;
  
    if (editingRate !== null) {
      // Update existing rate
      setTaxRates(
        taxRates.map((r) =>
          r.id === editingRate
            ? {
                ...r,
                country: newRate.country,
                state: newRate.state || '*',
                zip: newRate.zip || '*',
                city: newRate.city || '*',
                rate: parseFloat(newRate.rate),
                name: newRate.name,
                priority: parseInt(newRate.priority),
                compound: newRate.compound,
                shipping: newRate.shipping,
                class: newRate.class
              }
            : r
        )
      );
    } else {
      // Add new rate
      const newTaxRate = {
        id: taxRates.length + 1,
        country: newRate.country,
        state: newRate.state || '*',
        zip: newRate.zip || '*',
        city: newRate.city || '*',
        rate: parseFloat(newRate.rate),
        name: newRate.name,
        priority: parseInt(newRate.priority),
        compound: newRate.compound,
        shipping: newRate.shipping,
        class: newRate.class
      };
      setTaxRates([...taxRates, newTaxRate]);
    }
  
    // Reset form and close dialog
    setNewRate({
      country: '',
      state: '',
      zip: '*',
      city: '*',
      rate: '',
      name: '',
      priority: '1',
      compound: false,
      shipping: true,
      class: 'Standard'
    });
    setEditingRate(null);
    setShowAddRate(false);
  };

  const handleDeleteRate = (id: number) => {
    setTaxRates(taxRates.filter(rate => rate.id !== id));
  };

  const handleSave = () => {
    console.log('Saving tax settings:', { taxSettings, taxRates });
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">{t('tax.title')}</CardTitle>
              <CardDescription className="text-gray-100 mt-1">
                {t('tax.description')}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {t('tax.badge.required')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="rates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger 
              value="rates" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {t('tax.tabs.rates')}
            </TabsTrigger>
            <TabsTrigger
              value="options"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {t('tax.tabs.options')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rates" className="space-y-6">
            <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                {t('tax.alerts.ratesInfo')}
              </AlertDescription>
            </Alert>

            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {t('tax.headers.taxRates')}
                </h3>
                <Dialog open={showAddRate} onOpenChange={(open) => { setShowAddRate(open); if (!open) { setEditingRate(null); setNewRate({ country: '', state: '', zip: '*', city: '*', rate: '', name: '', priority: '1', compound: false, shipping: true, class: 'Standard' }); } }}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm"
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      {t('tax.buttons.addRate')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900 dark:text-gray-100">
                        {t('tax.dialog.addRate.title')}
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400">
                        {t('tax.dialog.addRate.description')}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-700 dark:text-gray-300">
                            {t('tax.fields.country')}
                          </Label>
                          <Select
                            value={newRate.country}
                            onValueChange={(value) => setNewRate({...newRate, country: value})}
                          >
                            <SelectTrigger className="border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                              <SelectValue placeholder={t('tax.placeholders.selectCountry')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="United States">{t('tax.countries.unitedStates')}</SelectItem>
                              <SelectItem value="Canada">{t('tax.countries.canada')}</SelectItem>
                              <SelectItem value="United Kingdom">{t('tax.countries.unitedKingdom')}</SelectItem>
                              <SelectItem value="Germany">{t('tax.countries.germany')}</SelectItem>
                              <SelectItem value="France">{t('tax.countries.france')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-gray-700 dark:text-gray-300">
                            {t('tax.fields.stateProvince')}
                          </Label>
                          <Input
                            value={newRate.state}
                            onChange={(e) => setNewRate({...newRate, state: e.target.value})}
                            placeholder={t('tax.placeholders.allStates')}
                            className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-700 dark:text-gray-300">
                            {t('tax.fields.zipPostalCode')}
                          </Label>
                          <Input
                            value={newRate.zip}
                            onChange={(e) => setNewRate({...newRate, zip: e.target.value})}
                            placeholder={t('tax.placeholders.allZips')}
                            className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-700 dark:text-gray-300">
                            {t('tax.fields.city')}
                          </Label>
                          <Input
                            value={newRate.city}
                            onChange={(e) => setNewRate({...newRate, city: e.target.value})}
                            placeholder={t('tax.placeholders.allCities')}
                            className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-700 dark:text-gray-300">
                            {t('tax.fields.taxRate')}
                          </Label>
                          <Input
                            type="number"
                            step="0.001"
                            value={newRate.rate}
                            onChange={(e) => setNewRate({...newRate, rate: e.target.value})}
                            placeholder={t('tax.placeholders.rateExample')}
                            className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-700 dark:text-gray-300">
                            {t('tax.fields.taxName')}
                          </Label>
                          <Input
                            value={newRate.name}
                            onChange={(e) => setNewRate({...newRate, name: e.target.value})}
                            placeholder={t('tax.placeholders.taxNameExample')}
                            className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                          />
                        </div>
                      </div>
                      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-700 dark:text-gray-300 font-normal">
                            {t('tax.fields.compound')}
                            <span className="text-sm text-gray-500 dark:text-gray-400 block">
                              {t('tax.descriptions.compound')}
                            </span>
                          </Label>
                          <Switch
                            checked={newRate.compound}
                            onCheckedChange={(checked) => setNewRate({...newRate, compound: checked})}
                            className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-700 dark:text-gray-300 font-normal">
                            {t('tax.fields.applyToShipping')}
                            <span className="text-sm text-gray-500 dark:text-gray-400 block">
                              {t('tax.descriptions.applyToShipping')}
                            </span>
                          </Label>
                          <Switch
                            checked={newRate.shipping}
                            onCheckedChange={(checked) => setNewRate({...newRate, shipping: checked})}
                            className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowAddRate(false)}
                        className="border-gray-300 dark:border-gray-700"
                      >
                        {t('tax.buttons.cancel')}
                      </Button>
                      <Button
                        onClick={handleAddRate}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                      >
                        {t('tax.buttons.addRate')}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
                    <TableRow>
                      <TableHead className="text-gray-700 dark:text-gray-300">{t('tax.table.location')}</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">{t('tax.table.taxName')}</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">{t('tax.table.rate')}</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">{t('tax.table.properties')}</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 text-right">{t('tax.table.actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taxRates.map((rate) => (
                      <TableRow key={rate.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <div>
                              <div className="text-gray-900 dark:text-gray-100">
                                {rate.country}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {rate.state !== '*' && rate.state}
                                {rate.city !== '*' && `, ${rate.city}`}
                                {rate.zip !== '*' && ` ${rate.zip}`}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-100">
                          {rate.name}
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-100 font-semibold">
                          <div className="flex items-center gap-1">
                            <Percent className="h-3 w-3 text-gray-500" />
                            {rate.rate}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {rate.compound && (
                              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 border-0">
                                {t('tax.badges.compound')}
                              </Badge>
                            )}
                            {rate.shipping && (
                              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-0">
                                {t('tax.badges.shipping')}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => { setEditingRate(rate.id); setNewRate({ country: rate.country, state: rate.state === '*' ? '' : rate.state, zip: rate.zip === '*' ? '*' : rate.zip, city: rate.city === '*' ? '*' : rate.city, rate: String(rate.rate), name: rate.name, priority: String(rate.priority), compound: rate.compound, shipping: rate.shipping, class: rate.class }); setShowAddRate(true); }}
                              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteRate(rate.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="options" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 font-normal">
                    {t('tax.options.enableTaxes')}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('tax.options.enableTaxesDescription')}
                  </p>
                </div>
                <Switch
                  checked={taxSettings.enabled}
                  onCheckedChange={(checked) => setTaxSettings({...taxSettings, enabled: checked})}
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 font-normal">
                    {t('tax.options.pricesIncludeTax')}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('tax.options.pricesIncludeTaxDescription')}
                  </p>
                </div>
                <Switch
                  checked={taxSettings.includedInPrices}
                  onCheckedChange={(checked) => setTaxSettings({...taxSettings, includedInPrices: checked})}
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 font-normal">
                    {t('tax.options.displayPricesWithTax')}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('tax.options.displayPricesWithTaxDescription')}
                  </p>
                </div>
                <Switch
                  checked={taxSettings.displayPricesWithTax}
                  onCheckedChange={(checked) => setTaxSettings({...taxSettings, displayPricesWithTax: checked})}
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 font-normal">
                    {t('tax.options.roundAtSubtotal')}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('tax.options.roundAtSubtotalDescription')}
                  </p>
                </div>
                <Switch
                  checked={taxSettings.roundAtSubtotal}
                  onCheckedChange={(checked) => setTaxSettings({...taxSettings, roundAtSubtotal: checked})}
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>
            </div>

            <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900 dark:text-amber-100">
                    {t('tax.compliance.title')}
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    {t('tax.compliance.description')}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
          <Button 
            variant="outline" 
            className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            {t('tax.buttons.cancel')}
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
          >
            {t('tax.buttons.saveSettings')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default TaxSettingsSection;