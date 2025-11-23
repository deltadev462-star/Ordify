import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/Header"
import Title from "@/components/Title"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ThemeCustomizer } from "@/components/admin/ThemeCustomizer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Eye, Smartphone, Monitor, Tablet, Maximize2, Minimize2 } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useTheme } from "@/hooks/useTheme"
import { ThemePreview } from "@/components/admin/ThemePreview"

const Themes = () => {
  const { t } = useTranslation()
  const { currentTheme, themeConfig } = useTheme()
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeView, setActiveView] = useState<"split" | "customize" | "preview">("split")

  const handlePreview = () => {
    // Open preview in new window
    const previewUrl = `/theme-preview?theme=${currentTheme}`
    window.open(previewUrl, '_blank', 'width=1200,height=800')
  }

  const handleSaveTheme = () => {
    // In a real app, this would save to the backend
    alert(t('themeSettingsSaved'))
  }

  return (
    <div dir="rtl">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2  mb-6 ">
              <Title
                title={t("themeCustomization")}
                Subtitle={t("customizeStoreAppearance")}
                className=""
                classNamee=""
              />

              {/* View Controls */}
              <div className="flex items-center md:mt-0 mt-5  ms-auto  gap-2">
                <div className="flex gap-1  bg-gray-100 dark:bg-[#313131] dark:text-white rounded-lg p-1">
                  <Button
                    size="sm"
                    variant={activeView === "split" ? "default" : "ghost"}
                    onClick={() => setActiveView("split")}
                    className="px-3"
                  >
                    {t("splitView")}
                  </Button>
                  <Button
                    size="sm"
                    variant={activeView === "customize" ? "default" : "ghost"}
                    onClick={() => setActiveView("customize")}
                    className="px-3"
                  >
                    {t("customizeOnly")}
                  </Button>
                  <Button
                    size="sm"
                    variant={activeView === "preview" ? "default" : "ghost"}
                    onClick={() => setActiveView("preview")}
                    className="px-3"
                  >
                    {t("previewOnly")}
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="dark:border-gray-500 border-2"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4 dark:text-white" />
                  ) : (
                    <Maximize2 className="h-4 w-4 dark:text-white" />
                  )}
                </Button>
              </div>
            </div>

            {/* Main Content Area */}
            <div
              className={` ${
                isFullscreen
                  ? " fixed inset-0 z-[999] bg-white dark:bg-[#101010] scroll-auto p-6"
                  : ""
              }`}
            >
              {isFullscreen && (
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold dark:text-white">
                    {t("themeCustomization")}
                  </h2>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsFullscreen(false)}
                  >
                    <Minimize2 className="h-4 w-4 mx-2 dark:text-white" />
                    {t("exitFullscreen")}
                  </Button>
                </div>
              )}

              {activeView === "split" && (
                <div className="grid gap-6 lg:grid-cols-1">
                  {/* Left: Theme Customizer */}
                  <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                    <ThemeCustomizer
                      onPreview={handlePreview}
                      onSave={handleSaveTheme}
                    />
                  </div>

                  {/* Right: Live Preview & Info */}
                  <div className="space-y-6">
                    {/* Device Preview Controls */}
                    <Card className="border border-[#d6d6d6] dark:bg-[#101010] dark:border-[#424242] dark:text-white ">
                      <CardHeader className="pb-3 ">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            {t("livePreview")}
                          </CardTitle>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={
                                previewDevice === "desktop"
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => setPreviewDevice("desktop")}
                            >
                              <Monitor className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                previewDevice === "tablet"
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => setPreviewDevice("tablet")}
                            >
                              <Tablet className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                previewDevice === "mobile"
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => setPreviewDevice("mobile")}
                            >
                              <Smartphone className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>

                    {/* Theme Preview */}
                    <div className="">
                      <ThemePreview
                        device={previewDevice}
                        className="sticky top-6"
                      />
                    </div>

                    {/* Quick Actions */}
                    <Card className="border border-[#d6d6d6] dark:bg-[#101010] dark:border-[#424242] dark:text-white">
                      <CardHeader>
                        <CardTitle className="text-base">
                          {t("quickActions")}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={handlePreview}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          {t("previewInNewWindow")}
                        </Button>
                        <Button className="w-full" variant="outline">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {t("viewLiveStore")}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeView === "customize" && (
                <div className="max-w-4xl mx-auto">
                  <ThemeCustomizer
                    onPreview={handlePreview}
                    onSave={handleSaveTheme}
                  />
                </div>
              )}

              {activeView === "preview" && (
                <div className="space-y-6">
                  {/* Device Preview Controls */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle>{t("themePreview")}</CardTitle>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={
                              previewDevice === "desktop"
                                ? "default"
                                : "outline"
                            }
                            onClick={() => setPreviewDevice("desktop")}
                          >
                            <Monitor className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant={
                              previewDevice === "tablet" ? "default" : "outline"
                            }
                            onClick={() => setPreviewDevice("tablet")}
                          >
                            <Tablet className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant={
                              previewDevice === "mobile" ? "default" : "outline"
                            }
                            onClick={() => setPreviewDevice("mobile")}
                          >
                            <Smartphone className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <ThemePreview device={previewDevice} />
                </div>
              )}
            </div>

            {/* Theme Info Cards - Only show when not in fullscreen */}
            {!isFullscreen && activeView !== "preview" && (
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {/* Current Theme Status */}
                <Card className="border border-[#d6d6d6] dark:bg-[#101010] dark:border-[#424242] dark:text-white">
                  <CardHeader>
                    <CardTitle className="text-base">
                      {t("currentTheme")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {t("active")}:
                      </span>
                      <span className="font-semibold text-sm">
                        {themeConfig?.name || currentTheme}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {t("modified")}:
                      </span>
                      <span className="text-sm">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {t("status")}:
                      </span>
                      <span className="text-sm text-green-600 font-medium">
                        {t("published")}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Theme Features */}
                <Card className="border border-[#d6d6d6] dark:bg-[#101010] dark:border-[#424242] dark:text-white">
                  <CardHeader>
                    <CardTitle className="text-base">
                      {t("activeFeatures")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {themeConfig && (
                        <>
                          {Object.entries(themeConfig.features || {})
                            .filter(([, value]) => value === true)
                            .slice(0, 5)
                            .map(([feature]) => (
                              <div
                                key={feature}
                                className="flex items-center gap-2"
                              >
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <span className="text-sm capitalize">
                                  {t(feature.replace(/([A-Z])/g, " $1").trim())}
                                </span>
                              </div>
                            ))}
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Help & Documentation */}
                <Card className="border border-[#d6d6d6] dark:bg-[#101010] dark:border-[#424242] dark:text-white">
                  <CardHeader>
                    <CardTitle className="text-base">{t("needHelp")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600">
                      {t("learnCustomizeTheme")}
                    </p>
                    <div className="space-y-2">
                      <Button
                        variant="link"
                        className="p-0 h-auto justify-start text-sm"
                      >
                        {t("viewDocumentation")}
                      </Button>
                      <Button
                        variant="link"
                        className="p-0 h-auto justify-start text-sm"
                      >
                        {t("contactSupport")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default Themes
