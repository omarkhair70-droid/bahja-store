'use client';

import { BagSize } from '@/lib/order-bag';

const SIZES: { value: BagSize; label: string }[] = [
  { value: 'Small', label: 'Small / صغير' },
  { value: 'Medium', label: 'Medium / متوسط' },
  { value: 'Large', label: 'Large / كبير' }
];

export default function ProductOptions({ isBag, size, setSize, quantity, setQuantity, note, setNote }: {
  isBag: boolean;
  size?: BagSize;
  setSize: (v: BagSize) => void;
  quantity: number;
  setQuantity: (v: number) => void;
  note: string;
  setNote: (v: string) => void;
}) {
  return (
    <div className="space-y-3 rounded-2xl border border-bahja-beige/60 bg-white/70 p-3.5 sm:p-4">
      {isBag && <div className="space-y-2"><p className="text-sm text-bahja-taupe">المقاس</p><div className="flex flex-wrap gap-2">{SIZES.map((s)=><button key={s.value} onClick={()=>setSize(s.value)} className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm ${size===s.value ? 'border-bahja-brown bg-bahja-brown text-white' : 'border-bahja-beige bg-white/80'}`}>{s.label}</button>)}</div></div>}
      <div className="space-y-2"><p className="text-sm text-bahja-taupe">الكمية</p><div className="flex items-center gap-2"><button onClick={()=>setQuantity(Math.max(1, quantity-1))} className="rounded-full border border-bahja-beige bg-white/70 px-3 py-1">-</button><span className="min-w-8 text-center">{quantity}</span><button onClick={()=>setQuantity(quantity+1)} className="rounded-full border border-bahja-beige bg-white/70 px-3 py-1">+</button></div></div>
      <div className="space-y-2"><label className="text-sm text-bahja-taupe">اللون أو التفاصيل المطلوبة</label><textarea value={note} onChange={(e)=>setNote(e.target.value)} className="min-h-20 w-full rounded-2xl border border-bahja-beige bg-bahja-ivory/70 p-3 text-sm outline-none focus:border-bahja-rose" /></div>
    </div>
  );
}
