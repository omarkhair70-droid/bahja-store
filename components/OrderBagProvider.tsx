'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ORDER_BAG_STORAGE_KEY, OrderBagItem, makeItemKey } from '@/lib/order-bag';

type AddPayload = Omit<OrderBagItem, 'quantity'> & { quantity?: number };

type OrderBagContextValue = {
  items: OrderBagItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (payload: AddPayload) => void;
  removeItem: (item: Pick<OrderBagItem, 'productSlug' | 'selectedSize'>) => void;
  updateQuantity: (item: Pick<OrderBagItem, 'productSlug' | 'selectedSize'>, quantity: number) => void;
  updateNote: (item: Pick<OrderBagItem, 'productSlug' | 'selectedSize'>, note: string) => void;
  clearBag: () => void;
  totalItems: number;
};

const OrderBagContext = createContext<OrderBagContextValue | null>(null);

export function OrderBagProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderBagItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(ORDER_BAG_STORAGE_KEY);
    if (!raw) return;
    try { setItems(JSON.parse(raw)); } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(ORDER_BAG_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<OrderBagContextValue>(() => ({
    items,
    isOpen,
    setIsOpen,
    addItem: (payload) => {
      const quantity = payload.quantity ?? 1;
      setItems((prev) => {
        const key = makeItemKey(payload);
        const idx = prev.findIndex((p) => makeItemKey(p) === key);
        if (idx === -1) return [...prev, { ...payload, quantity }];
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity, customNote: payload.customNote ?? copy[idx].customNote };
        return copy;
      });
      setIsOpen(true);
    },
    removeItem: (item) => setItems((prev) => prev.filter((p) => makeItemKey(p) !== makeItemKey(item))),
    updateQuantity: (item, quantity) => setItems((prev) => prev.map((p) => makeItemKey(p) === makeItemKey(item) ? { ...p, quantity: Math.max(1, quantity) } : p)),
    updateNote: (item, note) => setItems((prev) => prev.map((p) => makeItemKey(p) === makeItemKey(item) ? { ...p, customNote: note } : p)),
    clearBag: () => setItems([]),
    totalItems: items.reduce((sum, i) => sum + i.quantity, 0)
  }), [isOpen, items]);

  return <OrderBagContext.Provider value={value}>{children}</OrderBagContext.Provider>;
}

export function useOrderBag() {
  const ctx = useContext(OrderBagContext);
  if (!ctx) throw new Error('useOrderBag must be used within OrderBagProvider');
  return ctx;
}
