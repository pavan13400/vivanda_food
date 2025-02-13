// Handle dynamic field generation based on order type
document.getElementById('orderType').addEventListener('change', function () {
    const dynamicFields = document.getElementById('dynamicFields');
    dynamicFields.innerHTML = ''; // Clear existing fields
  
    const selectedType = this.value;
  
    if (selectedType === 'Medicine') {
      dynamicFields.innerHTML = `
        <label for="medicineName">Medicine Name:</label>
        <input type="text" id="medicineName" placeholder="Enter medicine name" required>
        <label for="medicineQuantity">Quantity:</label>
        <input type="number" id="medicineQuantity" placeholder="Enter quantity" required>
      `;
    } else if (selectedType === 'Food') {
      dynamicFields.innerHTML = `
        <label for="foodType">Type of Food:</label>
        <select id="foodType" required>
          <option value="">Select Food Type</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Snacks">Snacks</option>
          <option value="Desserts">Desserts</option>
        </select>
        <label for="foodQuantity">Food Quantity (in kgs):</label>
        <input type="number" id="foodQuantity" placeholder="Enter quantity" required>
      `;
    } else if (selectedType === 'Groceries') {
      dynamicFields.innerHTML = `
        <label for="groceryList">Grocery Items:</label>
        <textarea id="groceryList" placeholder="Enter items separated by commas" rows="4" required></textarea>
        <label for="groceryAddress">Delivery Address:</label>
        <textarea id="groceryAddress" placeholder="Enter your address" rows="4" required></textarea>
      `;
    }
  });
  
  // Handle form submission
  document.getElementById('orderForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page refresh
  
    const orderType = document.getElementById('orderType').value;
  
    if (!orderType) {
      alert('Please select an order type!');
      return;
    }
  
    let orderDetails = 'Order Type: ${orderType}\n';
  
    if (orderType === 'Medicine') {
      const medicineName = document.getElementById('medicineName').value;
      const medicineQuantity = document.getElementById('medicineQuantity').value;
      orderDetails += 'Medicine Name: ${medicineName}\nQuantity: ${medicineQuantity}';
    } else if (orderType === 'Food') {
      const foodType = document.getElementById('foodType').value;
      const foodQuantity = document.getElementById('foodQuantity').value;
      orderDetails += 'Food Type: ${foodType}\nQuantity: ${foodQuantity}';
    } else if (orderType === 'Groceries') {
      const groceryList = document.getElementById('groceryList').value;
      const groceryAddress = document.getElementById('groceryAddress').value;
      orderDetails += 'Items: ${groceryList}\nDelivery Address: ${groceryAddress}';
    }
  
    console.log('Order Details:\n' + orderDetails);
    document.getElementById('orderSuccess').style.display = 'block'; // Show success message
    document.getElementById('orderForm').reset(); // Clear the form
  });