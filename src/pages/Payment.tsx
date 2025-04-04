
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { BadgeIndianRupee, CreditCard, Calendar as CalendarIcon, Lock } from 'lucide-react';
import Layout from '@/components/Layout';

const Payment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const queryParams = new URLSearchParams(location.search);
  
  // Extract query parameters
  const ticketId = queryParams.get('ticket');
  const quantity = queryParams.get('quantity') || '1';
  
  // Payment form state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Event and ticket details (simulated data for demonstration)
  const [eventDetails, setEventDetails] = useState({
    title: 'Chennai Music Festival',
    date: 'June 15, 2025',
    ticketType: 'General Admission',
    basePrice: 1500,
    processingFee: 50,
  });
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // Format expiry date (MM/YY)
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };
  
  // Handle card number input change
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };
  
  // Handle expiry input change
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiry(e.target.value);
    setExpiry(formattedValue);
  };
  
  // Calculate total price
  const totalPrice = (eventDetails.basePrice * parseInt(quantity)) + eventDetails.processingFee;
  
  // Simulate form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing with timeout
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: "Your payment has been processed successfully. A confirmation email has been sent to your registered email address.",
      });
      setIsProcessing(false);
      navigate('/payment-success');
    }, 2000);
  };

  return (
    <Layout>
      <div className="evento-container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Secure Payment</h1>
            <p className="text-gray-600">Complete your payment to secure your tickets</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>
                    Enter your card details to complete the payment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Card Name */}
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    {/* Card Number */}
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="flex items-center">
                        <CreditCard size={16} className="mr-2 text-gray-400" />
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        required
                      />
                    </div>
                    
                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry" className="flex items-center">
                          <CalendarIcon size={16} className="mr-2 text-gray-400" />
                          Expiry
                        </Label>
                        <Input
                          id="expiry"
                          value={expiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv" className="flex items-center">
                          <Lock size={16} className="mr-2 text-gray-400" />
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          type="password"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="123"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="btn-primary w-full mt-6"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        'Processing Payment...'
                      ) : (
                        <>
                          <BadgeIndianRupee className="mr-2" size={16} />
                          Pay ₹{totalPrice.toLocaleString()}
                        </>
                      )}
                    </Button>
                    
                    <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center">
                      <Lock size={12} className="mr-1" />
                      Your payment information is secure and encrypted
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-bold text-lg mb-2">{eventDetails.title}</h3>
                      <p className="text-gray-600 mb-1">{eventDetails.date}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-gray-600">Ticket Type:</span>
                        <span>{eventDetails.ticketType}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Quantity:</span>
                        <span>{quantity}</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Subtotal:</span>
                        <span>₹{(eventDetails.basePrice * parseInt(quantity)).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Processing Fee:</span>
                        <span>₹{eventDetails.processingFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t font-bold">
                        <span>Total:</span>
                        <span className="text-lg">₹{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col text-sm text-gray-500 space-y-2">
                  <p>Your tickets will be emailed to you after successful payment.</p>
                  <p>All purchases are subject to our terms and conditions.</p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
