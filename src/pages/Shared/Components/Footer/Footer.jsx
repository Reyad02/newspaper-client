import React from 'react';

const Footer = () => {
    return (
        <div className='bg-base-200 mt-10'>
            <div className='max-w-7xl mx-auto'>
                <footer className="footer p-10 bg-base-200 text-base-content">
                    <aside>
                        <img src={"https://i.ibb.co/sVt6Wtx/logo-removebg-preview.png"} className='max-w-20' alt="" />
                        <p>24 News Ltd.<br />Providing reliable news since 2002</p>
                    </aside>
                    <nav>
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                </footer>
            </div>
        </div>
    );
};

export default Footer;