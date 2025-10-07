import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';
import toast from 'react-hot-toast';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, selectedSize: string, selectedColor: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, selectedSize, selectedColor, quantity) => {
        // Convert to string if it's an object
        const sizeStr = typeof selectedSize === 'object' ? JSON.stringify(selectedSize) : String(selectedSize);
        const colorStr = typeof selectedColor === 'object' ? JSON.stringify(selectedColor) : String(selectedColor);
        
        set((state) => {
          const existingItem = state.items.find(
            (item) => 
              item.product._id === product._id && 
              item.selectedSize === sizeStr && 
              item.selectedColor === colorStr
          );
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item === existingItem
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, { 
              product, 
              selectedSize: sizeStr, 
              selectedColor: colorStr, 
              quantity 
            }],
          };
        });
        toast.success('Added to cart!');
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== productId),
        }));
        toast.success('Removed from cart');
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalPrice: () => {
        const items = get().items;
        return items.reduce((total, item) => {
          const price = typeof item.product.price === 'number' ? item.product.price : 0;
          return total + price * item.quantity;
        }, 0);
      },
      
      getTotalItems: () => {
        const items = get().items;
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);