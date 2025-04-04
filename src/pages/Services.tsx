
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Heart, Award, Music, Utensils, Building, Gift, GraduationCap, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';

const Services = () => {
  // Services data
  const services = [
    {
      icon: <Calendar className="h-12 w-12 text-evento-purple" />,
      title: 'Corporate Events',
      description: 'From conferences and seminars to team building events and product launches, we help businesses create impactful corporate gatherings.',
      features: [
        'Conferences & Seminars',
        'Team Building Activities',
        'Product Launches',
        'Annual Meetings',
        'Corporate Celebrations'
      ],
      image: 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?ixlib=rb-4.0.3'
    },
    {
      icon: <Heart className="h-12 w-12 text-evento-purple" />,
      title: 'Weddings',
      description: 'We create magical wedding experiences tailored to your unique love story, handling everything from venues to decorations.',
      features: [
        'Full Wedding Planning',
        'Venue Selection',
        'Décor & Styling',
        'Vendor Management',
        'Day-of Coordination'
      ],
      image: 'https://images.unsplash.com/photo-1519741347686-c1e331fcb4d3?ixlib=rb-4.0.3'
    },
    {
      icon: <Music className="h-12 w-12 text-evento-purple" />,
      title: 'Cultural Festivals',
      description: 'Celebrate culture and tradition with our expertly organized cultural events and festivals that honor heritage and community.',
      features: [
        'Music Festivals',
        'Dance Performances',
        'Art Exhibitions',
        'Cultural Showcases',
        'Community Celebrations'
      ],
      image: 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?ixlib=rb-4.0.3'
    },
    {
      icon: <Utensils className="h-12 w-12 text-evento-purple" />,
      title: 'Social Gatherings',
      description: 'From birthdays to anniversaries, we help you celebrate life's special moments with personalized event planning.',
      features: [
        'Birthday Parties',
        'Anniversary Celebrations',
        'Family Reunions',
        'Retirement Parties',
        'Holiday Parties'
      ],
      image: 'https://images.unsplash.com/photo-1556125574-d7f27ec36a06?ixlib=rb-4.0.3'
    },
    {
      icon: <Building className="h-12 w-12 text-evento-purple" />,
      title: 'Exhibitions & Trade Shows',
      description: 'Showcase your products and services with our professionally organized exhibitions and trade shows that maximize impact.',
      features: [
        'Booth Design',
        'Logistics Management',
        'Exhibitor Coordination',
        'Visitor Experience',
        'Marketing Support'
      ],
      image: 'https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-4.0.3'
    },
    {
      icon: <GraduationCap className="h-12 w-12 text-evento-purple" />,
      title: 'Educational Events',
      description: 'From academic conferences to workshops, we help educational institutions organize impactful learning events.',
      features: [
        'Academic Conferences',
        'Workshops & Seminars',
        'College Festivals',
        'Graduation Ceremonies',
        'Educational Exhibitions'
      ],
      image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3'
    }
  ];

  // Process steps
  const processSteps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'We start by understanding your requirements, vision, and budget to create a tailored event plan.'
    },
    {
      number: '02',
      title: 'Planning',
      description: 'Our team develops a comprehensive event strategy, selecting venues, vendors, and creating detailed timelines.'
    },
    {
      number: '03',
      title: 'Coordination',
      description: 'We handle all logistics, vendor management, and coordinate every detail to ensure a smooth execution.'
    },
    {
      number: '04',
      title: 'Execution',
      description: 'On the event day, our team ensures flawless implementation of the plan with professional management.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-evento-purple to-evento-orange text-white py-20">
        <div className="evento-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            From corporate events to dream weddings, we offer comprehensive event management services tailored to your needs.
          </p>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-16">
        <div className="evento-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Event Solutions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We offer end-to-end event management services to create memorable experiences for all occasions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-evento-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">Event Planning</h3>
              <p className="text-gray-600">
                Strategic planning and conceptualization of your event from start to finish.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-evento-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3">Venue Selection</h3>
              <p className="text-gray-600">
                Finding and securing the perfect venue that matches your event requirements.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-evento-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">Full Execution</h3>
              <p className="text-gray-600">
                End-to-end management of your event with attention to every detail.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Detailed Services */}
      <section className="py-16 bg-gray-50">
        <div className="evento-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Specialized Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Discover our range of specialized event management services designed to meet your specific needs.
            </p>
          </div>
          
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`order-2 ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                
                <div className={`${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center mb-4">
                    {service.icon}
                    <h3 className="text-2xl font-bold ml-4">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-evento-purple mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/enquiry">
                    <Button className="btn-primary">Enquire Now</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Process */}
      <section className="py-16">
        <div className="evento-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Process</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              How we work to bring your event vision to life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md relative">
                <div className="absolute -top-5 -left-5 w-12 h-12 bg-evento-purple text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-4 mt-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="evento-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Real experiences from our satisfied clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex mb-4 text-yellow-400">
                <Award className="h-5 w-5" />
                <Award className="h-5 w-5" />
                <Award className="h-5 w-5" />
                <Award className="h-5 w-5" />
                <Award className="h-5 w-5" />
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Evento transformed our corporate conference into an unforgettable experience. Their attention to detail and professionalism exceeded our expectations."
              </p>
              <div>
                <p className="font-semibold">Ramesh Kumar</p>
                <p className="text-gray-500 text-sm">Marketing Director, TechCorp India</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex mb-4 text-yellow-400">
                <Award className="h-5 w-5" />
                <Award className="h-5 w-5" />
                <Award className="h-5 w-5" />
                <Award className="h-5 w-5" />
                <Award className="h-5 w-5" />
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Our wedding day was perfect thanks to Evento. They handled everything with such care and creativity, allowing us to enjoy our special day without stress."
              </p>
              <div>
                <p className="font-semibold">Priya & Ajay Sharma</p>
                <p className="text-gray-500 text-sm">Wedding Clients</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex mb-4 text-yellow-400">
                <Award className="h-5 w-5" />
                <Award className="h-5 w-5" />
                <Award className="h-5 w-5" />
                <Award className="h-5 w-5" />
                <Award className="h-5 w-5" />
              </div>
              <p className="text-gray-600 mb-6 italic">
                "The cultural festival organized by Evento was a huge success. Their understanding of our traditions and attention to cultural details made the event authentic and special."
              </p>
              <div>
                <p className="font-semibold">Dr. Lakshmi Narayanan</p>
                <p className="text-gray-500 text-sm">Cultural Association of Chennai</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-evento-purple text-white">
        <div className="evento-container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Next Event?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us help you design and execute the perfect event tailored to your vision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
    </Layout>
  );
};

export default Services;
