'use client'
import ContactSection from '@/app/components/contact/ContactSection';
import Sticker from '@/app/components/contact/Sticker';
import ContactPage from '@/app/components/contact/test';
import React, { useEffect, useState } from 'react';

const ContactMain = () => {
    const [aboutLogo, setAboutLogo] = useState(false)



    return (
        <div>
            <div id="ContactSection">
                <ContactSection />
            </div>
            <div className=" text-black  overflow-hidden ">
                {/* stickers  */}
                {/* <div>
                    <div className={`absolute top-[10%] right-[2%]`}>
                        <Sticker link="/naruto.webp" />
                    </div>
                    <div className={`absolute top-[35%] left-[5%]`}>
                        <Sticker link="/speaker.webp" />
                    </div>

                    <div className={`absolute right-[10%] bottom-[20%]`}>
                        <Sticker link="/mail.webp" />
                    </div>
                </div> */}
                {/* main page  */}
                <ContactPage />
            </div>
        </div>
    );
};

export default ContactMain;