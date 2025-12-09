import React, { useState } from "react";
import {
  Package,
  Truck,
  MapPin,
  Clock,
  DollarSign,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

function ShippingSettingsSection() {
  const { t } = useTranslation();
  const [showAddZone, setShowAddZone] = useState(false);
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  const [shippingZones, setShippingZones] = useState([
    {
      id: 1,
      name: "Domestic",
      regions: ["United States"],
      methods: [
        {
          name: "Standard Shipping",
          rate: "$5.99",
          time: "5-7 days",
          enabled: true,
        },
        {
          name: "Express Shipping",
          rate: "$12.99",
          time: "2-3 days",
          enabled: true,
        },
        {
          name: "Next Day Delivery",
          rate: "$24.99",
          time: "1 day",
          enabled: false,
        },
      ],
    },
    {
      id: 2,
      name: "International",
      regions: ["Rest of World"],
      methods: [
        {
          name: "International Standard",
          rate: "$19.99",
          time: "10-15 days",
          enabled: true,
        },
        {
          name: "International Express",
          rate: "$39.99",
          time: "5-7 days",
          enabled: true,
        },
      ],
    },
  ]);

  const [newZone, setNewZone] = useState({
    name: "",
    regions: "",
  });

  const [newMethod, setNewMethod] = useState({
    name: "",
    rate: "",
    time: "",
    minOrder: "",
    maxWeight: "",
  });

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: "50",
    defaultShippingClass: "standard",
    calculateTax: true,
    realTimeRates: false,
    packagingFee: "0",
  });

  const handleAddZone = () => {
    if (!newZone.name || !newZone.regions) return;

    const newShippingZone = {
      id: shippingZones.length + 1,
      name: newZone.name,
      regions: newZone.regions.split(",").map((r) => r.trim()),
      methods: [],
    };

    setShippingZones([...shippingZones, newShippingZone]);
    setNewZone({ name: "", regions: "" });
    setShowAddZone(false);
  };

  const handleAddMethod = () => {
    if (!selectedZone || !newMethod.name || !newMethod.rate) return;

    setShippingZones((zones) =>
      zones.map((zone) =>
        zone.id === selectedZone
          ? {
              ...zone,
              methods: [
                ...zone.methods,
                {
                  name: newMethod.name,
                  rate: newMethod.rate,
                  time: newMethod.time,
                  enabled: true,
                },
              ],
            }
          : zone
      )
    );

    setNewMethod({ name: "", rate: "", time: "", minOrder: "", maxWeight: "" });
    setShowAddMethod(false);
    setSelectedZone(null);
  };

  const handleToggleMethod = (zoneId: number, methodIndex: number) => {
    setShippingZones((zones) =>
      zones.map((zone) =>
        zone.id === zoneId
          ? {
              ...zone,
              methods: zone.methods.map((method, index) =>
                index === methodIndex
                  ? { ...method, enabled: !method.enabled }
                  : method
              ),
            }
          : zone
      )
    );
  };

  const handleDeleteZone = (zoneId: number) => {
    setShippingZones((zones) => zones.filter((zone) => zone.id !== zoneId));
  };

  const handleSave = () => {
    console.log("Saving shipping settings:", {
      shippingZones,
      shippingSettings,
    });
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">{t("shippingSettings.title")}</CardTitle>
              <CardDescription className="text-gray-100 mt-1">
                {t("shippingSettings.description")}
              </CardDescription>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-white/20 text-white border-0"
          >
            {t("shippingSettings.important")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="zones" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger
              value="zones"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {t("shippingSettings.shippingZones")}
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              {t("shippingSettings.generalSettings")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="zones" className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {t("shippingSettings.zones")}
                </h3>
                <Dialog open={showAddZone} onOpenChange={setShowAddZone}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      {t("shippingSettings.addZone")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900 dark:text-gray-100">
                        {t("shippingSettings.addShippingZone")}
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400">
                        {t("shippingSettings.addZoneDescription")}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label className="text-gray-700 dark:text-gray-300">
                          {t("shippingSettings.zoneName")}
                        </Label>
                        <Input
                          value={newZone.name}
                          onChange={(e) =>
                            setNewZone({ ...newZone, name: e.target.value })
                          }
                          placeholder={t("shippingSettings.zoneNamePlaceholder")}
                          className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700 dark:text-gray-300">
                          {t("shippingSettings.regions")}
                        </Label>
                        <Input
                          value={newZone.regions}
                          onChange={(e) =>
                            setNewZone({ ...newZone, regions: e.target.value })
                          }
                          placeholder={t("shippingSettings.regionsPlaceholder")}
                          className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowAddZone(false)}
                        className="border-gray-300 dark:border-gray-700"
                      >
                        {t("common.cancel")}
                      </Button>
                      <Button
                        onClick={handleAddZone}
                        className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white"
                      >
                        {t("shippingSettings.addZone")}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {shippingZones.map((zone) => (
                  <div
                    key={zone.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-gray-500" />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              {zone.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {zone.regions.join(", ")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedZone(zone.id);
                              setShowAddMethod(true);
                            }}
                            className="text-orange-600 hover:text-orange-700 border-orange-200 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-800 dark:hover:bg-orange-900/20"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            {t("shippingSettings.addMethod")}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteZone(zone.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {zone.methods.length > 0 && (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-gray-700 dark:text-gray-300">
                              {t("shippingSettings.method")}
                            </TableHead>
                            <TableHead className="text-gray-700 dark:text-gray-300">
                              {t("shippingSettings.rate")}
                            </TableHead>
                            <TableHead className="text-gray-700 dark:text-gray-300">
                              {t("shippingSettings.deliveryTime")}
                            </TableHead>
                            <TableHead className="text-gray-700 dark:text-gray-300">
                              {t("common.status")}
                            </TableHead>
                            <TableHead className="text-gray-700 dark:text-gray-300 text-right">
                              {t("common.actions")}
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {zone.methods.map((method, index) => (
                            <TableRow
                              key={index}
                              className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
                            >
                              <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                                <div className="flex items-center gap-2">
                                  <Package className="h-4 w-4 text-gray-500" />
                                  {method.name}
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100 font-semibold">
                                {method.rate}
                              </TableCell>
                              <TableCell className="text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {method.time}
                                </div>
                              </TableCell>
                              <TableCell>
                                {method.enabled ? (
                                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-0">
                                    {t("common.active")}
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="secondary"
                                    className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-0"
                                  >
                                    {t("common.inactive")}
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center gap-2 justify-end">
                                  <Switch
                                    checked={method.enabled}
                                    onCheckedChange={() =>
                                      handleToggleMethod(zone.id, index)
                                    }
                                    className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                                  />
                                  <Button size="sm" variant="ghost">
                                    <Edit className="h-4 w-4 text-gray-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  {t("shippingSettings.freeShippingThreshold")}
                </Label>
                <Input
                  type="number"
                  value={shippingSettings.freeShippingThreshold}
                  onChange={(e) =>
                    setShippingSettings({
                      ...shippingSettings,
                      freeShippingThreshold: e.target.value,
                    })
                  }
                  placeholder={t("shippingSettings.zeroPlaceholder")}
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t("shippingSettings.freeShippingDescription")}
                </p>
              </div>

              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  {t("shippingSettings.defaultShippingClass")}
                </Label>
                <Select
                  value={shippingSettings.defaultShippingClass}
                  onValueChange={(value) =>
                    setShippingSettings({
                      ...shippingSettings,
                      defaultShippingClass: value,
                    })
                  }
                >
                  <SelectTrigger className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    <SelectValue placeholder={t("shippingSettings.selectDefaultClass")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">{t("shippingSettings.standard")}</SelectItem>
                    <SelectItem value="express">{t("shippingSettings.express")}</SelectItem>
                    <SelectItem value="overnight">{t("shippingSettings.overnight")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  {t("shippingSettings.packagingFee")}
                </Label>
                <Input
                  type="number"
                  value={shippingSettings.packagingFee}
                  onChange={(e) =>
                    setShippingSettings({
                      ...shippingSettings,
                      packagingFee: e.target.value,
                    })
                  }
                  placeholder={t("shippingSettings.zeroDecimalPlaceholder")}
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t("shippingSettings.packagingFeeDescription")}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 font-normal">
                    {t("shippingSettings.calculateTax")}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t("shippingSettings.calculateTaxDescription")}
                  </p>
                </div>
                <Switch
                  checked={shippingSettings.calculateTax}
                  onCheckedChange={(checked) =>
                    setShippingSettings({
                      ...shippingSettings,
                      calculateTax: checked,
                    })
                  }
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 font-normal">
                    {t("shippingSettings.realTimeRates")}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t("shippingSettings.realTimeRatesDescription")}
                  </p>
                </div>
                <Switch
                  checked={shippingSettings.realTimeRates}
                  onCheckedChange={(checked) =>
                    setShippingSettings({
                      ...shippingSettings,
                      realTimeRates: checked,
                    })
                  }
                  className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
          <Button
            variant="outline"
            className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white"
          >
            {t("settings.saveChanges")}
          </Button>
        </div>
      </CardContent>

      {/* Add Shipping Method Dialog */}
      <Dialog open={showAddMethod} onOpenChange={setShowAddMethod}>
        <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">
              {t("shippingSettings.addShippingMethod")}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {t("shippingSettings.addMethodDescription")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-gray-700 dark:text-gray-300">
                {t("shippingSettings.methodName")}
              </Label>
              <Input
                value={newMethod.name}
                onChange={(e) =>
                  setNewMethod({ ...newMethod, name: e.target.value })
                }
                placeholder={t("shippingSettings.methodNamePlaceholder")}
                className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-300">
                {t("shippingSettings.shippingRate")}
              </Label>
              <Input
                value={newMethod.rate}
                onChange={(e) =>
                  setNewMethod({ ...newMethod, rate: e.target.value })
                }
                placeholder={t("shippingSettings.ratePlaceholder")}
                className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-300">
                {t("shippingSettings.estimatedDeliveryTime")}
              </Label>
              <Input
                value={newMethod.time}
                onChange={(e) =>
                  setNewMethod({ ...newMethod, time: e.target.value })
                }
                placeholder={t("shippingSettings.deliveryTimePlaceholder")}
                className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddMethod(false);
                setSelectedZone(null);
              }}
              className="border-gray-300 dark:border-gray-700"
            >
              {t("common.cancel")}
            </Button>
            <Button
              onClick={handleAddMethod}
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white"
            >
              {t("shippingSettings.addMethod")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default ShippingSettingsSection;
