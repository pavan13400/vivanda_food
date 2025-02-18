                                                                                                                                                                                                                                                          // Mock backend logic for login and signup
const users = [
  { username: 'user1', password: 'pass123' },
  { username: 'user2', password: 'pass456' }
];

// Check if the user is logged in from sessionStorage
let loggedIn = sessionStorage.getItem('loggedIn') === 'true';

if (loggedIn) {
  // Hide login form and show the relevant sections if logged in
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('donateSection').style.display = 'block';
  document.getElementById('orderSection').style.display = 'block';
  document.getElementById('informSection').style.display = 'block';
} else {
  document.getElementById('loginForm').style.display = 'block';
}

// Login function
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    loggedIn = true;
    sessionStorage.setItem('loggedIn', 'true');  // Store login state in sessionStorage
    alert('Login successful!');
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('donateSection').style.display = 'block';
    document.getElementById('orderSection').style.display = 'block';
    document.getElementById('informSection').style.display = 'block';  // Fixed the missing closing parenthesis
    // Redirect to another page (for example, home page or dashboard)
    window.location.href = "home.html";  // Redirect to home page after successful login
  } else {
    document.getElementById('loginError').textContent = 'Invalid username or password!';
  }
}

// Sign Up function
function signup() {
  const username = prompt("Enter a new username:");
  const password = prompt("Enter a new password:");

  if (username && password) {
    const userExists = users.some(u => u.username === username);

    if (userExists) {
      alert("Username already exists! Try a different one.");
    } else {
      users.push({ username, password });
      alert("Sign-up successful! You can now log in.");
    }
  } else {
    alert("Both username and password are required.");
  }
}

// Ensure navigation requires login for protected sections
document.getElementById('homeBtn')?.addEventListener('click', () => {
  if (!loggedIn) {
    alert('Please log in first.');
    window.location.href = "home.html";  // Redirect to the home page if not logged in
  }
});

// Attach event listeners
document.getElementById('loginBtn')?.addEventListener('click', login);
document.getElementById('signupBtn')?.addEventListener('click', signup);