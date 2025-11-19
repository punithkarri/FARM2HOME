
import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../constants';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form submission, e.g., send to an API
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-text-dark">Get In Touch</h1>
                    <p className="mt-4 text-lg text-text-light max-w-2xl mx-auto">
                        Have questions, feedback, or just want to say hello? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <div className="bg-gray-50 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-text-dark mb-6">Send us a Message</h2>
                        {isSubmitted ? (
                            <div className="bg-primary-light text-primary-dark p-4 rounded-md text-center">
                                <p className="font-semibold">Thank you!</p>
                                <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-text-light">Your Name</label>
                                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-text-light">Email Address</label>
                                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-text-light">Message</label>
                                    <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold text-primary-dark mb-2">Email Us</h3>
                            <p className="text-text-light">For any support or inquiries, please email us at:</p>
                            <a href="mailto:farm2home.in@farm2home.in" className="text-primary text-lg hover:underline">farm2home.in@farm2home.in</a>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-primary-dark mb-2">Follow Us</h3>
                            <p className="text-text-light mb-4">Connect with us on social media for the latest updates, offers, and recipes.</p>
                            <div className="flex space-x-4">
                                {SOCIAL_LINKS.map(social =>https://www.instagram.com/farm2home91/ (
                                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-primary transition-colors p-2 bg-gray-100 rounded-full">
                                        {React.cloneElement(social.icon, { className: 'h-7 w-7' })}
                                    </a>
                                ))}
                            </div>
                        </div>
                         <div>
                            <h3 className="text-xl font-semibold text-primary-dark mb-2">Business Hours</h3>
                            <p className="text-text-light">Customer Support: Monday - Saturday, 9:00 AM - 6:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
