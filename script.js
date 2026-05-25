// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Mobile Menu
document.querySelector('.hamburger').addEventListener('click', () => {
  alert("Mobile menu coming soon! 😊");
});

// Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert("✅ Thank you! Your message has been received by NovaCore AI.");
  this.reset();
});