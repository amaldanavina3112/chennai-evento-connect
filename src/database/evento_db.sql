
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if they exist (careful with this in production!)
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS enquiries;
DROP TABLE IF EXISTS users;

-- Create Users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    avatar_url TEXT,
    CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create Events table
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    address TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    image_url TEXT,
    category TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed')),
    max_attendees INTEGER CHECK (max_attendees > 0),
    current_attendees INTEGER DEFAULT 0 CHECK (current_attendees >= 0)
);

-- Create Bookings table
CREATE TABLE bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    total_price DECIMAL(10,2) NOT NULL CHECK (total_price >= 0),
    payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    booking_reference TEXT UNIQUE DEFAULT 'BK-' || SUBSTRING(MD5(random()::text) FROM 1 FOR 8)
);

-- Create Enquiries table
CREATE TABLE enquiries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    event_type TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'closed')),
    response_notes TEXT,
    CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create indexes for better query performance
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_bookings_event_id ON bookings(event_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(payment_status);
CREATE INDEX idx_enquiries_status ON enquiries(status);

-- Create a view for upcoming events with availability
CREATE VIEW upcoming_events AS
SELECT 
    e.*,
    (e.max_attendees - e.current_attendees) as available_spots,
    COUNT(b.id) as total_bookings,
    SUM(b.total_price) as total_revenue
FROM events e
LEFT JOIN bookings b ON e.id = b.event_id
WHERE e.date >= CURRENT_DATE AND e.status = 'active'
GROUP BY e.id
ORDER BY e.date ASC;

-- Create a function to update event attendees count
CREATE OR REPLACE FUNCTION update_event_attendees()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE events 
        SET current_attendees = current_attendees + NEW.quantity
        WHERE id = NEW.event_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE events 
        SET current_attendees = current_attendees - OLD.quantity
        WHERE id = OLD.event_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating attendees count
CREATE TRIGGER update_attendees
AFTER INSERT OR DELETE ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_event_attendees();

-- Insert sample data for testing
INSERT INTO users (email, name) VALUES
('john@example.com', 'John Doe'),
('jane@example.com', 'Jane Smith');

INSERT INTO events (title, description, date, time, location, address, price, category, user_id, max_attendees) VALUES
('Summer Music Festival', 'Annual music festival', '2025-07-15', '18:00', 'Central Park', '123 Park Ave', 50.00, 'Music', (SELECT id FROM users WHERE name = 'John Doe'), 1000),
('Tech Conference 2025', 'Technology and innovation', '2025-08-20', '09:00', 'Convention Center', '456 Tech Blvd', 199.99, 'Technology', (SELECT id FROM users WHERE name = 'Jane Smith'), 500);

-- Example queries for common operations

-- Get all upcoming events with available spots
SELECT * FROM upcoming_events WHERE available_spots > 0;

-- Get total revenue by event
SELECT 
    e.title,
    COUNT(b.id) as total_bookings,
    SUM(b.total_price) as total_revenue
FROM events e
LEFT JOIN bookings b ON e.id = b.event_id
GROUP BY e.id, e.title;

-- Get user booking history
SELECT 
    u.name,
    e.title,
    b.quantity,
    b.total_price,
    b.payment_status,
    b.created_at
FROM bookings b
JOIN users u ON b.user_id = u.id
JOIN events e ON b.event_id = e.id
ORDER BY b.created_at DESC;

-- Search events by title or description
CREATE OR REPLACE FUNCTION search_events(search_term TEXT)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    date DATE,
    price DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.id,
        e.title,
        e.description,
        e.date,
        e.price
    FROM events e
    WHERE 
        e.title ILIKE '%' || search_term || '%' 
        OR e.description ILIKE '%' || search_term || '%'
        AND e.date >= CURRENT_DATE
        AND e.status = 'active'
    ORDER BY e.date ASC;
END;
$$ LANGUAGE plpgsql;

