
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Calendar, Ticket, Download, Home } from 'lucide-react';
import Layout from '@/components/Layout';

const PaymentSuccess = () => {
  // Mock data for the confirmed booking
  const booking = {
    eventTitle: 'Chennai Music Festival',
    date: 'June 15, 2025',
    time: '4:00 PM - 10:00 PM',
    venue: 'Marina Beach, Chennai',
    ticketType: 'General Admission',
    quantity: 2,
    totalAmount: '₹3,050',
    confirmationCode: 'EVT-CHN-24680',
  };

  return (
    <Layout>
      <div className="evento-container py-12">
        <div className="max-w-3xl mx-auto text-center">
          <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">
            Your booking has been confirmed and tickets have been sent to your email.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold mb-1">{booking.eventTitle}</h2>
              <div className="flex items-center justify-center text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{booking.date}, {booking.time}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Venue:</span>
                <span className="font-medium">{booking.venue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ticket Type:</span>
                <span className="font-medium">{booking.ticketType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium">{booking.quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-bold text-evento-purple">{booking.totalAmount}</span>
              </div>
              
              <div className="border-t border-dashed mt-6 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Confirmation Code:</span>
                  <span className="font-bold">{booking.confirmationCode}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-primary flex items-center gap-2">
              <Download size={16} />
              Download Tickets
            </Button>
            <Link to="/events">
              <Button variant="outline" className="flex items-center gap-2">
                <Ticket size={16} />
                Browse More Events
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <Home size={16} />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
