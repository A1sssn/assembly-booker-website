//api

document.addEventListener('DOMContentLoaded', () => {
  const FIREBASE_DB_URL = "https://assembly-booker-default-rtdb.asia-southeast1.firebasedatabase.app";
  let activeRoomId = "";

  // 1. Listen for hotspot clicks to open the booking panel
  document.querySelectorAll('.hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', (event) => {
      activeRoomId = event.target.id;
      document.getElementById('booking-panel').style.display = 'flex';
      document.getElementById('selected-room-title').innerText = `Booking: ${activeRoomId.replace(/-/g, ' ')}`;
    });
  });

  // 2. Close Panel Handler
  document.getElementById('close-panel').addEventListener('click', () => {
    document.getElementById('booking-panel').style.display = 'none';
  });

  // 3. Handle data collation and transmission to Firebase API
  document.getElementById('submit-booking').addEventListener('click', async () => {
    const timeInput = document.getElementById('booking-time').value;

    if (!timeInput) {
      alert("Please select a date and time first!");
      return;
    }

    // Capture all form inputs safely
    const bookingData = {
      room: activeRoomId,
      dateTime: timeInput,
      createdAt: new Date().toISOString(),
      remarks: {
        bookingFor: document.getElementById('booking-for').value,
        carpets: parseInt(document.getElementById('carpets').value) || 0,
        totalViewers: parseInt(document.getElementById('total-viewers').value) || 0,
        classViewing: document.getElementById('class-viewing').value,
        sectionsViewing: document.getElementById('sections-viewing').value,
        chairsNeeded: parseInt(document.getElementById('chairs').value) || 0,
        otherRequirements: document.getElementById('other-requirements').value
      }
    };

    try {
      const response = await fetch(`${FIREBASE_DB_URL}/bookings.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) throw new Error('Database insertion rejected');

      const result = await response.json();
      alert(`Success! Saved with ID: ${result.name}`);
      
      // Reset all fields back to blank or default options
      document.getElementById('booking-time').value = '';
      document.getElementById('booking-for').value = '';
      document.getElementById('carpets').value = '0';
      document.getElementById('total-viewers').value = '0';
      document.getElementById('class-viewing').value = '';
      document.getElementById('sections-viewing').value = '';
      document.getElementById('chairs').value = '0';
      document.getElementById('other-requirements').value = '';
      
      document.getElementById('booking-panel').style.display = 'none';

    } catch (error) {
      console.error('Firebase Error:', error);
      alert('Could not sync data to Firebase cloud servers.');
    }
  });
});


/* legacy code again
// Ensure HTML is fully loaded before running script
document.addEventListener('DOMContentLoaded', () => {
  
  const FIREBASE_DB_URL = "https://assembly-booker-default-rtdb.asia-southeast1.firebasedatabase.app";
  let activeRoomId = "";

  // 1. Grab all hotspots
  const hotspots = document.querySelectorAll('.hotspot');
  console.log(`Found ${hotspots.length} hotspots on the page.`); // Debug line

  // 2. Listen for hotspot clicks
  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', (event) => {
      activeRoomId = event.target.id;
      
      // Make the panel visible
      const panel = document.getElementById('booking-panel');
      panel.style.display = 'block';
      
      // Update the heading text
      document.getElementById('selected-room-title').innerText = `Booking: ${activeRoomId.replace(/-/g, ' ')}`;
    });
  });

  // 3. Handle Firebase form submission
  document.getElementById('submit-booking').addEventListener('click', async () => {
    const timeInput = document.getElementById('booking-time').value;
    if (!timeInput) {
      alert("Please select a date and time first!");
      return;
    }

    const bookingData = {
      room: activeRoomId,
      dateTime: timeInput,
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch(`${FIREBASE_DB_URL}/bookings.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) throw new Error('Network response failure');
      
      const result = await response.json();
      alert(`Success! Ticket Reference: ${result.name}`);
      
      document.getElementById('booking-time').value = '';
      document.getElementById('booking-panel').style.display = 'none';

    } catch (error) {
      console.error('Firebase Save Error:', error);
      alert('Failed to save booking.');
    }
  });

});
*/


//legacy code that i cant remove :(
/*

"// Replace this string with your actual Firebase Realtime Database URL
const FIREBASE_DB_URL = "https://console.firebase.google.com/project/assembly-booker/database/assembly-booker-default-rtdb/data/~2F";

let activeRoomId = "";

// 1. Listen for hotspot clicks to open the booking panel
document.querySelectorAll('.hotspot').forEach(hotspot => {
  hotspot.addEventListener('click', (event) => {
    activeRoomId = event.target.id; // e.g., "main-stage"
    
    // Show the booking form and update label text
    document.getElementById('booking-panel').style.display = 'block';
    document.getElementById('selected-room-title').innerText = `Booking: ${activeRoomId.replace(/-/g, ' ')}`;
  });
});

// 2. Handle submitting the booking payload to Firebase API
document.getElementById('submit-booking').addEventListener('click', async () => {
  const timeInput = document.getElementById('booking-time').value;

  if (!timeInput) {
    alert("Please select a date and time first!");
    return;
  }

  // Create the data payload matching your request
  const bookingData = {
    room: activeRoomId,
    dateTime: timeInput,
    createdAt: new Date().toISOString()
  };

  try {
    // Send standard HTTP POST request. Firebase requires ".json" at the end of the URL endpoint path
    const response = await fetch(`${FIREBASE_DB_URL}/bookings.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });

    if (!response.ok) {
      throw new Error('Network response failure');
    }

    const result = await response.json();
    alert(`Success! Room booked. Ticket Reference: ${result.name}`);
    
    // Clean up interface
    document.getElementById('booking-time').value = '';
    document.getElementById('booking-panel').style.display = 'none';

  } catch (error) {
    console.error('Firebase Save Error:', error);
    alert('Failed to save booking. Make sure your Firebase Realtime Database rules are set to public for testing.');
  }
});"
*/
