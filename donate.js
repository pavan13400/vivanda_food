// Donation Form Submission
document.getElementById('donationForm')?.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent page refresh

  // Fetch form values
  const foodQuantity = document.getElementById('foodQuantity').value;
  const foodFreshness = document.getElementById('foodFreshness').value;
  const donationAddress = document.getElementById('donationAddress').value;

  // Validation check
  if (foodQuantity && foodFreshness && donationAddress) {
    // Display success message
    document.getElementById('donationSuccess').style.display = 'block';

    // Clear form
    document.getElementById('donationForm').reset();

    // Log details (replace with backend call if needed)
    console.log(`Donation Details: 
      Food Quantity: ${foodQuantity}, 
      Freshness: ${foodFreshness}, 
      Address: ${donationAddress}`);
  }
});