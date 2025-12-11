import { useState } from 'react';
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Globe,
  Calendar,
  User,
  Code,
  Link,
  Settings,
  Copy,
  MoreVertical,
  Layout,
  FileCode
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  template: string;
  lastModified: string;
  author: string;
  views: number;
  seo?: {
    title: string;
    description: string;
    keywords: string;
  };
}

interface PageTemplate {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  preview?: string;
}

function PagesManagementSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      title: 'About Us',
      slug: 'about-us',
      status: 'published',
      template: 'default',
      lastModified: '2024-01-15',
      author: 'Admin',
      views: 1250,
      seo: {
        title: 'About Us - Our Story',
        description: 'Learn more about our company and mission',
        keywords: 'about, company, mission'
      }
    },
    {
      id: '2',
      title: 'Contact Us',
      slug: 'contact',
      status: 'published',
      template: 'contact',
      lastModified: '2024-01-10',
      author: 'Admin',
      views: 850
    },
    {
      id: '3',
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      status: 'published',
      template: 'legal',
      lastModified: '2024-01-05',
      author: 'Admin',
      views: 450
    },
    {
      id: '4',
      title: 'Terms of Service',
      slug: 'terms',
      status: 'draft',
      template: 'legal',
      lastModified: '2024-01-20',
      author: 'Admin',
      views: 0
    }
  ]);

  const pageTemplates: PageTemplate[] = [
    {
      id: 'blank',
      name: 'pagesManagement.templates.blankPage',
      icon: FileText,
      description: 'pagesManagement.templates.blankPageDescription'
    },
    {
      id: 'default',
      name: 'pagesManagement.templates.defaultTemplate',
      icon: Layout,
      description: 'pagesManagement.templates.defaultTemplateDescription'
    },
    {
      id: 'contact',
      name: 'pagesManagement.templates.contactForm',
      icon: User,
      description: 'pagesManagement.templates.contactFormDescription'
    },
    {
      id: 'legal',
      name: 'pagesManagement.templates.legalDocument',
      icon: FileCode,
      description: 'pagesManagement.templates.legalDocumentDescription'
    },
    {
      id: 'landing',
      name: 'pagesManagement.templates.landingPage',
      icon: Globe,
      description: 'pagesManagement.templates.landingPageDescription'
    }
  ];

  const handleCreatePage = () => {
    // Mock create page
    const newPage: Page = {
      id: Date.now().toString(),
      title: 'New Page',
      slug: 'new-page',
      status: 'draft',
      template: selectedTemplate,
      lastModified: new Date().toISOString().split("T")[0],
      author: 'Admin',
      views: 0
    };
    setPages([newPage, ...pages]);
    setShowCreateForm(false);
  };

  const handleDeletePage = (pageId: string) => {
    setPages(pages.filter(p => p.id !== pageId));
  };

  const handleStatusToggle = (pageId: string) => {
    setPages(pages.map(page =>
      page.id === pageId
        ? { ...page, status: page.status === 'published' ? 'draft' : 'published' }
        : page
    ));
  };

  const handleDuplicatePage = (page: Page) => {
    const newPage: Page = {
      ...page,
      id: Date.now().toString(),
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      status: 'draft',
      lastModified: new Date().toISOString().split("T")[0],
      views: 0
    };
    setPages([newPage, ...pages]);
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Alert variant="info">
        <AlertIcon variant="info" />
        <AlertTitle>{"Title"}</AlertTitle>
        <AlertDescription>
          {"Description"}
        </AlertDescription>
      </Alert>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={"Search Pages"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          {"Create New Page"}
        </Button>
      </div>

      {showCreateForm && (
        <Card className="border border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">{"Create New Page"}</CardTitle>
                <CardDescription className="text-white/80">
                  {"Choose Template"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid gap-4">
              <div>
                <Label>{"Page Title"}</Label>
                <Input
                  placeholder={"Enter Page Title"}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>{"Url Slug"}</Label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">yourstore.com/</span>
                  <Input 
                    placeholder="page-url"
                    className="font-mono"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-3 block">{"Select Template"}</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {pageTemplates.map((template) => {
                    const Icon = template.icon;
                    const isSelected = selectedTemplate === template.id;
                    
                    return (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={cn(
                          "p-4 rounded-lg border-2 transition-all text-left",
                          isSelected
                            ? "border-primary bg-primary/5 dark:bg-primary/10"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        )}
                      >
                        <Icon className={cn(
                          "w-8 h-8 mb-2",
                          isSelected ? "text-primary" : "text-gray-600 dark:text-gray-400"
                        )} />
                        <p className="font-medium text-sm text-gray-800 dark:text-gray-200">
                          {template.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {template.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button 
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                {"Cancel"}
              </Button>
              <Button
                onClick={handleCreatePage}
                className="bg-gradient-to-r from-primary to-primary/80"
              >
                {"Create Page"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="all">
            {"All Pages"} ({pages.length})
          </TabsTrigger>
          <TabsTrigger value="published">
            {"Published"} ({pages.filter(p => p.status === 'published').length})
          </TabsTrigger>
          <TabsTrigger value="drafts">
            {"Drafts"} ({pages.filter(p => p.status === 'draft').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredPages.length === 0 ? (
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-3" />
                <p className="text-gray-600 dark:text-gray-400">
                  {"No Pages Found"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredPages.map((page) => (
                <Card 
                  key={page.id} 
                  className={cn(
                    "border border-gray-200 dark:border-gray-700 shadow-lg transition-all hover:shadow-xl",
                    page.status === 'draft' && "opacity-75"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "p-3 rounded-lg",
                            page.status === 'published'
                              ? "bg-green-100 dark:bg-green-900/20"
                              : "bg-gray-100 dark:bg-gray-900"
                          )}>
                            <FileText className={cn(
                              "w-6 h-6",
                              page.status === 'published'
                                ? "text-green-600 dark:text-green-400"
                                : "text-gray-600 dark:text-gray-400"
                            )} />
                          </div>
                          
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                {page.title}
                              </h3>
                              <Badge 
                                variant={page.status === 'published' ? 'default' : 'secondary'}
                                className={cn(
                                  page.status === 'published'
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                    : ""
                                )}
                              >
                                {page.status}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Link className="w-4 h-4" />
                              <span className="font-mono">/{page.slug}</span>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500 mt-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {"Modified"}: {page.lastModified}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {page.author}
                              </span>
                              {page.status === 'published' && (
                                <span className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {page.views} {"Views"}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusToggle(page.id)}
                          title={page.status === 'published' ? "Unpublish" : "Publish"}
                        >
                          {page.status === 'published' ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Edit className="w-4 h-4" />
                              {"Edit Page"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="gap-2"
                              onClick={() => handleDuplicatePage(page)}
                            >
                              <Copy className="w-4 h-4" />
                              {"Duplicate"}
                            </DropdownMenuItem>
                            {page.status === 'published' && (
                              <DropdownMenuItem className="gap-2">
                                <Eye className="w-4 h-4" />
                                {"View Page"}
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="gap-2">
                              <Settings className="w-4 h-4" />
                              {"Seo Settings"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="gap-2 text-red-600 dark:text-red-400"
                              onClick={() => handleDeletePage(page.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                              {"Delete"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          {filteredPages.filter(p => p.status === 'published').map((page) => (
            <Card key={page.id} className="border border-gray-200 dark:border-gray-700 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
                        <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                          {page.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Link className="w-4 h-4" />
                          <span className="font-mono">/{page.slug}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {page.views} {"Views"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          {filteredPages.filter(p => p.status === 'draft').map((page) => (
            <Card key={page.id} className="border border-gray-200 dark:border-gray-700 shadow-lg opacity-75">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-900">
                        <FileText className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                          {page.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Link className="w-4 h-4" />
                          <span className="font-mono">/{page.slug}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStatusToggle(page.id)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                {"Custom Code"}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {"Custom Code Description"}
              </p>
              <Button variant="outline" size="sm">
                {"Configure Custom Code"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PagesManagementSection;