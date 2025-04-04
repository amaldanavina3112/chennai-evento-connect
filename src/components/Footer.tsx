
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="evento-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient">Evento</h3>
            <p className="text-gray-300">
              Your premier event management partner in Chennai. We create memorable experiences tailored to your needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white transition-colors duration-300">Events</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-300">Services</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white transition-colors duration-300">Gallery</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Corporate Events</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Weddings</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Birthday Parties</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Conferences</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Social Gatherings</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="flex-shrink-0 text-evento-orange" />
                <span className="text-gray-300">123 Anna Salai, Chennai, Tamil Nadu 600002</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-evento-orange" />
                <span className="text-gray-300">+91 9876543210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-evento-orange" />
                <span className="text-gray-300">info@evento.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Evento. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
