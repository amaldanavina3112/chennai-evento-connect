
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

// Database service functions
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
  
  // Bookings
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
  
  // Enquiries
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
  }
};
