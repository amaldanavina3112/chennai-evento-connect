
#!/usr/bin/env python3
import os
from dotenv import load_dotenv
from api import app
from db_connection import test_connection

# Load environment variables
load_dotenv()

if __name__ == '__main__':
    # Test database connection
    connection_successful = test_connection()
    
    if connection_successful:
        print("Database connection test successful. Starting API server...")
        # Get port from environment variable or use default
        port = int(os.getenv('API_PORT', 5000))
        
        # Start the Flask server
        app.run(
            debug=os.getenv('FLASK_DEBUG', 'True').lower() == 'true',
            host='0.0.0.0',
            port=port
        )
    else:
        print("Database connection test failed. Check your database configuration.")
        exit(1)
