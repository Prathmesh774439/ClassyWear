import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const sellerName = product?.seller?.name || product?.seller?.email || 'Seller';

  return (
    <article className="product-tile group relative overflow-hidden rounded-editorial border border-line bg-surface">
      <Link to={`/product/${product?._id}`} className="focus-ring block" aria-label={`View ${product?.title || 'product'} details`}>
        <div className="relative overflow-hidden bg-elevated">
          <img src={product?.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'} alt={product?.title || 'Product image'} loading="lazy" className="aspect-[4/4.8] w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
          <span className="absolute left-4 top-4 z-10 inline-flex rounded-full border border-white/30 bg-[#183d32]/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">{product?.published ? 'Available now' : 'Coming soon'}</span>
          <span className="absolute bottom-4 right-4 z-10 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-[#f7f4eb] text-[#183d32] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden="true">↗</span>
        </div>
      </Link>
      <div className="relative z-10 space-y-3 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0"><p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-muted">By {sellerName}</p><h3 className="truncate font-display text-xl font-semibold leading-tight tracking-[-0.035em] text-ink">{product?.title || 'Untitled piece'}</h3></div>
          <p className="shrink-0 pt-1 font-display text-lg font-semibold tracking-tight text-ink">₹{product?.price?.amount ?? 0}</p>
        </div>
        <p className="line-clamp-2 min-h-10 text-sm leading-5 text-muted">{product?.description || 'A thoughtful addition to your everyday.'}</p>
        <div className="flex items-center justify-between border-t border-line pt-3"><span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Considered, always</span><Link to={`/product/${product?._id}`} className="text-xs font-bold text-brand-600 transition hover:text-brand-700 focus-visible:outline-none focus-visible:underline">Discover piece <span aria-hidden="true">→</span></Link></div>
      </div>
    </article>
  );
}
