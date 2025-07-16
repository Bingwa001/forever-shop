import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'

const PlaceOrder = () => {
  const { navigate } = useContext(ShopContext);
  
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'zipcode', 'phone'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('Please enter a valid phone number');
      return;
    }

    try {
      console.log('Order Data:', { formData, paymentMethod: method });
      
      // Here you would typically send the order to your backend
      // For now, we'll just show a success message
      alert('Order placed successfully!');
      
      // Reset form or navigate to success page
      navigate('/orders'); // or wherever you want to redirect
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ------------------  left side  --------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        
        <div className='flex gap-3'>
          <input 
            required 
            onChange={onChangeHandler} 
            name='firstName' 
            value={formData.firstName} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='First name' 
          />
          <input 
            required 
            onChange={onChangeHandler} 
            name='lastName' 
            value={formData.lastName} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='Last name' 
          />
        </div>
        
        <input 
          required 
          onChange={onChangeHandler} 
          name='email' 
          value={formData.email} 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="email" 
          placeholder='Email address' 
        />
        
        <input 
          required 
          onChange={onChangeHandler} 
          name='street' 
          value={formData.street} 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="text" 
          placeholder='Street address' 
        />
        
        <div className='flex gap-3'>
          <input 
            required 
            onChange={onChangeHandler} 
            name='city' 
            value={formData.city} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='City' 
          />
          <input 
            onChange={onChangeHandler} 
            name='state' 
            value={formData.state} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='State' 
          />
        </div>
        
        <div className='flex gap-3'>
          <input 
            required 
            onChange={onChangeHandler} 
            name='zipcode' 
            value={formData.zipcode} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='Zipcode' 
          />
          <input 
            onChange={onChangeHandler} 
            name='country' 
            value={formData.country} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='Country' 
          />
        </div>
        
        <input 
          required 
          onChange={onChangeHandler} 
          name='phone' 
          value={formData.phone} 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="text" 
          placeholder='Phone number' 
        />
      </div>

      {/* ------------------  Right Side  --------------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          
          {/* ------------------- Payment Method Selection ------------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe" />
            </div>
            
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay" />
            </div>
            
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors'>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder