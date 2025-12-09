import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Upload, ChevronLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CategoryCreate() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentId: "none",
    image: null as File | null,
    isActive: true,
    sortOrder: "0",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock parent categories - you'll replace this with actual API data
  const parentCategories = [
    { id: "none", name: "No  Parent  Category" },
    { id: "1", name: "Electronics" },
    { id: "2", name: "Clothing" },
    { id: "3", name: "Home & Garden" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    const sortOrderNum = parseInt(formData.sortOrder, 10);
    if (isNaN(sortOrderNum) || sortOrderNum < 0) {
      newErrors.sortOrder = "Sort order must be a positive number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Simulate API call - replace with actual API call
    try {
      // const formDataToSend = new FormData();
      // formDataToSend.append('name', formData.name);
      // formDataToSend.append('description', formData.description);
      // formDataToSend.append('parentId', formData.parentId);
      // formDataToSend.append('isActive', String(formData.isActive));
      // formDataToSend.append('sortOrder', formData.sortOrder);
      // if (formData.image) {
      //   formDataToSend.append('image', formData.image);
      // }
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
      
      // Navigate back to categories list
      navigate('/dashboard/products/categories');
    } catch (error) {
      console.error('Error creating category:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-xl hover:bg-primary/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {"Create  New  Category"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {"Add a new category to organize your products"}
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Card */}
          <div className=" rounded-2xl p-6 shadow-sm border border-border">
            <h2 className="text-lg font-semibold mb-6 text-card-foreground">
              {"Basic  Information"}
            </h2>
            
            <div className="space-y-6">
              {/* Category Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  {"Category  Name"} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={""}
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`rounded-xl h-12 ${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  {"Description"} <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder={""}
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`rounded-xl resize-none ${errors.description ? 'border-destructive' : ''}`}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description}</p>
                )}
              </div>

              {/* Parent Category */}
              <div className="space-y-2">
                <Label htmlFor="parentId" className="text-sm font-medium">
                  {"Parent  Category"}
                </Label>
                <Select
                  value={formData.parentId}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, parentId: value }))}
                >
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue placeholder={"Select parent category"} />
                  </SelectTrigger>
                  <SelectContent>
                    {parentCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Image Upload Card */}
          <div className=" rounded-2xl p-6 shadow-sm border border-border">
            <h2 className="text-lg font-semibold mb-6 text-card-foreground">
              {"Category  Image"}
            </h2>
            
            <div className="space-y-4">
              {!imagePreview ? (
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-xl cursor-pointer bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm font-medium text-muted-foreground">
                      {"Click to upload image"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or WebP (MAX. 2MB)
                    </p>
                  </div>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="Category preview"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 left-2 p-2 bg-background/90 backdrop-blur rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Settings Card */}
          <div className=" rounded-2xl p-6 shadow-sm border border-border">
            <h2 className="text-lg font-semibold mb-6 text-card-foreground">
              {"Settings"}
            </h2>
            
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isActive" className="text-sm font-medium">
                    {"Active  Status"}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {"Enable this category to be visible in your store"}
                  </p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, isActive: checked }))
                  }
                  className="data-[state=checked]:bg-green-500 dark:data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700"
                />
              </div>

              {/* Sort Order */}
              <div className="space-y-2">
                <Label htmlFor="sortOrder" className="text-sm font-medium">
                  {"Sort  Order"}
                </Label>
                <Input
                  id="sortOrder"
                  name="sortOrder"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.sortOrder}
                  onChange={handleInputChange}
                  className={`rounded-xl h-12 w-32 ${errors.sortOrder ? 'border-destructive' : ''}`}
                />
                {errors.sortOrder && (
                  <p className="text-sm text-destructive">{errors.sortOrder}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  {"Lower numbers appear first"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pb-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="rounded-xl"
              disabled={loading}
            >
              {"Cancel"}
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground min-w-[150px]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  {""}
                </div>
              ) : (
                <>
                  {"Create  Category"} <ArrowRight className="mr-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryCreate;
