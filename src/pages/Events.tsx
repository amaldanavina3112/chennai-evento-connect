
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Search, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';

const Events = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Sample event data
  const allEvents = [
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
    },
    {
      id: 5,
      title: 'Chennai Art Exhibition',
      date: 'October 8, 2025',
      location: 'DakshinaChitra Museum, Chennai',
      image: 'https://images.unsplash.com/photo-1578926288207-32356a08d43c?ixlib=rb-4.0.3',
      price: '₹300',
      category: 'Art'
    },
    {
      id: 6,
      title: 'Comedy Night',
      date: 'July 25, 2025',
      location: 'Sir Mutha Venkatasubba Rao Concert Hall, Chennai',
      image: 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?ixlib=rb-4.0.3',
      price: '₹800',
      category: 'Entertainment'
    },
    {
      id: 7,
      title: 'Chennai International Film Festival',
      date: 'December 10, 2025',
      location: 'Multiple venues, Chennai',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3',
      price: '₹1,200',
      category: 'Film'
    },
    {
      id: 8,
      title: 'Health & Wellness Expo',
      date: 'August 20, 2025',
      location: 'Chennai Trade Centre, Chennai',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3',
      price: '₹500',
      category: 'Health'
    }
  ];

  // Category options
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Music', label: 'Music' },
    { value: 'Business', label: 'Business' },
    { value: 'Food', label: 'Food' },
    { value: 'Expo', label: 'Expo' },
    { value: 'Art', label: 'Art' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Film', label: 'Film' },
    { value: 'Health', label: 'Health' }
  ];

  // Filter events based on search and category
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="evento-container py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Events in Chennai</h1>
          {user && (
            <Link to="/add-event">
              <Button className="btn-primary flex items-center gap-2">
                <Plus size={16} /> Add Event
              </Button>
            </Link>
          )}
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <Input
                placeholder="Search events by name or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredEvents.map((event) => (
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
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-500 mb-2">No events found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Events;
