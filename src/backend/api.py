
from flask import Flask, request, jsonify
from flask_cors import CORS
from .db_operations import evento_db

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "Evento API is running"})

# User endpoints
@app.route('/api/users', methods=['GET'])
def get_users():
    users = evento_db.get_users()
    return jsonify(users)

@app.route('/api/users/<user_id>', methods=['GET'])
def get_user(user_id):
    user = evento_db.get_user(user_id)
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found"}), 404

@app.route('/api/users', methods=['POST'])
def create_user():
    user_data = request.json
    new_user = evento_db.create_user(user_data)
    if new_user:
        return jsonify(new_user), 201
    return jsonify({"error": "Failed to create user"}), 400

@app.route('/api/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    updates = request.json
    updated_user = evento_db.update_user(user_id, updates)
    if updated_user:
        return jsonify(updated_user)
    return jsonify({"error": "Failed to update user"}), 400

@app.route('/api/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    success = evento_db.delete_user(user_id)
    if success:
        return jsonify({"message": "User deleted successfully"})
    return jsonify({"error": "Failed to delete user"}), 400

# Event endpoints
@app.route('/api/events', methods=['GET'])
def get_events():
    search_term = request.args.get('search')
    if search_term:
        events = evento_db.search_events(search_term)
    else:
        events = evento_db.get_events()
    return jsonify(events)

@app.route('/api/events/<event_id>', methods=['GET'])
def get_event(event_id):
    event = evento_db.get_event(event_id)
    if event:
        return jsonify(event)
    return jsonify({"error": "Event not found"}), 404

@app.route('/api/events', methods=['POST'])
def create_event():
    event_data = request.json
    new_event = evento_db.create_event(event_data)
    if new_event:
        return jsonify(new_event), 201
    return jsonify({"error": "Failed to create event"}), 400

@app.route('/api/events/<event_id>', methods=['PUT'])
def update_event(event_id):
    updates = request.json
    updated_event = evento_db.update_event(event_id, updates)
    if updated_event:
        return jsonify(updated_event)
    return jsonify({"error": "Failed to update event"}), 400

@app.route('/api/events/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    success = evento_db.delete_event(event_id)
    if success:
        return jsonify({"message": "Event deleted successfully"})
    return jsonify({"error": "Failed to delete event"}), 400

@app.route('/api/events/<event_id>/availability', methods=['GET'])
def event_availability(event_id):
    availability = evento_db.get_event_availability(event_id)
    if availability:
        return jsonify(availability)
    return jsonify({"error": "Failed to check event availability"}), 400

@app.route('/api/events/<event_id>/revenue', methods=['GET'])
def event_revenue(event_id):
    revenue = evento_db.get_event_revenue(event_id)
    return jsonify({"event_id": event_id, "total_revenue": revenue})

# Booking endpoints
@app.route('/api/bookings', methods=['POST'])
def create_booking():
    booking_data = request.json
    new_booking = evento_db.create_booking(booking_data)
    if new_booking:
        return jsonify(new_booking), 201
    return jsonify({"error": "Failed to create booking"}), 400

@app.route('/api/users/<user_id>/bookings', methods=['GET'])
def get_user_bookings(user_id):
    bookings = evento_db.get_user_bookings(user_id)
    return jsonify(bookings)

# Enquiry endpoints
@app.route('/api/enquiries', methods=['POST'])
def submit_enquiry():
    enquiry_data = request.json
    new_enquiry = evento_db.submit_enquiry(enquiry_data)
    if new_enquiry:
        return jsonify(new_enquiry), 201
    return jsonify({"error": "Failed to submit enquiry"}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
