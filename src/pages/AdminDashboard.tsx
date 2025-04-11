
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LogOut, Users, Calendar, BookOpen, MessageSquare } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAdmin } from '@/context/AdminProvider';
import { AdminDb } from '@/lib/adminDb';
import { User, Event, Booking, Enquiry } from '@/lib/supabase';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdminLoggedIn, adminLogout } = useAdmin();
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not logged in as admin
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
      return;
    }

    // Fetch data from database
    const fetchData = async () => {
      setLoading(true);
      
      try {
        const [usersData, eventsData, bookingsData, enquiriesData] = await Promise.all([
          AdminDb.getAllUsers(),
          AdminDb.getAllEvents(),
          AdminDb.getAllBookings(),
          AdminDb.getAllEnquiries(),
        ]);
        
        setUsers(usersData as User[]);
        setEvents(eventsData as Event[]);
        setBookings(bookingsData);
        setEnquiries(enquiriesData as Enquiry[]);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isAdminLoggedIn, navigate]);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (!isAdminLoggedIn) {
    return null; // Will redirect in useEffect
  }

  return (
    <Layout>
      <div className="evento-container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} /> Logout
          </Button>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users size={16} /> Users
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar size={16} /> Events
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <BookOpen size={16} /> Bookings
            </TabsTrigger>
            <TabsTrigger value="enquiries" className="flex items-center gap-2">
              <MessageSquare size={16} /> Enquiries
            </TabsTrigger>
          </TabsList>

          {loading ? (
            <div className="text-center py-12">Loading data...</div>
          ) : (
            <>
              <TabsContent value="users" className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-mono text-sm">{user.id.substring(0, 8)}...</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{formatDate(user.created_at)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">No users found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="events" className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Events</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.length > 0 ? (
                      events.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-mono text-sm">{event.id.substring(0, 8)}...</TableCell>
                          <TableCell>{event.title}</TableCell>
                          <TableCell>{event.date}</TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>₹{event.price}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">No events found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="bookings" className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Bookings</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total Price</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.length > 0 ? (
                      bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-mono text-sm">{booking.id.substring(0, 8)}...</TableCell>
                          <TableCell>{booking.events?.title || 'Unknown Event'}</TableCell>
                          <TableCell className="font-mono text-sm">{booking.user_id.substring(0, 8)}...</TableCell>
                          <TableCell>{booking.quantity}</TableCell>
                          <TableCell>₹{booking.total_price}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              booking.payment_status === 'completed' ? 'bg-green-100 text-green-800' :
                              booking.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {booking.payment_status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">No bookings found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="enquiries" className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Enquiries</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Event Type</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enquiries.length > 0 ? (
                      enquiries.map((enquiry) => (
                        <TableRow key={enquiry.id}>
                          <TableCell className="font-mono text-sm">{enquiry.id.substring(0, 8)}...</TableCell>
                          <TableCell>{enquiry.name}</TableCell>
                          <TableCell>{enquiry.email}</TableCell>
                          <TableCell>{enquiry.phone}</TableCell>
                          <TableCell>{enquiry.event_type}</TableCell>
                          <TableCell>{formatDate(enquiry.created_at)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">No enquiries found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
