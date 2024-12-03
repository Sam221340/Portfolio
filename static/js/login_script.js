// Query selectors for elements
let usernameInput = document.querySelector('.username');
let passwordInput = document.querySelector('.password');
let showPasswordButton = document.querySelector('.password-button');
let face = document.querySelector('.face');
let hands = document.querySelectorAll('.hand');
let tongue = document.querySelector('.tongue');




// Helper function to toggle classes
const toggleClass = (elements, className, add) => {
  elements.forEach(el => el.classList[add ? 'add' : 'remove'](className));
};

// Password input: focus event
passwordInput.addEventListener('focus', () => {
  toggleClass(hands, 'hide', true); // Hide hands
  tongue.classList.remove('breath'); // Stop tongue animation
});

// Password input: blur event
passwordInput.addEventListener('blur', () => {
  toggleClass(hands, 'hide', false); // Show hands
  toggleClass(hands, 'peek', false); // Ensure no peeking
  tongue.classList.add('breath'); // Resume tongue animation
});

// Username input: focus event
usernameInput.addEventListener('focus', () => {
  let length = Math.min(usernameInput.value.length - 16, 19); // Calculate rotation
  toggleClass(hands, 'hide', false); // Show hands
  toggleClass(hands, 'peek', false); // Reset peeking
  face.style.setProperty('--rotate-head', `${-length}deg`); // Rotate head
});

// Username input: blur event
usernameInput.addEventListener('blur', () => {
  face.style.setProperty('--rotate-head', '0deg'); // Reset head rotation
});

// Username input: input event (throttled)
usernameInput.addEventListener(
  'input',
  _.throttle(event => {
    let length = Math.min(event.target.value.length - 16, 19); // Calculate rotation
    face.style.setProperty('--rotate-head', `${-length}deg`);
  }, 100)
);





// Show/Hide password: click event
// Assign an onclick handler
showPasswordButton.onclick = () => {
  console.log("hello"); // Debugging log
  const isPasswordVisible = passwordInput.type === 'text';
  passwordInput.type = isPasswordVisible ? 'password' : 'text'; // Toggle password visibility

  // If you have hands animation logic, add it here
  toggleClass(hands, 'peek', !isPasswordVisible); // Peek if visible
  toggleClass(hands, 'hide', isPasswordVisible); // Hide hands otherwise
};

