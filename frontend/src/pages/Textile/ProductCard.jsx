import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Adjust based on your i18n setup
import api from '../../api/client'; // Must use the existing client as per instructions

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  
  // States: 'idle' | 'loading' | 'success' | 'unauthorized'
  const [cartStatus, setCartStatus] = useState('idle');

  const handleAddToCart = async () => {
    setCartStatus('loading');
    
    try {
      // Send POST /api/cart/items/ with sku and qty: 1
      await api.post('/api/cart/items/', {
        sku: product.sku,
        qty: 1
      });
      
      // Show success directly on the card
      setCartStatus('success');
      
      // Optional: Reset button after a few seconds
      setTimeout(() => setCartStatus('idle'), 3000);
      
    } catch (error) {
      // Handle 401 Unauthorized directly on the card, do not redirect to /account
      if (error.response && error.response.status === 401) {
        setCartStatus('unauthorized');
      } else {
        setCartStatus('idle');
        console.error("Cart error:", error);
      }
    }
  };

  return (
    <div className="product-card">
      {/* Existing product display code (Image, Name, Price, etc.) */}
      <h3>{product.name}</h3>
      <p>{product.price} AMD</p>

      {/* Cart Button & Status Messages */}
      <div className="cart-actions">
        {cartStatus === 'unauthorized' && (
          <p className="error-msg">{t('textile_cart_401')}</p>
        )}
        
        {cartStatus === 'success' && (
          <p className="success-msg">{t('textile_cart_success')}</p>
        )}

        {cartStatus !== 'success' && (
          <button 
            onClick={handleAddToCart} 
            disabled={cartStatus === 'loading'}
          >
            {cartStatus === 'loading' ? '...' : t('textile_cart_add')}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;