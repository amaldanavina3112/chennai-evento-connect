
import axios from 'axios';
import { User, Event, Booking, Enquiry } from './supabase';

// API base URL - change this based on your deployment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Axios instance with common configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Backend API service
export const BackendApi = {
  // Users
  async getUsers(): Promise<User[]> {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  async getUser(userId: string): Promise<User | null> {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      return null;
    }
  },

  async createUser(userData: Omit<User, 'id' | 'created_at'>): Promise<User | null> {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  },

  async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    try {
      const response = await api.put(`/users/${userId}`, updates);
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error);
      return null;
    }
  },

  async deleteUser(userId: string): Promise<boolean> {
    try {
      await api.delete(`/users/${userId}`);
      return true;
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
      return false;
    }
  },

  // Events
  async getEvents(): Promise<Event[]> {
    try {
      const response = await api.get('/events');
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  async searchEvents(query: string): Promise<Event[]> {
    try {
      const response = await api.get('/events', {
        params: { search: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching events:', error);
      return [];
    }
  },

  async getEvent(eventId: string): Promise<Event | null> {
    try {
      const response = await api.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event ${eventId}:`, error);
      return null;
    }
  },

  async createEvent(eventData: Omit<Event, 'id' | 'created_at'>): Promise<Event | null> {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      return null;
    }
  },

  async updateEvent(eventId: string, updates: Partial<Event>): Promise<Event | null> {
    try {
      const response = await api.put(`/events/${eventId}`, updates);
      return response.data;
    } catch (error) {
      console.error(`Error updating event ${eventId}:`, error);
      return null;
    }
  },

  async deleteEvent(eventId: string): Promise<boolean> {
    try {
      await api.delete(`/events/${eventId}`);
      return true;
    } catch (error) {
      console.error(`Error deleting event ${eventId}:`, error);
      return false;
    }
  },

  async getEventAvailability(eventId: string): Promise<{ available_spots: number; max_attendees: number; current_attendees: number } | null> {
    try {
      const response = await api.get(`/events/${eventId}/availability`);
      return response.data;
    } catch (error) {
      console.error(`Error checking event availability ${eventId}:`, error);
      return null;
    }
  },

  async getEventRevenue(eventId: string): Promise<{ total_revenue: number }> {
    try {
      const response = await api.get(`/events/${eventId}/revenue`);
      return response.data;
    } catch (error) {
      console.error(`Error getting event revenue ${eventId}:`, error);
      return { total_revenue: 0 };
    }
  },

  // Bookings
  async createBooking(bookingData: Omit<Booking, 'id' | 'created_at'>): Promise<Booking | null> {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      return null;
    }
  },

  async getUserBookings(userId: string): Promise<Booking[]> {
    try {
      const response = await api.get(`/users/${userId}/bookings`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user bookings for ${userId}:`, error);
      return [];
    }
  },

  // Enquiries
  async submitEnquiry(enquiryData: Omit<Enquiry, 'id' | 'created_at'>): Promise<Enquiry | null> {
    try {
      const response = await api.post('/enquiries', enquiryData);
      return response.data;
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      return null;
    }
  },

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await api.get('/health');
      return response.data.status === 'ok';
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }
};
