import React from 'react'
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div>
        
      <section id="about-us">
        <h2 className='text'>Problem</h2>
        <p className='text'>Your app addresses the challenge many people face when working 
            from home or when work unexpectedly takes them to new places.</p>
        <p className='text'>It helps users find quiet, reliable spaces with internet access,
             allowing them to focus and be productive, whether they’re 
            looking for a peaceful cafe, a rented office, or a nature spot.</p>

        <h2 className='text'>About Us</h2>
        <p className='text'>We are students in Curse Full Stack of CyberPro Nov 24. </p>
         <p className='text'>Our project is an app to search quiet workplaces in Israel for everyone.</p>
        <p className='text'>It is a digital platform that allows users to find quiet places to work,
             such as cafes, offices for rent, coffee carts, nature corners, and more. 
             Users can rate places, add reviews, suggest new places.</p>
    </section>

    <section id="contact-info">
        <h2 className='text'>Contact Us</h2>
        <p className='text'>If you have any questions or suggestions, feel free to contact us!</p>


       
    </section>

    <section id="faq">
    <h3 className='text'> Frequently Asked Questions</h3>
    <div>
        <h4 className='text'>What is this platform about?</h4>
        <p className='text'>It helps users find quiet places to work in Israel.</p>
    </div>
    <div>
        <h4 className='text'>Can I add my workplace?</h4>
        <p className='text'>Yes, you can suggest new places through the platform!</p>
    </div>
</section>
<div>
    <div>
    <h2>Developers</h2>
    </div>
    <div id='devl'>
    <div>
        <h3>Anton Horelyk</h3>
        <img src="../src/components/contactComponents/camphoto_1932422408.JPG" alt="Anton" id='photo'/>
        <p></p>
    </div>
    <div>
        <h3>Shahar Hayon</h3>
        <img src="" alt="" />
        <p></p>
    </div>
    <div>
        <h3>Daniel Melki</h3>
        <img src="" alt="" />
        <p></p>
    </div>
    </div>
</div>

    </div>
  )
}


export default Contact
