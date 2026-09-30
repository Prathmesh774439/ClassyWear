import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);

const formatDateTime = (date) =>
  new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);

export default function CartPage() {
  const { isAuthenticated, authApiRequest, user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const mapCartItems = (cartData) => {
    const cartItems = cartData?.items || [];
    return cartItems
      .filter((item) => item && item.product)
      .map((item) => ({
        itemId: item._id,
        productId: item.productId,
        quantity: item.quantity || 1,
        size: item.selectedSize || item.size || 'M',
        product: item.product
      }));
  };

  useEffect(() => {
    async function loadCart() {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await authApiRequest('/cart');
        const cart = data?.cart || {};
        setItems(mapCartItems(cart));
      } catch (err) {
        setError(err.message || 'Unable to load cart');
      } finally {
        setLoading(false);
      }
    }

    loadCart();
  }, [authApiRequest, isAuthenticated]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + (item.product?.price?.amount || 0) * item.quantity, 0),
    [items]
  );

  const updateQuantity = async (itemId, nextQuantity) => {
    const safeQuantity = Math.max(1, Number(nextQuantity) || 1);

    try {
      await authApiRequest(`/cart/item/${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity: safeQuantity })
      });

      const data = await authApiRequest('/cart');
      setItems(mapCartItems(data?.cart || {}));
    } catch (err) {
      setError(err.message || 'Unable to update quantity');
    }
  };

  const removeItem = async (itemId) => {
    try {
      await authApiRequest(`/cart/item/${itemId}`, {
        method: 'DELETE'
      });

      const data = await authApiRequest('/cart');
      setItems(mapCartItems(data?.cart || {}));
    } catch (err) {
      setError(err.message || 'Unable to remove item');
    }
  };

  const handleCheckout = () => {
    const orderedAt = new Date();
    const arrivalDate = new Date(orderedAt.getTime() + 4 * 24 * 60 * 60 * 1000);

    setOrderDetails({
      orderId: `D28-${Math.floor(100000 + Math.random() * 900000)}`,
      orderedAt,
      arrivalDate,
      paymentMethod: 'Cash on Delivery',
      status: 'Shipped',
      customer: user?.name || 'Customer',
      address: 'Bengaluru, Karnataka, India',
      items: items.map((item) => ({
        name: item.product?.title,
        size: item.size,
        quantity: item.quantity,
        total: (item.product?.price?.amount || 0) * item.quantity
      }))
    });
    setOrderPlaced(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="mt-3 text-slate-600">Please sign in to view and manage your cart.</p>
        <Link to="/login" className="primary-button mt-6">
          Sign in to continue
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">Loading cart...</div>;
  }

  if (error) {
    return <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">{error}</div>;
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="mt-3 text-slate-600">Add a few products to get started.</p>
        <Link to="/" className="primary-button mt-6">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (orderPlaced && orderDetails) {
    const trackingSteps = [
      { label: 'Order placed', date: formatDateTime(orderDetails.orderedAt), done: true },
      { label: 'Packed', date: 'Today, 2:15 PM', done: true },
      { label: 'Shipped', date: 'Tomorrow, 9:40 AM', done: true },
      { label: 'Out for delivery', date: 'Expected 1 day before arrival', done: false },
      { label: 'Delivered', date: `By ${formatDate(orderDetails.arrivalDate)}`, done: false }
    ];

    return (
      <div className="space-y-8 py-6">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold text-white">✓</div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Order confirmed</p>
                <h1 className="mt-2 text-3xl font-bold text-slate-900">Your order has been placed successfully</h1>
              </div>
            </div>
            <Link to="/" className="secondary-button">
              Continue shopping
            </Link>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Order number</p>
                  <h2 className="text-2xl font-bold text-slate-900">{orderDetails.orderId}</h2>
                </div>
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                  {orderDetails.status}
                </span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Ordered date</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{formatDateTime(orderDetails.orderedAt)}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Arrival date</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{formatDate(orderDetails.arrivalDate)}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Payment mode</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{orderDetails.paymentMethod}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Tracking</h3>
              <div className="mt-6 space-y-5">
                {trackingSteps.map((step, index) => (
                  <div key={step.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${step.done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-white text-slate-400'}`}>
                        {step.done ? '✓' : index + 1}
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div className={`mt-2 h-10 w-px ${step.done ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                      )}
                    </div>

                    <div className="flex-1 pt-1">
                      <div className="flex items-center justify-between gap-4">
                        <p className={`font-semibold ${step.done ? 'text-slate-900' : 'text-slate-500'}`}>{step.label}</p>
                        {step.done && <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-700">Done</span>}
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Delivery details</h3>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between gap-4">
                  <span>Customer</span>
                  <span className="font-medium text-slate-900">{orderDetails.customer}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Address</span>
                  <span className="max-w-[180px] text-right font-medium text-slate-900">{orderDetails.address}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>ETA</span>
                  <span className="font-medium text-slate-900">{formatDate(orderDetails.arrivalDate)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Ordered items</h3>
              <div className="mt-5 space-y-4">
                {orderDetails.items.map((item, index) => (
                  <div key={`${item.name}-${index}`} className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-500">Size: {item.size}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Qty {item.quantity}</p>
                      <p className="font-semibold text-slate-900">₹{item.total}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Shopping bag</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Cart</h1>
        </div>

        <Link to="/" className="secondary-button">
          Continue shopping
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.7fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={`${item.itemId}-${item.size}`} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
              <img
                src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'}
                alt={item.product?.title}
                className="h-28 w-full rounded-2xl object-cover sm:w-32"
              />

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{item.product?.title}</h2>
                    <p className="text-sm text-slate-500">Size: {item.size}</p>
                  </div>
                  <button type="button" onClick={() => removeItem(item.itemId)} className="text-sm font-medium text-red-600 hover:text-red-700">
                    Remove
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                      className="h-10 w-10 text-xl font-medium text-slate-700"
                    >
                      −
                    </button>
                    <span className="min-w-12 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                      className="h-10 w-10 text-xl font-medium text-slate-700"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-xl font-bold text-slate-900">₹{(item.product?.price?.amount || 0) * item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Order summary</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>
          </div>

          <button type="button" onClick={handleCheckout} className="primary-button mt-6 w-full">
            Proceed to Checkout (COD)
          </button>
        </aside>
      </div>
    </div>
  );
}
