import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/Header"
import Title from "@/components/Title"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ThemeCustomizer } from "@/components/admin/ThemeCustomizer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Eye, Smartphone, Monitor, Tablet } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/hooks/useTheme"
import { ThemePreview } from "@/components/admin/ThemePreview"

const Themes = () => {
  const { currentTheme, themeConfig } = useTheme()
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [showPreview, setShowPreview] = useState(false)

  const handlePreview = () => {
    setShowPreview(true)
    // Open preview in new window
    const previewUrl = `/theme-preview?theme=${currentTheme}`
    window.open(previewUrl, '_blank', 'width=1200,height=800')
  }

  const handleSaveTheme = () => {
    // In a real app, this would save to the backend
    console.log("Saving theme settings...")
    // Show success notification
    alert("Theme settings saved successfully!")
  }

  const deviceSizes = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px"
  }

  return (
    <div dir="rtl">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          
          <div className="p-6">
            <Title
              title="Theme Customization"
              Subtitle="Customize your store's appearance and branding"
              className=""
              classNamee=""
            />
            
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr,400px]">
              {/* Theme Customizer */}
              <div className="space-y-6">
                <ThemeCustomizer
                  onPreview={handlePreview}
                  onSave={handleSaveTheme}
                />
                
                {/* Live Preview */}
                <ThemePreview
                  device={previewDevice}
                  className="sticky top-6"
                />
              </div>
              
              {/* Theme Info & Actions */}
              <div className="space-y-6">
                {/* Current Theme Status */}
                <Card>
                  <CardHeader>
                    <CardTitle>Current Theme Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Theme:</span>
                      <span className="font-semibold">{themeConfig?.name || currentTheme}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Modified:</span>
                      <span className="text-sm">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className="text-sm text-green-600 font-medium">Published</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={handlePreview}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Preview Theme
                    </Button>
                    <Button className="w-full" variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live Store
                    </Button>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-600 mb-2">Preview on different devices:</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={previewDevice === "desktop" ? "default" : "outline"}
                          onClick={() => setPreviewDevice("desktop")}
                        >
                          <Monitor className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={previewDevice === "tablet" ? "default" : "outline"}
                          onClick={() => setPreviewDevice("tablet")}
                        >
                          <Tablet className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={previewDevice === "mobile" ? "default" : "outline"}
                          onClick={() => setPreviewDevice("mobile")}
                        >
                          <Smartphone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Theme Features */}
                <Card>
                  <CardHeader>
                    <CardTitle>Theme Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {themeConfig && (
                        <>
                          {Object.entries(themeConfig.features || {})
                            .filter(([_, value]) => value === true)
                            .map(([feature]) => (
                              <div key={feature} className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <span className="text-sm capitalize">
                                  {feature.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                              </div>
                            ))}
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Help & Documentation */}
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Learn how to customize your theme to match your brand.
                    </p>
                    <div className="space-y-2">
                      <Button variant="link" className="p-0 h-auto justify-start">
                        Theme Customization Guide
                      </Button>
                      <Button variant="link" className="p-0 h-auto justify-start">
                        Best Practices for E-commerce
                      </Button>
                      <Button variant="link" className="p-0 h-auto justify-start">
                        Contact Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default Themes