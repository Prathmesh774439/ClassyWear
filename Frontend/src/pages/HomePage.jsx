import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		async function loadProducts() {
			try {
				const data = await apiRequest('/products');
				setProducts(data.products || []);
			} catch (err) {
				setError(err.message || 'Unable to load products');
			} finally {
				setLoading(false);
			}
		}
		loadProducts();
	}, []);

	return (
		<div className="space-y-16 py-6 sm:space-y-24 sm:py-10">
			<section className="relative isolate overflow-hidden rounded-editorial bg-[#183d32] px-6 py-12 text-[#f7f4eb] shadow-lift sm:px-12 sm:py-16 lg:min-h-[440px] lg:px-16 lg:py-20">
				<div className="absolute -right-20 -top-28 -z-10 h-[430px] w-[430px] rounded-full border border-white/15" />
				<div className="absolute -right-4 -top-12 -z-10 h-[300px] w-[300px] rounded-full border border-white/15" />
				<div className="absolute bottom-[-90px] right-[17%] -z-10 h-64 w-64 rounded-full bg-[#c2a97b]/15 blur-3xl" />
				<div className="grid gap-12 lg:grid-cols-[1.1fr_.7fr] lg:items-end">
					<div className="max-w-3xl">
						<p className="hero-enter mb-7 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.24em] text-[#d7bd8b]"><span className="h-1.5 w-1.5 rounded-full bg-[#e99571]" /> Curated for the everyday</p>
						<h1 className="hero-enter-delay font-display text-[clamp(3.4rem,9vw,8rem)] font-semibold leading-[.84] tracking-[-.075em]">Objects<br />with <span className="font-normal italic text-[#d7bd8b]">intention.</span></h1>
					</div>
					<div className="hero-enter-delay max-w-sm lg:justify-self-end" style={{ animationDelay: '280ms' }}>
						<p className="text-base leading-7 text-[#e4e6db] sm:text-lg">Considered pieces, made to move with you. A little less noise; a lot more of what feels like you.</p>
						<div className="mt-7 flex flex-wrap gap-3">
							<a href="#catalog" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#d7bd8b] px-6 text-sm font-bold text-[#1e2723] transition hover:-translate-y-0.5 hover:bg-[#e4cea4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40">Explore the edit <span aria-hidden="true">↓</span></a>
							<Link to="/cart" className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40">Your bag <span aria-hidden="true" className="ml-2">↗</span></Link>
						</div>
						<p className="mt-8 text-[10px] font-bold uppercase tracking-[.2em] text-white/65">Day 28 · Edition No. 01</p>
					</div>
				</div>
			</section>

			<section id="catalog" className="scroll-mt-28">
				<div className="mb-8 flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
					<div><p className="mb-2 text-[10px] font-bold uppercase tracking-[.22em] text-brand-600">The considered collection</p><h2 className="font-display text-4xl font-semibold leading-none tracking-[-.055em] text-ink sm:text-5xl">Find your everyday.</h2></div>
					{!loading && !error && products.length > 0 && <p className="text-sm font-medium text-muted">{products.length} {products.length === 1 ? 'piece' : 'pieces'} to explore</p>}
				</div>
				{loading ? (
					<div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-live="polite">
						{Array.from({ length: 6 }).map((_, index) => <div key={index} className="space-y-4"><div className="skeleton aspect-[4/4.8] rounded-editorial" /><div className="skeleton h-4 w-2/3 rounded-full" /><div className="skeleton h-4 w-1/3 rounded-full" /></div>)}
						<span className="sr-only">Loading products</span>
					</div>
				) : error ? (
					<div role="alert" className="rounded-editorial border border-line bg-surface p-8 shadow-soft sm:p-12"><p className="font-display text-3xl font-semibold text-ink">The shelves didn&apos;t load.</p><p className="mt-3 max-w-lg leading-7 text-muted">{error}. Check your connection and try again.</p><button type="button" onClick={() => window.location.reload()} className="primary-button mt-6">Try again</button></div>
				) : products.length === 0 ? (
					<div className="rounded-editorial border border-dashed border-line bg-surface px-6 py-16 text-center"><p className="font-display text-3xl font-semibold text-ink">A little quiet on the shelves.</p><p className="mx-auto mt-3 max-w-md text-muted">Our first finds are being prepared. Check back soon for considered pieces to make your own.</p></div>
				) : (
					<div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{products.map((product, index) => <div key={product._id} className="hero-enter" style={{ animationDelay: `${Math.min(index, 5) * 70}ms` }}><ProductCard product={product} /></div>)}</div>
				)}
			</section>
		</div>
	);
}
