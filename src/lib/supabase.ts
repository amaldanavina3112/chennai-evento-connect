import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if environment variables are missing and provide meaningful fallbacks for development
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  // For development only - using dummy values to prevent app from crashing
  // In production, these should be properly set in the environment
}

// Use dummy values when missing to prevent the app from crashing during development
const finalSupabaseUrl = supabaseUrl || 'https://placeholder-project.supabase.co';
const finalSupabaseKey = supabaseAnonKey || 'placeholder-key-for-development-only';

export const supabase = createClient(finalSupabaseUrl, finalSupabaseKey);

// Types for our database entities
export type User = {
  id: string;
  email: string;
  name: string;
  created_at: string;
  avatar_url?: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  price: number;
  image_url?: string;
  category: string;
  created_at: string;
  user_id: string;
};

export type Booking = {
  id: string;
  event_id: string;
  user_id: string;
  quantity: number;
  total_price: number;
  payment_status: 'pending' | 'completed' | 'failed';
  created_at: string;
  events?: Event;
};

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  event_type: string;
  created_at: string;
};

// Enhanced Database service with more CRUD operations
export const Database = {
  // Users
  async getUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    
    return data as User;
  },

  async createUser(user: Omit<User, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user:', error);
      return null;
    }
    
    return data as User;
  },

  async updateUser(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating user:', error);
      return null;
    }
    
    return data as User;
  },

  async deleteUser(userId: string) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);
    
    if (error) {
      console.error('Error deleting user:', error);
      return false;
    }
    
    return true;
  },

  // Events
  async getEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }
    
    return data as Event[];
  },

  async getEvent(eventId: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();
    
    if (error) {
      console.error('Error fetching event:', error);
      return null;
    }
    
    return data as Event;
  },

  async createEvent(event: Omit<Event, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating event:', error);
      return null;
    }
    
    return data as Event;
  },

  async updateEvent(eventId: string, updates: Partial<Event>) {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', eventId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating event:', error);
      return null;
    }
    
    return data as Event;
  },

  async deleteEvent(eventId: string) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);
    
    if (error) {
      console.error('Error deleting event:', error);
      return false;
    }
    
    return true;
  },

  async searchEvents(query: string) {
    const { data, error } = await supabase
      .rpc('search_events', { search_term: query });
    
    if (error) {
      console.error('Error searching events:', error);
      return [];
    }
    
    return data as Event[];
  },

  async getUpcomingEvents() {
    const { data, error } = await supabase
      .from('upcoming_events')
      .select('*');
    
    if (error) {
      console.error('Error fetching upcoming events:', error);
      return [];
    }
    
    return data as Event[];
  },

  async createBooking(booking: Omit<Booking, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating booking:', error);
      return null;
    }
    
    return data as Booking;
  },

  async getUserBookings(userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        events:event_id (*)
      `)
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error fetching user bookings:', error);
      return [];
    }
    
    return data;
  },

  async updateBooking(bookingId: string, updates: Partial<Booking>) {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', bookingId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating booking:', error);
      return null;
    }
    
    return data as Booking;
  },

  async deleteBooking(bookingId: string) {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId);
    
    if (error) {
      console.error('Error deleting booking:', error);
      return false;
    }
    
    return true;
  },

  async submitEnquiry(enquiry: Omit<Enquiry, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('enquiries')
      .insert([enquiry])
      .select()
      .single();
    
    if (error) {
      console.error('Error submitting enquiry:', error);
      return null;
    }
    
    return data as Enquiry;
  },

  async getEnquiry(enquiryId: string) {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .eq('id', enquiryId)
      .single();
    
    if (error) {
      console.error('Error fetching enquiry:', error);
      return null;
    }
    
    return data as Enquiry;
  },

  async updateEnquiry(enquiryId: string, updates: Partial<Enquiry>) {
    const { data, error } = await supabase
      .from('enquiries')
      .update(updates)
      .eq('id', enquiryId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating enquiry:', error);
      return null;
    }
    
    return data as Enquiry;
  },

  async deleteEnquiry(enquiryId: string) {
    const { error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', enquiryId);
    
    if (error) {
      console.error('Error deleting enquiry:', error);
      return false;
    }
    
    return true;
  },

  // New method to get event revenue
  async getEventRevenue(eventId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('total_price')
      .eq('event_id', eventId)
      .eq('payment_status', 'completed');
    
    if (error) {
      console.error('Error fetching event revenue:', error);
      return 0;
    }
    
    return data.reduce((sum, booking) => sum + booking.total_price, 0);
  },

  // New method to check event availability
  async checkEventAvailability(eventId: string, requestedQuantity: number) {
    const { data, error } = await supabase
      .from('events')
      .select('max_attendees, current_attendees')
      .eq('id', eventId)
      .single();
    
    if (error || !data) {
      console.error('Error checking event availability:', error);
      return false;
    }
    
    return (data.max_attendees - data.current_attendees) >= requestedQuantity;
  }
};
