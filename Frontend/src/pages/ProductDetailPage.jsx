import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../api';
import { useAuth } from '../context/AuthContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, authApiRequest } = useAuth();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await apiRequest('/products');
        const foundProduct = (data.products || []).find((item) => item._id === id);

        if (!foundProduct) {
          setError('Product not found');
          setProduct(null);
          return;
        }

        setProduct(foundProduct);
        setSelectedImage(foundProduct.images?.[0] || '');
      } catch (err) {
        setError(err.message || 'Product could not be loaded');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  const sellerName = useMemo(
    () => product?.seller?.name || product?.seller?.email || 'Seller',
    [product]
  );

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!selectedSize) {
      setError('Please select a size before adding to cart.');
      return;
    }

    try {
      setAdding(true);
      setError('');
      await authApiRequest('/cart/add', {
        method: 'POST',
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
          size: selectedSize,
          selectedSize
        })
      });
      navigate('/cart');
    } catch (err) {
      setError(err.message || 'Unable to add product to cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">Loading product...</div>;
  }

  if (error && !product) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
        {error}
      </div>
    );
  }

  const sizes = product?.sizes || [];

  return (
    <div className="space-y-8 py-6">
      <Link to="/" className="inline-flex text-sm font-medium text-brand-600 hover:text-brand-700">
        ← Back to products
      </Link>

      <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-2 lg:p-8">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <img
              src={selectedImage || product?.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'}
              alt={product?.title}
              className="h-[420px] w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {(product?.images?.length ? product.images : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80']).map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`overflow-hidden rounded-xl border ${selectedImage === image ? 'border-brand-600' : 'border-slate-200'} bg-slate-100`}
              >
                <img src={image} alt={`${product?.title} ${index + 1}`} className="h-20 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">{sellerName}</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900">{product?.title}</h1>
          </div>

          <p className="text-3xl font-bold text-slate-900">₹{product?.price?.amount ?? 0}</p>
          <p className="text-base leading-7 text-slate-600">{product?.description}</p>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Select size</p>
            <div className="flex flex-wrap gap-3">
              {sizes.length > 0 ? (
                sizes.map((item) => (
                  <button
                    key={`${item?.size}-${item?.stock}`}
                    type="button"
                    onClick={() => setSelectedSize(item.size)}
                    className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                      selectedSize === item.size
                        ? 'border-brand-600 bg-brand-50 text-brand-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {item.size}
                  </button>
                ))
              ) : (
                <p className="text-sm text-slate-500">No sizes available.</p>
              )}
            </div>
          </div>

          {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={adding || sizes.length === 0}
            className="primary-button w-full disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {adding ? 'Adding to cart...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
