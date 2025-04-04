
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users, BadgeIndianRupee, Share2 } from 'lucide-react';
import Layout from '@/components/Layout';

// Simulated event data for demonstration
const eventsData = [
  {
    id: 1,
    title: 'Chennai Music Festival',
    date: 'June 15, 2025',
    time: '4:00 PM - 10:00 PM',
    location: 'Marina Beach, Chennai',
    address: 'Marina Beach Road, Chennai, Tamil Nadu 600001',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3',
    gallery: [
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3',
    ],
    price: '₹1,500',
    category: 'Music',
    organizer: 'Chennai Cultural Association',
    attendees: 342,
    description: `
      <p>Get ready for the biggest music festival in Chennai! The Chennai Music Festival brings together the best of local and international artists for an unforgettable evening of music by the beach.</p>
      <p>This year's lineup features renowned artists from various genres including classical Carnatic music, contemporary pop, and fusion performances that blend traditional and modern sounds.</p>
      <h3>Highlights:</h3>
      <ul>
        <li>Live performances from 12+ artists across 2 stages</li>
        <li>Food stalls featuring local cuisine</li>
        <li>Art installations and interactive experiences</li>
        <li>Beachside sunset views during performances</li>
      </ul>
    `,
    ticketTypes: [
      { id: 1, name: 'General Admission', price: '₹1,500', available: true },
      { id: 2, name: 'VIP Access', price: '₹3,500', available: true },
      { id: 3, name: 'Group Package (5 people)', price: '₹6,000', available: true },
    ]
  },
];

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Find the event by ID
  const event = eventsData.find(e => e.id === parseInt(id || '0'));

  if (!event) {
    return (
      <Layout>
        <div className="evento-container py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
          <p className="mb-8">The event you're looking for does not exist or has been removed.</p>
          <Link to="/events">
            <Button className="btn-primary">Back to Events</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Function to handle selecting a ticket type
  const handleTicketSelect = (ticketId: number) => {
    setSelectedTicket(ticketId);
  };

  // Function to increase ticket quantity
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Function to decrease ticket quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Function to get current ticket price
  const getTicketPrice = () => {
    const ticket = event.ticketTypes.find(t => t.id === selectedTicket);
    if (!ticket) return 0;
    
    // Remove currency symbol and commas, then convert to number
    const priceNumber = Number(ticket.price.replace('₹', '').replace(',', ''));
    return priceNumber * quantity;
  };

  return (
    <Layout>
      <div className="evento-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{event.title}</h1>
            
            {/* Main Image */}
            <div className="rounded-lg overflow-hidden mb-6">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Event Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="text-evento-purple mr-3" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="text-evento-orange mr-3" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-evento-purple mr-3" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="text-evento-orange mr-3" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Attendees</p>
                    <p className="font-medium">{event.attendees} people going</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">About This Event</h3>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: event.description }} />
            </div>
            
            {/* Event Gallery */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Event Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {event.gallery.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${event.title} gallery image ${index + 1}`}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Location Map */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="mb-4">{event.address}</p>
                <div className="rounded-lg overflow-hidden h-64 bg-gray-200">
                  <img
                    src="https://maps.googleapis.com/maps/api/staticmap?center=Marina+Beach,Chennai&zoom=14&size=600x400&key=YOUR_API_KEY"
                    alt="Event location map"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar - Ticket Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-xl font-semibold mb-4">Get Tickets</h3>
              
              {/* Ticket Types */}
              <div className="space-y-3 mb-6">
                {event.ticketTypes.map((ticket) => (
                  <div 
                    key={ticket.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedTicket === ticket.id ? 'border-evento-purple bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleTicketSelect(ticket.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{ticket.name}</h4>
                        <p className="text-evento-purple font-bold">{ticket.price}</p>
                      </div>
                      <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center">
                        {selectedTicket === ticket.id && (
                          <div className="h-3 w-3 rounded-full bg-evento-purple"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Quantity Selector - Only show if a ticket is selected */}
              {selectedTicket && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center">
                    <button
                      onClick={decreaseQuantity}
                      className="w-10 h-10 rounded-l-md border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <div className="h-10 px-4 flex items-center justify-center border-t border-b border-gray-300">
                      {quantity}
                    </div>
                    <button
                      onClick={increaseQuantity}
                      className="w-10 h-10 rounded-r-md border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
              
              {/* Price Summary - Only show if a ticket is selected */}
              {selectedTicket && (
                <div className="border-t border-b border-gray-200 py-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span>Price</span>
                    <span>₹{getTicketPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{getTicketPrice().toLocaleString()}</span>
                  </div>
                </div>
              )}
              
              {/* Book Now Button */}
              <Link to={selectedTicket ? `/payment/${event.id}?ticket=${selectedTicket}&quantity=${quantity}` : '#'}>
                <Button 
                  className="btn-primary w-full mb-4" 
                  disabled={!selectedTicket}
                >
                  <BadgeIndianRupee className="mr-2" size={16} />
                  Book Now
                </Button>
              </Link>
              
              {/* Share Button */}
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Share2 className="mr-2" size={16} />
                Share This Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetails;
