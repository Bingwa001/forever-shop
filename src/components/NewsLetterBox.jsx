import React, { useState } from 'react'

const NewsLetterBox = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setError('');

        // Check if email is provided
        if (!email.trim()) {
            setError('Email address is required');
            return;
        }

        // Validate email format
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        // Simulate API call - replace with your actual subscription logic
        setTimeout(() => {
            console.log('Subscribing email:', email);
            setIsSubscribed(true);
            setEmail('');
            setIsLoading(false);
            
            // Reset success message after 3 seconds
            setTimeout(() => {
                setIsSubscribed(false);
            }, 3000);
        }, 1000);
    };

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
            <p className='text-gray-400 mt-3'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio laudantium tempore ab ut expedita temporibus officia, reprehenderit et fuga commodi velit debitis accusantium placeat quod corporis eum totam consectetur obcaecati.
            </p>
            
            <form onSubmit={onSubmitHandler} className='mt-6'> 
                <div className='flex flex-col sm:flex-row justify-center items-center gap-3'>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email address' 
                        className={`w-full sm:w-1/3 p-2 border rounded-md focus:outline-none focus:ring-2 transition duration-200 ${
                            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        disabled={isLoading}
                    />
                    <button 
                        type='submit' 
                        disabled={isLoading || !email.trim()}
                        className={`px-4 py-2 text-white rounded-md transition duration-200 ${
                            isLoading || !email.trim() 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        {isLoading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </div>
                
                {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
                
                {isSubscribed && (
                    <p className="text-green-500 text-sm mt-2">
                        ✓ Successfully subscribed! Check your email for confirmation.
                    </p>
                )}
            </form>
        </div>
    )
}

export default NewsLetterBox