
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, Award, Heart, Star } from 'lucide-react';

const Home = () => {
  // Sample featured events
  const featuredEvents = [
    {
      id: 1,
      title: 'Chennai Music Festival',
      date: 'June 15, 2025',
      location: 'Marina Beach, Chennai',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3',
      price: '₹1,500',
      category: 'Music'
    },
    {
      id: 2,
      title: 'Tech Conference 2025',
      date: 'July 10, 2025',
      location: 'ITC Grand Chola, Chennai',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3',
      price: '₹2,500',
      category: 'Business'
    },
    {
      id: 3,
      title: 'Food & Culture Festival',
      date: 'August 5, 2025',
      location: 'Phoenix MarketCity, Chennai',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3',
      price: '₹500',
      category: 'Food'
    },
    {
      id: 4,
      title: 'Wedding Expo',
      date: 'September 12, 2025',
      location: 'Taj Coromandel, Chennai',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3',
      price: '₹1,000',
      category: 'Expo'
    }
  ];

  // Services offered
  const services = [
    {
      icon: <Calendar className="h-10 w-10 text-evento-purple" />,
      title: 'Event Planning',
      description: 'Comprehensive planning and execution of events of all sizes.'
    },
    {
      icon: <Users className="h-10 w-10 text-evento-orange" />,
      title: 'Corporate Events',
      description: 'Specialized business conferences, seminars, and team building events.'
    },
    {
      icon: <Heart className="h-10 w-10 text-evento-purple" />,
      title: 'Wedding Management',
      description: 'Create the perfect wedding day with our expert planning services.'
    },
    {
      icon: <Award className="h-10 w-10 text-evento-orange" />,
      title: 'Award Ceremonies',
      description: 'Elegant and prestigious award ceremonies for all organizations.'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Marketing Director',
      company: 'TechCorp India',
      content: 'Evento transformed our product launch into an unforgettable experience. Their attention to detail and creativity exceeded our expectations.',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      role: 'Bride's Father',
      content: 'My daughter's wedding was managed flawlessly by Evento. They handled everything with grace and professionalism during the entire process.',
      rating: 5
    },
    {
      name: 'Aisha Patel',
      role: 'Event Coordinator',
      company: 'Global Connections',
      content: 'As a fellow event professional, I can say that Evento's work is exceptional. They are my go-to recommendation for Chennai events.',
      rating: 4
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-evento-purple/90 to-evento-orange/90 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3"
            alt="Event background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="evento-container relative z-10 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Creating Unforgettable Events in Chennai
            </h1>
            <p className="text-lg md:text-xl mb-8 animate-fade-in">
              From corporate gatherings to dream weddings, we bring your vision to life with flawless execution and creative excellence.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in">
              <Link to="/events">
                <Button size="lg" className="bg-white text-evento-purple hover:bg-gray-100">
                  Explore Events
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="evento-container">
          <div className="text-center mb-12">
            <h2 className="section-title">Upcoming Events in Chennai</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover and book tickets for the most exciting events happening across Chennai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredEvents.map((event) => (
              <div key={event.id} className="event-card bg-white">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-evento-orange text-white text-sm px-3 py-1 rounded-full">
                    {event.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin size={16} className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-evento-purple font-bold">{event.price}</span>
                    <Link to={`/events/${event.id}`}>
                      <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/events">
              <Button className="btn-primary">View All Events</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="evento-container">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a comprehensive range of event management services tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button className="btn-primary">Explore Our Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="evento-container">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from some of our satisfied clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill={i < testimonial.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">
                    {testimonial.role}
                    {testimonial.company && `, ${testimonial.company}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-evento-purple text-white py-16">
        <div className="evento-container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Next Event?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us help you design and execute the perfect event tailored to your needs and vision.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/enquiry">
              <Button size="lg" className="bg-white text-evento-purple hover:bg-gray-100">
                Make an Enquiry
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
