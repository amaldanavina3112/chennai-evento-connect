
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, Users, BadgeIndianRupee, Send } from 'lucide-react';
import Layout from '@/components/Layout';

const Enquiry = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  // Event type options
  const eventTypes = [
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'conference', label: 'Conference' },
    { value: 'exhibition', label: 'Exhibition' },
    { value: 'social', label: 'Social Gathering' },
    { value: 'cultural', label: 'Cultural Event' },
    { value: 'other', label: 'Other' }
  ];

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with a timeout
    setTimeout(() => {
      toast({
        title: "Enquiry Submitted",
        description: "Thank you for your enquiry. Our team will contact you shortly.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setEventType('');
      setEventDate('');
      setGuestCount('');
      setBudget('');
      setLocation('');
      setRequirements('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-evento-purple to-evento-orange text-white py-20">
        <div className="evento-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Event Enquiry</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Tell us about your event, and our team will create a personalized plan for you.
          </p>
        </div>
      </section>
      
      {/* Enquiry Form Section */}
      <section className="py-16">
        <div className="evento-container">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Event Enquiry Form</CardTitle>
                <CardDescription>
                  Fill in the details below, and our event specialists will get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 9876543210"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Event Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Event Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="eventType">Event Type</Label>
                        <Select value={eventType} onValueChange={setEventType} required>
                          <SelectTrigger id="eventType">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            {eventTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eventDate" className="flex items-center">
                          <Calendar size={16} className="mr-2 text-gray-400" />
                          Event Date
                        </Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guestCount" className="flex items-center">
                          <Users size={16} className="mr-2 text-gray-400" />
                          Number of Guests
                        </Label>
                        <Input
                          id="guestCount"
                          type="number"
                          value={guestCount}
                          onChange={(e) => setGuestCount(e.target.value)}
                          placeholder="100"
                          min="1"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget" className="flex items-center">
                          <BadgeIndianRupee size={16} className="mr-2 text-gray-400" />
                          Budget Range (₹)
                        </Label>
                        <Select value={budget} onValueChange={setBudget} required>
                          <SelectTrigger id="budget">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="less-than-50k">Less than ₹50,000</SelectItem>
                            <SelectItem value="50k-1L">₹50,000 - ₹1,00,000</SelectItem>
                            <SelectItem value="1L-5L">₹1,00,000 - ₹5,00,000</SelectItem>
                            <SelectItem value="5L-10L">₹5,00,000 - ₹10,00,000</SelectItem>
                            <SelectItem value="more-than-10L">More than ₹10,00,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="location">Preferred Venue/Location</Label>
                        <Input
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Chennai City Center or specific venue name"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Requirements */}
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Special Requirements or Additional Information</Label>
                    <Textarea
                      id="requirements"
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="Tell us more about your event vision, specific requirements, or any questions you have."
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Submitting Enquiry...'
                    ) : (
                      <>
                        <Send className="mr-2" size={16} />
                        Submit Enquiry
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-gray-500">
                <p>
                  Your information is secure and will only be used to contact you regarding your event.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="evento-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Evento?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We're committed to making your event a memorable success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-evento-purple mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Experienced Team</h3>
              <p className="text-gray-600">
                Our team brings years of experience and expertise to ensure your event runs flawlessly.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-evento-orange mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Tailored Solutions</h3>
              <p className="text-gray-600">
                We create personalized event experiences that reflect your unique vision and requirements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-evento-purple mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Budget-Friendly Options</h3>
              <p className="text-gray-600">
                We work with you to create exceptional events that respect your budget constraints.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Enquiry;
