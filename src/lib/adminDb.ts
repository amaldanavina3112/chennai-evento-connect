
import { supabase } from './supabase';

export interface AdminUser {
  id: string;
  username: string;
  password: string; // Note: In a real app, never store plain passwords
}

// Hard-coded admin credentials - in a real app, you'd store these in the database with proper password hashing
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

export const AdminDb = {
  // Verify admin credentials
  async verifyAdmin(username: string, password: string): Promise<boolean> {
    // For demo purposes only - in a real app, you would query the database and use proper password hashing
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
  },

  // Get all users
  async getAllUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }
    
    return data;
  },

  // Get all events
  async getAllEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('*');
    
    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }
    
    return data;
  },

  // Get all bookings with related event data
  async getAllBookings() {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        events:event_id (*)
      `);
    
    if (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
    
    return data;
  },

  // Get all enquiries
  async getAllEnquiries() {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*');
    
    if (error) {
      console.error('Error fetching enquiries:', error);
      return [];
    }
    
    return data;
  }
};
