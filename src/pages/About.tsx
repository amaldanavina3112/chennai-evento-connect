
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Award, Heart, Star } from 'lucide-react';
import Layout from '@/components/Layout';

const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3',
      bio: 'With over 15 years of experience in event management, Rajesh founded Evento with a vision to transform how events are organized in Chennai.'
    },
    {
      name: 'Priya Sharma',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3',
      bio: 'Priya brings her artistic vision and creative excellence to every event, ensuring each occasion is unique and memorable.'
    },
    {
      name: 'Vikram Singh',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3',
      bio: 'Vikram ensures flawless execution of every event, managing logistics and coordinating with vendors to deliver excellence.'
    },
    {
      name: 'Ananya Desai',
      role: 'Client Relations',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3',
      bio: 'Ananya is dedicated to understanding client needs and ensuring their vision is brought to life with personalized attention.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-evento-purple to-evento-orange text-white py-20">
        <div className="evento-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Evento</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Chennai's premier event management company creating memorable experiences since 2015.
          </p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16">
        <div className="evento-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2015, Evento began with a simple vision: to create exceptional events that leave lasting impressions. What started as a small team organizing local gatherings has grown into Chennai's most trusted event management company.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey has been defined by our commitment to excellence, attention to detail, and passion for creating magical moments. From corporate conferences to dream weddings, we've had the privilege of bringing thousands of events to life.
              </p>
              <p className="text-gray-600">
                Today, we continue to push boundaries and set new standards in the event management industry in Chennai and beyond.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1559223607-b4d0555ae227?ixlib=rb-4.0.3"
                alt="Evento's journey"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="evento-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              At the heart of everything we do are core principles that guide our approach to event management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-evento-purple" />
              </div>
              <h3 className="text-xl font-bold mb-4">Passion</h3>
              <p className="text-gray-600">
                We put our heart into every event we organize, treating each occasion with the dedication it deserves.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-evento-orange" />
              </div>
              <h3 className="text-xl font-bold mb-4">Excellence</h3>
              <p className="text-gray-600">
                We strive for perfection in every detail, ensuring that each event exceeds expectations.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-evento-purple" />
              </div>
              <h3 className="text-xl font-bold mb-4">Client Focus</h3>
              <p className="text-gray-600">
                We listen carefully to our clients' needs and tailor our services to bring their vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16">
        <div className="evento-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The passionate professionals behind Evento's success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-evento-purple mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="evento-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Recognition of our commitment to excellence in event management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl font-bold text-evento-purple mb-4">500+</div>
              <p className="text-xl">Events Organized</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl font-bold text-evento-orange mb-4">98%</div>
              <p className="text-xl">Client Satisfaction</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl font-bold text-evento-purple mb-4">10+</div>
              <p className="text-xl">Industry Awards</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl font-bold text-evento-orange mb-4">50+</div>
              <p className="text-xl">Corporate Partners</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-evento-purple text-white">
        <div className="evento-container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Next Event?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us help you design and execute the perfect event that meets your unique vision and requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-evento-purple hover:bg-gray-100">
                Contact Us
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-white hover:bg-white/10">
                Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
