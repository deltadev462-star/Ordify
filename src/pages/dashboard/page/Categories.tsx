// Removed unused imports: AppSidebar, SidebarInset/SidebarProvider, Header
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { useNavigate } from "react-router-dom";
import Empty from "@/components/Empty";
import { Plus, SquarePlay, Edit2, Trash2, Package, ShoppingBag, Smartphone, Shirt, Home, Heart, Book, Gamepad2, MoreVertical, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

// Mock categories data
const mockCategories = [
  {
    id: 1,
    name: "Electronics",
    nameAr: "الإلكترونيات",
    description: "Smartphones, laptops, and other electronic devices",
    icon: Smartphone,
    productCount: 245,
    isActive: true,
    color: "from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20",
    borderColor: "border-blue-500/20 dark:border-blue-500/30",
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  {
    id: 2,
    name: "Fashion",
    nameAr: "الأزياء",
    description: "Clothing, shoes, and accessories for all styles",
    icon: Shirt,
    productCount: 189,
    isActive: true,
    color: "from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20",
    borderColor: "border-purple-500/20 dark:border-purple-500/30",
    iconColor: "text-purple-600 dark:text-purple-400"
  },
  {
    id: 3,
    name: "Home & Garden",
    nameAr: "المنزل والحديقة",
    description: "Furniture, decor, and garden essentials",
    icon: Home,
    productCount: 156,
    isActive: true,
    color: "from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20",
    borderColor: "border-green-500/20 dark:border-green-500/30",
    iconColor: "text-green-600 dark:text-green-400"
  },
  {
    id: 4,
    name: "Beauty & Health",
    nameAr: "الجمال والصحة",
    description: "Cosmetics, skincare, and health products",
    icon: Heart,
    productCount: 98,
    isActive: true,
    color: "from-rose-500/10 to-pink-500/10 dark:from-rose-500/20 dark:to-pink-500/20",
    borderColor: "border-rose-500/20 dark:border-rose-500/30",
    iconColor: "text-rose-600 dark:text-rose-400"
  },
  {
    id: 5,
    name: "Books & Media",
    nameAr: "الكتب والوسائط",
    description: "Books, magazines, and digital content",
    icon: Book,
    productCount: 67,
    isActive: false,
    color: "from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20",
    borderColor: "border-amber-500/20 dark:border-amber-500/30",
    iconColor: "text-amber-600 dark:text-amber-400"
  },
  {
    id: 6,
    name: "Sports & Gaming",
    nameAr: "الرياضة والألعاب",
    description: "Sports equipment and gaming accessories",
    icon: Gamepad2,
    productCount: 134,
    isActive: true,
    color: "from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20",
    borderColor: "border-indigo-500/20 dark:border-indigo-500/30",
    iconColor: "text-indigo-600 dark:text-indigo-400"
  }
];

function Categories() {
  const navigate = useNavigate();
  const [categories] = useState(mockCategories);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<typeof mockCategories[0] | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    description: '',
    isActive: true,
    sortOrder: 0
  });

  const handleEdit = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        nameAr: category.nameAr,
        description: category.description,
        isActive: category.isActive,
        sortOrder: 0 // Default value, you can add this to mock data if needed
      });
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = (categoryId: number) => {
    // In a real app, you would show a confirmation dialog and delete the category
    console.log('Delete category:', categoryId);
  };

  const handleView = (categoryId: number) => {
    // Navigate to view category products
    navigate(`/dashboard/products?category=${categoryId}`);
  };

  const handleSaveEdit = () => {
    // In a real app, you would send the data to the backend
    console.log('Save category:', formData);
    setIsEditModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div >
      <div className="flex bg-white dark:bg-transparent rounded-2xl m-1 flex-1 flex-col gap-4 p-4 pt-0">
        <NotActive />
        <div className="flex justify-between items-center mb-6">
          <Title
            title={"Categories"}
            Subtitle={"Manage and organize your product categories"}
            className="text-3xl"
            classNamee=""
          />
          <div className="flex gap-2">
            <Button
              onClick={() => navigate('/dashboard/products/categories/new')}
              className="bg-primary hover:bg-primary/90 border-0 rounded-2xl text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus size={16} className="ml-1" /> {"Create  Category"}
            </Button>
            <Button className="bg-[#252525] border-0 md:mb-0 rounded-2xl text-white/80 hover:text-white">
              {"How to  Create  Categories"} <SquarePlay size={16} />
            </Button>
          </div>
        </div>

        {categories.length === 0 ? (
          <Empty className={" "} Name={"Categories".toLowerCase()} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  onMouseEnter={() => setHoveredId(category.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`
                    relative overflow-hidden rounded-2xl border-2
                    ${category.borderColor}
                    bg-gradient-to-br ${category.color}
                    backdrop-blur-sm
                    transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]
                    cursor-pointer group
                  `}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br from-black/10 to-transparent" />
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-tl from-black/10 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className={`
                        p-3 rounded-xl bg-white/50 dark:bg-black/20
                        backdrop-blur-sm shadow-lg
                        ${hoveredId === category.id ? 'scale-110 rotate-3' : ''}
                        transition-all duration-300
                      `}>
                        <Icon className={`h-6 w-6 ${category.iconColor}`} />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={category.isActive ? "default" : "secondary"}
                          className={`
                            ${category.isActive
                              ? 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30'
                              : 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30'
                            }
                          `}
                        >
                          {category.isActive ? "Active" : "Inactive"}
                        </Badge>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-xl hover:bg-black/10 dark:hover:bg-white/10"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl">
                            <DropdownMenuItem
                              onClick={() => handleView(category.id)}
                              className="rounded-lg cursor-pointer"
                            >
                              <Eye className="ml-2 h-4 w-4" />
                              {"View  Products"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEdit(category.id)}
                              className="rounded-lg cursor-pointer"
                            >
                              <Edit2 className="ml-2 h-4 w-4" />
                              {"Edit"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(category.id)}
                              className="rounded-lg cursor-pointer text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="ml-2 h-4 w-4" />
                              {"Delete"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Category Info */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                      
                      {/* Product Count */}
                      <div className="flex items-center gap-2 pt-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">
                          {category.productCount} {"Products"}
                        </span>
                      </div>
                    </div>

                    {/* Hover Actions */}
                    <div className={`
                      absolute bottom-0 left-0 right-0 p-4
                      bg-gradient-to-t from-black/10 dark:from-black/30 to-transparent
                      transform ${hoveredId === category.id ? 'translate-y-0' : 'translate-y-full'}
                      transition-transform duration-300
                    `}>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleEdit(category.id)}
                          className="flex-1 rounded-xl bg-white/90 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70 text-foreground"
                        >
                          <Edit2 className="h-4 w-4 ml-1" />
                          {"Edit"}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleView(category.id)}
                          variant="secondary"
                          className="flex-1 rounded-xl"
                        >
                          <ShoppingBag className="h-4 w-4 ml-1" />
                          {"View"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Category Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{"Edit"} {"Category"}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Category Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  {"Category  Name"} (English)
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Electronics"
                  className="rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nameAr">
                  {"Category  Name"} (العربية)
                </Label>
                <Input
                  id="nameAr"
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  placeholder="مثال: الإلكترونيات"
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                {"Description"}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={""}
                className="rounded-xl min-h-[100px]"
                rows={4}
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/50">
              <div className="space-y-0.5">
                <Label htmlFor="isActive" className="text-base">
                  {"Active  Status"}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {"Enable this category to be visible in your store"}
                </p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                className="data-[state=checked]:bg-green-500 dark:data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700"
              />
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <Label htmlFor="sortOrder">
                {"Sort  Order"}
              </Label>
              <Input
                id="sortOrder"
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                placeholder="0"
                className="rounded-xl"
              />
              <p className="text-xs text-muted-foreground">
                {"Lower numbers appear first"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              className="rounded-xl"
            >
              {"Cancel"}
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="rounded-xl bg-primary hover:bg-primary/90"
            >
              {"Save  Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Categories;
