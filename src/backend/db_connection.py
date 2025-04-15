
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class DatabaseConnection:
    """Database connection manager for the Evento application."""
    
    def __init__(self):
        """Initialize the database connection."""
        self.connection = None
        self.db_config = {
            'host': os.getenv('DB_HOST', 'localhost'),
            'database': os.getenv('DB_NAME', 'evento_db'),
            'user': os.getenv('DB_USER', 'postgres'),
            'password': os.getenv('DB_PASSWORD', ''),
            'port': os.getenv('DB_PORT', '5432')
        }
    
    def connect(self):
        """Establish a connection to the database."""
        try:
            if self.connection is None or self.connection.closed:
                self.connection = psycopg2.connect(
                    **self.db_config,
                    cursor_factory=RealDictCursor
                )
                print("Database connection established successfully.")
            return self.connection
        except psycopg2.Error as e:
            print(f"Database connection error: {e}")
            raise
    
    def close(self):
        """Close the database connection."""
        if self.connection and not self.connection.closed:
            self.connection.close()
            print("Database connection closed.")
    
    def get_cursor(self):
        """Get a cursor for executing SQL commands."""
        conn = self.connect()
        return conn.cursor()
    
    def commit(self):
        """Commit the current transaction."""
        if self.connection and not self.connection.closed:
            self.connection.commit()

# Singleton instance
db = DatabaseConnection()

# Example usage
def test_connection():
    """Test the database connection."""
    try:
        connection = db.connect()
        cursor = connection.cursor()
        cursor.execute("SELECT version();")
        version = cursor.fetchone()
        print(f"PostgreSQL version: {version['version']}")
        db.close()
        return True
    except Exception as e:
        print(f"Error testing connection: {e}")
        return False

if __name__ == "__main__":
    test_connection()
