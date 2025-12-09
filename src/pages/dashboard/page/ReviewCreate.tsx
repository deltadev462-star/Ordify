import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Star, 
  Upload, 
  X, 
  CheckCircle2,
  User,
  Package,
  MessageSquare,
  Image as ImageIcon,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function ReviewCreate() {
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState({
    product: "",
    rating: 5,
    isPublished: false,
    reviewerName: "",
    reviewTitle: "",
    review: "",
    images: [] as File[],
    verifiedPurchase: false,
    recommendProduct: true
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleSave = () => {
    console.log("Saving review:", reviewData);
    navigate("/dashboard/reviews");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setReviewData(prev => ({
        ...prev,
        images: [...prev.images, ...filesArray]
      }));

      // Create previews
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setReviewData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const StarRating = ({ rating, onChange }: { rating: number; onChange: (rating: number) => void }) => {
    const [hovered, setHovered] = useState(0);
    
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-all duration-200 hover:scale-110"
          >
            <Star
              size={28}
              className={cn(
                "transition-all",
                (hovered || rating) >= star
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              )}
            />
          </button>
        ))}
        <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 self-center">
          {rating ? `${rating}.0 out of 5` : "Select rating"}
        </span>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">
            {"Create  New  Review"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {"Add customer feedback for your products"}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/reviews")}
            className="dark:bg-[#2a2a2a] dark:border-[#424242] dark:text-white"
          >
            {"Cancel"}
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white gap-2"
          >
            <Save size={18} />
            {"Save  Review"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="dark:bg-black/80 border-gray-200 dark:border-[#424242]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <MessageSquare size={20} />
                {"Review  Details"}
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                {"Enter the main review information"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Product Selection */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 dark:text-gray-200">
                  <Package size={16} />
                  {"Product"} <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={reviewData.product}
                  onValueChange={(value) => setReviewData(prev => ({ ...prev, product: value }))}
                >
                  <SelectTrigger className="w-full border-gray-200 dark:bg-[#2a2a2a] dark:border-[#424242] dark:text-white">
                    <SelectValue placeholder={"Select a product"} />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-[#2a2a2a] dark:border-[#424242]">
                    <SelectItem value="product1">iPhone 15 Pro Max</SelectItem>
                    <SelectItem value="product2">Samsung Galaxy S24</SelectItem>
                    <SelectItem value="product3">Google Pixel 8 Pro</SelectItem>
                    <SelectItem value="product4">OnePlus 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reviewer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 dark:text-gray-200">
                    <User size={16} />
                    {"Reviewer's Name"} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={reviewData.reviewerName}
                    onChange={(e) => setReviewData(prev => ({ ...prev, reviewerName: e.target.value }))}
                    placeholder={"John  Doe"}
                    className="border-gray-200 dark:bg-[#2a2a2a] dark:border-[#424242] dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="dark:text-gray-200">
                    {"Review  Title"}
                  </Label>
                  <Input
                    value={reviewData.reviewTitle}
                    onChange={(e) => setReviewData(prev => ({ ...prev, reviewTitle: e.target.value }))}
                    placeholder={"Amazing product!"}
                    className="border-gray-200 dark:bg-[#2a2a2a] dark:border-[#424242] dark:text-white"
                  />
                </div>
              </div>

              {/* Rating Section */}
              <div className="space-y-3 p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg">
                <Label className="flex items-center gap-2 dark:text-gray-200">
                  <Star size={16} />
                  {"Rating"} <span className="text-red-500">*</span>
                </Label>
                <StarRating 
                  rating={reviewData.rating} 
                  onChange={(rating) => setReviewData(prev => ({ ...prev, rating }))}
                />
              </div>

              {/* Review Text */}
              <div className="space-y-2">
                <Label className="dark:text-gray-200">
                  {"Review  Content"} <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  value={reviewData.review}
                  onChange={(e) => setReviewData(prev => ({ ...prev, review: e.target.value }))}
                  placeholder={""}
                  className="min-h-[180px] resize-none border-gray-200 dark:bg-[#2a2a2a] dark:border-[#424242] dark:text-white"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {reviewData.review.length}/500 characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Media Section */}
          <Card className="dark:bg-black/80 border-gray-200 dark:border-[#424242]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <ImageIcon size={20} />
                {"Review  Media"}
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                {"Add images to make the review more authentic"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-200 dark:border-[#424242] rounded-lg p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200">
                  <input
                    type="file"
                    id="review-images"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="review-images"
                    className="cursor-pointer block"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                        <Upload size={32} className="text-blue-500 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {"Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing Options */}
          <Card className="dark:bg-black/80 border-gray-200 dark:border-[#424242]">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white">
                {"Publishing  Options"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Published Status */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg">
                <Label
                  htmlFor="review-published"
                  className="cursor-pointer text-sm font-medium dark:text-gray-200 ltr:mr-2 rtl:ml-2"
                >
                  {"Publish  Review"}
                </Label>
                <Switch
                  id="review-published"
                  checked={reviewData.isPublished}
                  onCheckedChange={(checked) => setReviewData(prev => ({ ...prev, isPublished: checked }))}
                  className="data-[state=checked]:!bg-green-500 data-[state=unchecked]:!bg-gray-200 dark:data-[state=unchecked]:!bg-gray-600"
                />
              </div>

              {/* Verified Purchase */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg">
                <Label
                  htmlFor="verified-purchase"
                  className="cursor-pointer text-sm font-medium dark:text-gray-200 ltr:mr-2 rtl:ml-2"
                >
                  {"Verified  Purchase"}
                </Label>
                <Switch
                  id="verified-purchase"
                  checked={reviewData.verifiedPurchase}
                  onCheckedChange={(checked) => setReviewData(prev => ({ ...prev, verifiedPurchase: checked }))}
                  className="data-[state=checked]:!bg-blue-500 data-[state=unchecked]:!bg-gray-200 dark:data-[state=unchecked]:!bg-gray-600"
                />
              </div>

              {/* Recommend Product */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg">
                <Label
                  htmlFor="recommend-product"
                  className="cursor-pointer text-sm font-medium dark:text-gray-200 ltr:mr-2 rtl:ml-2"
                >
                  {"Recommends  Product"}
                </Label>
                <Switch
                  id="recommend-product"
                  checked={reviewData.recommendProduct}
                  onCheckedChange={(checked) => setReviewData(prev => ({ ...prev, recommendProduct: checked }))}
                  className="data-[state=checked]:!bg-green-500 data-[state=unchecked]:!bg-gray-200 dark:data-[state=unchecked]:!bg-gray-600"
                />
              </div>

              <div className="pt-2">
                {reviewData.isPublished ? (
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircle2 size={14} className="mr-1" />
                    Will be published
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="dark:bg-[#2a2a2a] dark:text-gray-400">
                    Draft
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="dark:bg-black/80 border-gray-200 dark:border-[#424242]">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white">
                {"Review  Summary"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Rating</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={cn(
                          i < reviewData.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Images</span>
                  <span className="text-sm font-medium dark:text-white">{reviewData.images.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                  <span className="text-sm font-medium dark:text-white">
                    {reviewData.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ReviewCreate;