'use client';

import { BagSize } from '@/lib/order-bag';

const SIZES: BagSize[] = ['Small', 'Medium', 'Large'];

export default function ProductOptions({ isBag, size, setSize, quantity, setالكمية, note, setNote }: {
  isBag: boolean;
  size?: BagSize;
  setSize: (v: BagSize) => void;
  quantity: number;
  setالكمية: (v: number) => void;
  note: string;
  setNote: (v: string) => void;
}) {
  return (
    <div className="space-y-4 rounded-3xl border border-bahja-beige/70 bg-white/75 p-4">
      {isBag && <div className="space-y-2"><p className="text-sm text-bahja-taupe">اختاري المقاس</p><div className="flex flex-wrap gap-2">{SIZES.map((s)=><button key={s} onClick={()=>setSize(s)} className={`rounded-full border px-4 py-1.5 text-sm ${size===s ? 'border-bahja-brown bg-bahja-brown text-white' : 'border-bahja-beige'}`}>{s}</button>)}</div></div>}
      <div className="space-y-2"><p className="text-sm text-bahja-taupe">الكمية</p><div className="flex items-center gap-2"><button onClick={()=>setالكمية(Math.max(1, quantity-1))} className="rounded-full border border-bahja-beige px-3 py-1">-</button><span className="min-w-8 text-center">{quantity}</span><button onClick={()=>setالكمية(quantity+1)} className="rounded-full border border-bahja-beige px-3 py-1">+</button></div></div>
      <div className="space-y-2"><label className="text-sm text-bahja-taupe">اللون أو التفاصيل المطلوبة</label><textarea value={note} onChange={(e)=>setNote(e.target.value)} className="min-h-24 w-full rounded-2xl border border-bahja-beige bg-bahja-ivory/70 p-3 text-sm outline-none focus:border-bahja-rose" /></div>
    </div>
  );
}
