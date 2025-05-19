const contentArea = document.getElementById('content-area');
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

if (!token || role !== 'employee') {
  alert('Unauthorized. Redirecting to login...');
  window.location.href = '/login.html';
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = '/login';
});

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    if (tab === 'available') {
      loadAvailableShifts();
    } else if (tab === 'roster') {
      loadRoster();
    } else if (tab === 'clock') {
      contentArea.innerHTML = '<h3>Clock In / Out - Coming Soon</h3>';
    }
  });
});

// === Load Available Shifts ===
async function loadAvailableShifts() {
  contentArea.innerHTML = '<h3>Loading Available Shifts...</h3>';
  try {
    const res = await fetch('http://localhost:3000/shifts/available', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Backend error: ${errorText}`);
    }

    const shifts = await res.json();

    if (!Array.isArray(shifts) || shifts.length === 0) {
      contentArea.innerHTML = '<p>No shifts available.</p>';
      return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
      <tr><th>Date</th><th>Time</th><th>Action</th></tr>
      ${shifts.map(s => `
        <tr>
          <td>${s.date}</td>
          <td>${s.time}</td>
          <td><button onclick="acceptShift('${s._id}')">Accept</button></td>
        </tr>`).join('')}
    `;

    contentArea.innerHTML = '<h3>Available Shifts</h3>';
    contentArea.appendChild(table);
  } catch (err) {
    contentArea.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

// === Accept Shift ===
async function acceptShift(shiftId) {
  try {
    const res = await fetch('http://localhost:3000/allocate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ shift_id: shiftId })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Shift accepted successfully!');
      loadAvailableShifts();
    } else {
      alert(data.message || 'Failed to accept shift');
    }
  } catch (err) {
    alert('Error accepting shift');
  }
}

// === Load My Roster ===
async function loadRoster() {
  contentArea.innerHTML = '<h3>Loading Your Roster...</h3>';
  try {
    const res = await fetch('http://localhost:3000/roster', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Backend error: ${errorText}`);
    }

    const shifts = await res.json();

    if (!Array.isArray(shifts) || shifts.length === 0) {
      contentArea.innerHTML = '<p>You have no shifts allocated yet.</p>';
      return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
      <tr><th>Date</th><th>Time</th></tr>
      ${shifts.map(s => `
        <tr>
          <td>${s.date}</td>
          <td>${s.time}</td>
        </tr>`).join('')}
    `;

    contentArea.innerHTML = '<h3>My Roster</h3>';
    contentArea.appendChild(table);
  } catch (err) {
    contentArea.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

// Load default tab
document.querySelector('.tab[data-tab="available"]').click();