import React, { useEffect } from 'react'
import '../StyledComponent/Style.css';

const AboutComponent = () => {

  useEffect(() => {
    document.title = 'Weblog - About';
  }, [])

  return (
    <div className='text-justify m-2'>
      <p className='heading'>About Us</p>
      <p className='content'>
        Welcome to the <b>Weblog</b>. We believe in the power of storytelling and the importance of diverse perspectives. Our platform is designed to empower individuals from all backgrounds to share their unique stories and ideas with the world. Our application is designed to be easy to use and customizable, with a wide range of features to help you bring your ideas to life. Whether you are an experienced blogger or just starting out, we have everything you need to create a blog that reflects your unique style. We also believe in supporting our community of bloggers. Thats why we are constantly updating and improving our platform based on user feedback, so you can be sure that you are always getting the best experience possible.
      </p>

      <p className='heading'>Our Mission</p>
      <p className='content'>At our core, we believe in the power of storytelling and the importance of diverse perspectives. So our mission is to provide a user-friendly platform for individuals to express themselves, share their ideas, and connect with others who have similar interests.</p>

      <p className='heading'>Contact Us</p>
      <p className='content'>If you hve any questions or comments or want to add new category as per your need, please feel free to mail us at <a href="/about">queryline1@gmail.com</a>. We would love to hear from you!</p>

      <p className='heading'>Thank You</p>
      <p className='content'>Thank you for choosing our blogging application. We can't wait to see what stories and ideas you will share with the world!. All the best!!</p>
    </div>
  );
}

export default AboutComponent