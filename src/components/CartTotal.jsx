import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const [cartAmount, setCartAmount] = useState(0);

  useEffect(() => {
    const fetchCartAmount = async () => {
      const amount = await getCartAmount();
      setCartAmount(amount);
    };
    
    fetchCartAmount();
  }, [getCartAmount]);

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>
      
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {cartAmount.toFixed(2)}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee.toFixed(2)}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency} {cartAmount === 0 ? 0 : (cartAmount + delivery_fee).toFixed(2)}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal