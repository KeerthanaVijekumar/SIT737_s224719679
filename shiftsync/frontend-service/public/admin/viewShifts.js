// viewShifts.js
console.log("viewShifts.js loaded");

async function loadShifts() {
  const tbody = document.querySelector('#shiftsTable tbody');
  const noShiftsMsg = document.getElementById('noShiftsMsg');

  tbody.innerHTML = '';
  noShiftsMsg.style.display = 'none';

  const ADMIN_API_URL = 'http://35.189.45.141:3000';

  try {
    const response = await fetch('${process.env.ADMIN_API_URL}/shifts');
    console.log("Fetch response status:", response.status);
    if (!response.ok) throw new Error('Failed to fetch shifts');

    const shifts = await response.json();
    console.log("Shifts received:", shifts);

    if (shifts.length === 0) {
      noShiftsMsg.style.display = 'block';
      return;
    }

    shifts.forEach(shift => {
      console.log("Appending shift:", shift);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="border: 1px solid #ddd; padding: 8px;">${shift.shiftId}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${shift.date}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${shift.startTime}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${shift.endTime}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error loading shifts:", error);
    noShiftsMsg.textContent = 'Error loading shifts.';
    noShiftsMsg.style.display = 'block';
  }
}

window.loadShifts = loadShifts;