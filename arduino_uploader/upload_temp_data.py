import serial
import time
import requests
import json

# --- Configuration ---
COM_PORT = 'COM4'  # Adjust to your Arduino's COM port
BAUD_RATE = 9600
SUPABASE_URL = "https://owwxqlqusxudxdypiuol.supabase.co"
SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93d3hxbHF1c3h1ZHhkeXBpdW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjY0ODcsImV4cCI6MjA2NjkwMjQ4N30.oQLCPnCwL4kJFvzhi-OOlS9O5yd8BXqOQZBoE7fJcdY"
SUPABASE_TABLE = "temp_logs"

def send_to_supabase(data):
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json"
    }
    response = requests.post(f"{SUPABASE_URL}/rest/v1/{SUPABASE_TABLE}", json=[data], headers=headers)
    if response.status_code == 201:
        print(" Data sent to Supabase successfully!")
    else:
        print(" Error sending data:", response.status_code, response.text)

def main():
    ser = serial.Serial(COM_PORT, BAUD_RATE, timeout=1)
    time.sleep(2)  # Wait for Arduino to initialize
    print(" Listening to Arduino...")

    while True:
        if ser.in_waiting:
            line = ser.readline().decode('utf-8', errors='ignore').strip()
            print(" Received:", line)

            try:
                data = json.loads(line)
                # Ensure all expected keys are present
                if all(k in data for k in ["temperature", "humidity", "air_quality", "vibration"]):
                    send_to_supabase(data)
                else:
                    print(" Incomplete data, skipping.")
            except json.JSONDecodeError:
                print(" Failed to parse JSON.")

if __name__ == "__main__":
    main()
