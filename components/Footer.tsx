import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { CustomButton } from '.'
import { footerLinks } from '@/constants'
const Footer = () => (
    <footer className='flex flex-col text-black-100  mt-5 border-t border-gray-100'>
        <div className='flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10'>
            <div className='flex flex-col justify-start items-start gap-6'>
                <Link href="/" className='flex justify-center items-center'>

                    <Image
                        src="/widgets.png"
                        alt="Logo"
                        width={35}
                        height={35}
                        className="object-contain"

                    ></Image>

                </Link>
                <p className="text-base text-gray-700">Material Library
                    <br /> All rights reserved &copy;</p>

            </div>

            <div className='footer__links'>

                {footerLinks.map((link) => (
                    <div key={link.title} className='footer__link'>
                        <h3 className="font-bold">{link.title}</h3>
                        {link.links.map((item) => (
                            <Link key={item.title}
                                href={item.url}
                                className="text-gray-500"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                ))}




            </div>
            </div>
            <div className='flex justify-between items-center 
            flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10'>

                <div className="footer__copyrights-link">
                    <Link
                        href="/"
                        className='text-gray-100'>Privacy Policy</Link>
                    <Link
                        href="/"
                        className='text-gray-100'>Terms of Use</Link>


                    <p className="text-base text-gray-700">@2023 Material Library
                        All rights reserved &copy;</p>
                </div>
            </div>
        
    </footer>
)


export default Footer