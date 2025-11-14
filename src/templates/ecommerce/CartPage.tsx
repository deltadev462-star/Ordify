import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: {
    size?: string;
    color?: string;
  };
}

interface CartPageProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
}

const CartPage: React.FC<CartPageProps> = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onContinueShopping,
}) => {
  const { currentTheme } = useTheme();

  if (items.length === 0) {
    return (
      <div className={`theme-${currentTheme} cart-page`}>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h1>
            <p className="mb-8 text-gray-600">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button onClick={onContinueShopping}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`theme-${currentTheme} cart-page`}>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <a href="/" className="hover:text-primary">Home</a>
          <span>/</span>
          <span className="text-gray-900">Shopping Cart</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-lg border bg-white p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded object-cover"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    
                    {item.variant && (
                      <div className="mt-1 text-sm text-gray-500">
                        {item.variant.size && `Size: ${item.variant.size}`}
                        {item.variant.size && item.variant.color && " • "}
                        {item.variant.color && `Color: ${item.variant.color}`}
                      </div>
                    )}
                    
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))}
                          className="rounded border p-1 hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                          className="rounded border p-1 hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => onRemoveItem?.(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <Button variant="outline" onClick={onContinueShopping}>
                Continue Shopping
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Button
                className="mt-6 w-full"
                onClick={onCheckout}
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>Free shipping on orders over $50</p>
                <p>30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;