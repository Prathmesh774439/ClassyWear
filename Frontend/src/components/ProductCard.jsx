import { Link } from 'react-router';

export default function ProductCard({ product }) {
  const sellerName = product?.seller?.name || product?.seller?.email || 'Seller';

  return (
    <article className="product-tile group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden bg-slate-100">
        <img
          src={product?.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'}
          alt={product?.title || 'Product image'}
          className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700">
              {product?.published ? 'Live' : 'Draft'}
            </span>
            <span className="text-sm text-slate-500">by {sellerName}</span>
          </div>

          <h3 className="text-xl font-semibold text-slate-900">{product?.title || 'Product title'}</h3>
        </div>

        <p className="text-sm leading-6 text-slate-600 line-clamp-3">
          {product?.description || 'Product description'}
        </p>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Price</p>
            <p className="text-2xl font-bold text-slate-900">₹{product?.price?.amount ?? 0}</p>
          </div>

          <Link
            to={`/product/${product?._id}`}
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
