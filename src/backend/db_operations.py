
from typing import Dict, List, Any, Optional, Union
from .db_connection import db

class EventoDatabase:
    """Database operations for the Evento application."""
    
    # User operations
    def get_users(self) -> List[Dict[str, Any]]:
        """Retrieve all users from the database."""
        try:
            cursor = db.get_cursor()
            cursor.execute("SELECT * FROM users ORDER BY created_at DESC")
            users = cursor.fetchall()
            return users
        except Exception as e:
            print(f"Error retrieving users: {e}")
            return []
    
    def get_user(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve a specific user by ID."""
        try:
            cursor = db.get_cursor()
            cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
            user = cursor.fetchone()
            return user
        except Exception as e:
            print(f"Error retrieving user {user_id}: {e}")
            return None
    
    def create_user(self, user_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Create a new user in the database."""
        try:
            cursor = db.get_cursor()
            # Extract user data fields
            email = user_data.get('email')
            name = user_data.get('name')
            avatar_url = user_data.get('avatar_url')
            
            cursor.execute(
                "INSERT INTO users (email, name, avatar_url) VALUES (%s, %s, %s) RETURNING *",
                (email, name, avatar_url)
            )
            new_user = cursor.fetchone()
            db.commit()
            return new_user
        except Exception as e:
            print(f"Error creating user: {e}")
            return None
    
    def update_user(self, user_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update an existing user in the database."""
        try:
            # Build SET clause for update
            set_clauses = []
            values = []
            
            for key, value in updates.items():
                if key in ['email', 'name', 'avatar_url']:
                    set_clauses.append(f"{key} = %s")
                    values.append(value)
            
            if not set_clauses:
                return None  # No valid fields to update
            
            cursor = db.get_cursor()
            query = f"UPDATE users SET {', '.join(set_clauses)} WHERE id = %s RETURNING *"
            values.append(user_id)
            
            cursor.execute(query, values)
            updated_user = cursor.fetchone()
            db.commit()
            return updated_user
        except Exception as e:
            print(f"Error updating user {user_id}: {e}")
            return None
    
    def delete_user(self, user_id: str) -> bool:
        """Delete a user from the database."""
        try:
            cursor = db.get_cursor()
            cursor.execute("DELETE FROM users WHERE id = %s RETURNING id", (user_id,))
            result = cursor.fetchone()
            db.commit()
            return result is not None
        except Exception as e:
            print(f"Error deleting user {user_id}: {e}")
            return False
    
    # Event operations
    def get_events(self) -> List[Dict[str, Any]]:
        """Retrieve all events from the database."""
        try:
            cursor = db.get_cursor()
            cursor.execute("SELECT * FROM events ORDER BY date ASC")
            events = cursor.fetchall()
            return events
        except Exception as e:
            print(f"Error retrieving events: {e}")
            return []
    
    def get_event(self, event_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve a specific event by ID."""
        try:
            cursor = db.get_cursor()
            cursor.execute("SELECT * FROM events WHERE id = %s", (event_id,))
            event = cursor.fetchone()
            return event
        except Exception as e:
            print(f"Error retrieving event {event_id}: {e}")
            return None
    
    def create_event(self, event_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Create a new event in the database."""
        try:
            cursor = db.get_cursor()
            
            # Extract event data fields
            fields = [
                'title', 'description', 'date', 'time', 'location', 
                'address', 'price', 'image_url', 'category', 'user_id',
                'max_attendees', 'status'
            ]
            
            # Filter out None values and prepare for SQL
            valid_fields = [f for f in fields if f in event_data]
            placeholders = ["%s" for _ in valid_fields]
            values = [event_data.get(f) for f in valid_fields]
            
            query = f"""
                INSERT INTO events ({', '.join(valid_fields)}) 
                VALUES ({', '.join(placeholders)}) 
                RETURNING *
            """
            
            cursor.execute(query, values)
            new_event = cursor.fetchone()
            db.commit()
            return new_event
        except Exception as e:
            print(f"Error creating event: {e}")
            return None
    
    def update_event(self, event_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update an existing event in the database."""
        try:
            # Build SET clause for update
            valid_fields = [
                'title', 'description', 'date', 'time', 'location', 
                'address', 'price', 'image_url', 'category', 'user_id',
                'max_attendees', 'status', 'current_attendees'
            ]
            
            set_clauses = []
            values = []
            
            for key, value in updates.items():
                if key in valid_fields:
                    set_clauses.append(f"{key} = %s")
                    values.append(value)
            
            if not set_clauses:
                return None  # No valid fields to update
            
            cursor = db.get_cursor()
            query = f"UPDATE events SET {', '.join(set_clauses)} WHERE id = %s RETURNING *"
            values.append(event_id)
            
            cursor.execute(query, values)
            updated_event = cursor.fetchone()
            db.commit()
            return updated_event
        except Exception as e:
            print(f"Error updating event {event_id}: {e}")
            return None
    
    def delete_event(self, event_id: str) -> bool:
        """Delete an event from the database."""
        try:
            cursor = db.get_cursor()
            cursor.execute("DELETE FROM events WHERE id = %s RETURNING id", (event_id,))
            result = cursor.fetchone()
            db.commit()
            return result is not None
        except Exception as e:
            print(f"Error deleting event {event_id}: {e}")
            return False
    
    def search_events(self, search_term: str) -> List[Dict[str, Any]]:
        """Search for events by title or description."""
        try:
            cursor = db.get_cursor()
            search_pattern = f"%{search_term}%"
            query = """
                SELECT * FROM events 
                WHERE (title ILIKE %s OR description ILIKE %s)
                AND date >= CURRENT_DATE
                AND status = 'active'
                ORDER BY date ASC
            """
            cursor.execute(query, (search_pattern, search_pattern))
            events = cursor.fetchall()
            return events
        except Exception as e:
            print(f"Error searching events: {e}")
            return []
    
    # Booking operations
    def create_booking(self, booking_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Create a new booking in the database."""
        try:
            cursor = db.get_cursor()
            
            # Extract booking data
            event_id = booking_data.get('event_id')
            user_id = booking_data.get('user_id')
            quantity = booking_data.get('quantity')
            total_price = booking_data.get('total_price')
            payment_status = booking_data.get('payment_status', 'pending')
            
            cursor.execute(
                """
                INSERT INTO bookings (event_id, user_id, quantity, total_price, payment_status) 
                VALUES (%s, %s, %s, %s, %s) 
                RETURNING *
                """,
                (event_id, user_id, quantity, total_price, payment_status)
            )
            new_booking = cursor.fetchone()
            db.commit()
            return new_booking
        except Exception as e:
            print(f"Error creating booking: {e}")
            return None
    
    def get_user_bookings(self, user_id: str) -> List[Dict[str, Any]]:
        """Retrieve all bookings for a specific user."""
        try:
            cursor = db.get_cursor()
            query = """
                SELECT b.*, e.title as event_title, e.date as event_date, e.time as event_time,
                      e.location as event_location, e.image_url as event_image_url
                FROM bookings b
                JOIN events e ON b.event_id = e.id
                WHERE b.user_id = %s
                ORDER BY b.created_at DESC
            """
            cursor.execute(query, (user_id,))
            bookings = cursor.fetchall()
            return bookings
        except Exception as e:
            print(f"Error retrieving bookings for user {user_id}: {e}")
            return []
    
    # Enquiry operations
    def submit_enquiry(self, enquiry_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Submit a new enquiry to the database."""
        try:
            cursor = db.get_cursor()
            
            # Extract enquiry data
            name = enquiry_data.get('name')
            email = enquiry_data.get('email')
            phone = enquiry_data.get('phone')
            message = enquiry_data.get('message')
            event_type = enquiry_data.get('event_type')
            
            cursor.execute(
                """
                INSERT INTO enquiries (name, email, phone, message, event_type) 
                VALUES (%s, %s, %s, %s, %s) 
                RETURNING *
                """,
                (name, email, phone, message, event_type)
            )
            new_enquiry = cursor.fetchone()
            db.commit()
            return new_enquiry
        except Exception as e:
            print(f"Error submitting enquiry: {e}")
            return None
    
    # Additional useful operations
    def get_event_availability(self, event_id: str) -> Optional[Dict[str, Any]]:
        """Check availability for an event."""
        try:
            cursor = db.get_cursor()
            cursor.execute(
                """
                SELECT 
                    max_attendees, 
                    current_attendees,
                    (max_attendees - current_attendees) as available_spots
                FROM events
                WHERE id = %s
                """, 
                (event_id,)
            )
            availability = cursor.fetchone()
            return availability
        except Exception as e:
            print(f"Error checking event availability for {event_id}: {e}")
            return None
    
    def get_event_revenue(self, event_id: str) -> float:
        """Calculate total revenue for an event."""
        try:
            cursor = db.get_cursor()
            cursor.execute(
                """
                SELECT SUM(total_price) as total_revenue
                FROM bookings
                WHERE event_id = %s AND payment_status = 'completed'
                """, 
                (event_id,)
            )
            result = cursor.fetchone()
            return float(result['total_revenue'] or 0)
        except Exception as e:
            print(f"Error calculating event revenue for {event_id}: {e}")
            return 0.0

# Create database instance
evento_db = EventoDatabase()
