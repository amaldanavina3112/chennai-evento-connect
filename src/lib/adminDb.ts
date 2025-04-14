
import { supabase } from './supabase';

export interface AdminUser {
  id: string;
  username: string;
  password: string; // Note: In a real app, never store plain passwords
}

// Hard-coded admin credentials - in a real app, you'd store these in the database with proper password hashing
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

// Sample data for demonstration purposes
const SAMPLE_USERS = [
  { id: 'usr_123456789', email: 'john.doe@example.com', name: 'John Doe', created_at: '2023-04-15T10:30:00Z', avatar_url: 'https://i.pravatar.cc/150?u=john' },
  { id: 'usr_987654321', email: 'jane.smith@example.com', name: 'Jane Smith', created_at: '2023-05-20T14:45:00Z', avatar_url: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'usr_456789123', email: 'bob.johnson@example.com', name: 'Bob Johnson', created_at: '2023-06-10T09:15:00Z', avatar_url: 'https://i.pravatar.cc/150?u=bob' },
  { id: 'usr_789123456', email: 'alice.williams@example.com', name: 'Alice Williams', created_at: '2023-07-05T16:20:00Z', avatar_url: 'https://i.pravatar.cc/150?u=alice' },
  { id: 'usr_321654987', email: 'charlie.brown@example.com', name: 'Charlie Brown', created_at: '2023-08-12T11:10:00Z', avatar_url: 'https://i.pravatar.cc/150?u=charlie' }
];

const SAMPLE_EVENTS = [
  { id: 'evt_123456789', title: 'Annual Tech Conference', description: 'Join us for the biggest tech event of the year featuring keynotes from industry leaders.', date: '2025-09-15', time: '09:00 AM', location: 'Convention Center', address: '123 Main St, Mumbai', price: 1500, image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600', category: 'Conference', created_at: '2023-06-01T10:00:00Z', user_id: 'usr_123456789' },
  { id: 'evt_987654321', title: 'Startup Networking Mixer', description: 'Connect with entrepreneurs and investors in a casual setting.', date: '2025-08-20', time: '06:30 PM', location: 'The Grand Hotel', address: '456 Park Ave, Delhi', price: 500, image_url: 'https://images.unsplash.com/photo-1511795409834-432e50ce8840?w=600', category: 'Networking', created_at: '2023-06-15T14:30:00Z', user_id: 'usr_987654321' },
  { id: 'evt_456789123', title: 'Digital Marketing Workshop', description: 'Learn the latest strategies in SEO, social media, and content marketing.', date: '2025-07-10', time: '10:00 AM', location: 'Business Center', address: '789 Corporate Blvd, Bangalore', price: 750, image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600', category: 'Workshop', created_at: '2023-05-20T09:45:00Z', user_id: 'usr_456789123' },
  { id: 'evt_789123456', title: 'Product Launch Gala', description: 'Be the first to experience our revolutionary new product line.', date: '2025-10-05', time: '07:00 PM', location: 'Luxury Hotel', address: '321 Elite St, Hyderabad', price: 2000, image_url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600', category: 'Launch', created_at: '2023-07-01T16:15:00Z', user_id: 'usr_789123456' },
  { id: 'evt_321654987', title: 'Leadership Summit', description: 'Develop your leadership skills with coaching from top executives.', date: '2025-11-15', time: '09:30 AM', location: 'Executive Center', address: '654 Leadership Ln, Chennai', price: 1200, image_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600', category: 'Summit', created_at: '2023-08-05T11:30:00Z', user_id: 'usr_321654987' }
];

const SAMPLE_BOOKINGS = [
  { id: 'bkg_123456789', event_id: 'evt_123456789', user_id: 'usr_987654321', quantity: 2, total_price: 3000, payment_status: 'completed', created_at: '2023-08-01T10:30:00Z', events: SAMPLE_EVENTS[0] },
  { id: 'bkg_987654321', event_id: 'evt_987654321', user_id: 'usr_123456789', quantity: 1, total_price: 500, payment_status: 'completed', created_at: '2023-08-05T14:45:00Z', events: SAMPLE_EVENTS[1] },
  { id: 'bkg_456789123', event_id: 'evt_456789123', user_id: 'usr_789123456', quantity: 3, total_price: 2250, payment_status: 'pending', created_at: '2023-08-10T09:15:00Z', events: SAMPLE_EVENTS[2] },
  { id: 'bkg_789123456', event_id: 'evt_789123456', user_id: 'usr_456789123', quantity: 2, total_price: 4000, payment_status: 'completed', created_at: '2023-08-15T16:20:00Z', events: SAMPLE_EVENTS[3] },
  { id: 'bkg_321654987', event_id: 'evt_321654987', user_id: 'usr_123456789', quantity: 1, total_price: 1200, payment_status: 'failed', created_at: '2023-08-20T11:10:00Z', events: SAMPLE_EVENTS[4] },
  { id: 'bkg_654987321', event_id: 'evt_123456789', user_id: 'usr_321654987', quantity: 4, total_price: 6000, payment_status: 'pending', created_at: '2023-08-25T13:25:00Z', events: SAMPLE_EVENTS[0] }
];

const SAMPLE_ENQUIRIES = [
  { id: 'enq_123456789', name: 'Rajesh Kumar', email: 'rajesh.kumar@example.com', phone: '+91 9876543210', message: 'I would like to know more about hosting a corporate event for 100 people. What packages do you offer?', event_type: 'Corporate', created_at: '2023-08-01T10:30:00Z' },
  { id: 'enq_987654321', name: 'Priya Sharma', email: 'priya.sharma@example.com', phone: '+91 8765432109', message: 'Looking for a venue for my wedding reception in December. Please share availability and pricing.', event_type: 'Wedding', created_at: '2023-08-05T14:45:00Z' },
  { id: 'enq_456789123', name: 'Amit Patel', email: 'amit.patel@example.com', phone: '+91 7654321098', message: 'Interested in booking a space for a product launch event. Need catering and AV equipment.', event_type: 'Launch', created_at: '2023-08-10T09:15:00Z' },
  { id: 'enq_789123456', name: 'Sneha Gupta', email: 'sneha.gupta@example.com', phone: '+91 6543210987', message: 'Planning a charity fundraiser gala. Looking for a venue that can accommodate 200 guests with dinner service.', event_type: 'Charity', created_at: '2023-08-15T16:20:00Z' },
  { id: 'enq_321654987', name: 'Vikram Singh', email: 'vikram.singh@example.com', phone: '+91 5432109876', message: 'Need information on booking a conference room for a two-day seminar with breakout sessions.', event_type: 'Conference', created_at: '2023-08-20T11:10:00Z' }
];

export const AdminDb = {
  // Verify admin credentials
  async verifyAdmin(username: string, password: string): Promise<boolean> {
    // For demo purposes only - in a real app, you would query the database and use proper password hashing
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
  },

  // Get all users
  async getAllUsers() {
    // Return sample data instead of querying Supabase
    return SAMPLE_USERS;
  },

  // Get all events
  async getAllEvents() {
    // Return sample data instead of querying Supabase
    return SAMPLE_EVENTS;
  },

  // Get all bookings with related event data
  async getAllBookings() {
    // Return sample data instead of querying Supabase
    return SAMPLE_BOOKINGS;
  },

  // Get all enquiries
  async getAllEnquiries() {
    // Return sample data instead of querying Supabase
    return SAMPLE_ENQUIRIES;
  }
};
