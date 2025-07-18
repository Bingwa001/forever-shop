import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
        
        <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, nobis quasi? Aliquid earum quasi obcaecati. Sint, alias vitae. Reprehenderit ipsam quae voluptate explicabo ad architecto voluptas quas quisquam tempora iure!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam aspernatur placeat, nam sit eum nemo soluta similique pariatur consectetur, unde consequuntur quibusdam aperiam obcaecati, facilis assumenda perferendis aut ullam. Animi.</p>       
            <b className='text-gray-800'>Our Mission</b>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque assumenda veniam numquam aspernatur pariatur distinctio, laboriosam temporibus corporis necessitatibus, sit enim incidunt fugit. Velit tempore aliquam accusamus fuga commodi expedita!</p>
          </div>
        </div>

          <div className=' text-xl py-4'>
            <Title text1={'WHY'} text2={'CHOOSE US'}/>

          </div>
          
          <div className='flex flex-col md:flex-row text-sm md-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
               <b>Quality Assurance</b>
              <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringet</p>

            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Convenience</b>
              <p className='text-gray-600'>With our friendly interface and hassle free ordering services</p>

            </div>
               <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Exceptional Customer Service</b>
              <p className='text-gray-600'>Our team of dedicated professionals is here to help className='text-gray-600'</p>

            </div>
          </div>
           <NewsLetterBox/>

      </div>
    </div>
  )
}

export default About