document.getElementById('informForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload
  
    const address = document.getElementById('address').value;
    const photo = document.getElementById('photo').files.length;
  
    if (!address || !photo) {
      alert('Please fill in all the fields and upload a photo.');
      return;
    }
  
    document.getElementById('informSuccess').style.display = 'block'; // Display the success message

  // Optionally, hide the success message after a few seconds
  setTimeout(() => {
    document.getElementById('informSuccess').style.display = 'none';
  }, 3000);
  });