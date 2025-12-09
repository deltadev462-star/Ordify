import React, { useState, useEffect } from "react";
import {
  Layout,
  ArrowRight,
  Palette,
  Smartphone,
  EyeOff,
  Eye,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SidebarSettings {
  position: "left" | "right";
  collapsible: boolean;
  defaultCollapsed: boolean;
  showLabels: boolean;
  showIcons: boolean;
  theme: "default" | "minimal" | "glass";
}

function SidebarSettingsSection() {
  const [sidebarSettings, setSidebarSettings] = useState<SidebarSettings>({
    position: "right",
    collapsible: true,
    defaultCollapsed: false,
    showLabels: true,
    showIcons: true,
    theme: "glass",
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("sidebarSettings");
    if (savedSettings) {
      try {
        setSidebarSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Failed to parse sidebar settings:", error);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("sidebarSettings", JSON.stringify(sidebarSettings));
    window.dispatchEvent(new CustomEvent("Sidebar Settings Changed"));
  };

  const handleResetSidebar = () => {
    const defaultSettings: SidebarSettings = {
      position: "right",
      collapsible: true,
      defaultCollapsed: false,
      showLabels: true,
      showIcons: true,
      theme: "glass",
    };
    setSidebarSettings(defaultSettings);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Preview Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent dark:from-primary/20 dark:via-accent/10 p-1">
        <div className="absolute top-5 right-5 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="relative bg-white/90 dark:bg-gray-900/50 backdrop-blur-sm rounded-[14px] p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 shadow-lg shadow-primary/10">
              <Layout className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {"Title"}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {"Description"}
              </p>
            </div>
          </div>

          {/* Mini Sidebar Preview */}
          <div className="flex gap-4 mt-4">
            <div
              className={`relative ${
                sidebarSettings.position === "left"
                  ? "order-first"
                  : "order-last"
              } 
                w-16 h-32 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 
                flex flex-col items-center justify-center gap-2 transition-all duration-300
                ${sidebarSettings.theme === "glass" ? "backdrop-blur-sm" : ""}
                ${
                  sidebarSettings.theme === "minimal"
                    ? "border-gray-300 dark:border-gray-600"
                    : ""
                }`}
            >
              {sidebarSettings.showIcons && (
                <div className="flex flex-col gap-1">
                  <div className="w-3 h-3 rounded bg-primary/40" />
                  <div className="w-3 h-3 rounded bg-primary/30" />
                  <div className="w-3 h-3 rounded bg-primary/20" />
                </div>
              )}
              <span className="text-[8px] text-gray-600 dark:text-gray-400">
                {"Sidebar"}
              </span>
            </div>
            <div className="flex-1 h-32 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {"Content Area"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Position */}
        <div className="p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/30 transition-all">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2 mb-3">
            <ArrowRight className="w-4 h-4 text-primary dark:text-primary" />
            {"Label"}
          </Label>
          <Select
            value={sidebarSettings.position}
            onValueChange={(value: "left" | "right") =>
              setSidebarSettings({ ...sidebarSettings, position: value })
            }
          >
            <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">{"Left"}</SelectItem>
              <SelectItem value="right">{"Right"}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Theme */}
        <div className="p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/30 transition-all">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-primary dark:text-primary" />
            {"Label"}
          </Label>
          <Select
            value={sidebarSettings.theme}
            onValueChange={(value: "default" | "minimal" | "glass") =>
              setSidebarSettings({ ...sidebarSettings, theme: value })
            }
          >
            <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">{"Default"}</SelectItem>
              <SelectItem value="minimal">{"Minimal"}</SelectItem>
              <SelectItem value="glass">{"Glass"}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Toggle Settings */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {"Title"}
        </h4>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/30 transition-all">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 rounded-lg bg-emerald-500/10 shrink-0">
              <Smartphone className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {"Label"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {"Description"}
              </p>
            </div>
          </div>
          <Switch
            checked={sidebarSettings.collapsible}
            onCheckedChange={(checked) =>
              setSidebarSettings({ ...sidebarSettings, collapsible: checked })
            }
            className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/30 transition-all">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 rounded-lg bg-blue-500/10 shrink-0">
              <EyeOff className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {"Label"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {"Description"}
              </p>
            </div>
          </div>
          <Switch
            checked={sidebarSettings.defaultCollapsed}
            onCheckedChange={(checked) =>
              setSidebarSettings({
                ...sidebarSettings,
                defaultCollapsed: checked,
              })
            }
            disabled={!sidebarSettings.collapsible}
            className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/30 transition-all">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 rounded-lg bg-violet-500/10 shrink-0">
              <Eye className="w-4 h-4 text-violet-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {"Label"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {"Description"}
              </p>
            </div>
          </div>
          <Switch
            checked={sidebarSettings.showLabels}
            onCheckedChange={(checked) =>
              setSidebarSettings({ ...sidebarSettings, showLabels: checked })
            }
            className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/30 transition-all">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 rounded-lg bg-amber-500/10 shrink-0">
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {"Label"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {"Description"}
              </p>
            </div>
          </div>
          <Switch
            checked={sidebarSettings.showIcons}
            onCheckedChange={(checked) =>
              setSidebarSettings({ ...sidebarSettings, showIcons: checked })
            }
            className="data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:hover:bg-primary/80 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:hover:bg-gray-600"
          />
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleResetSidebar}
          className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          {"Reset"}
        </Button>
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        >
          {"Save"}
        </Button>
      </div>
    </div>
  );
}

export default SidebarSettingsSection;
