// JavaScript function to toggle availability status overlay
document.addEventListener('DOMContentLoaded', function() {
    var frenchieBoxes = document.querySelectorAll('.frenchie-box');
  
    frenchieBoxes.forEach(function(box) {
      box.addEventListener('click', function() {
        this.classList.toggle('show-overlay');
      });
    });
  });
  

  document.addEventListener('DOMContentLoaded', function() {
    const blogPosts = document.querySelectorAll('.blog-post');
  
    // Function to toggle blog content visibility
    function toggleBlogContent(event) {
      const post = event.currentTarget;
      post.classList.toggle('active');
    }
  
    // Attach click event listener to each blog post
    blogPosts.forEach(post => {
      post.addEventListener('click', toggleBlogContent);
    });
  });
  // Function to handle form submission
document.getElementById("reviewForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Get input values
    const reviewText = document.getElementById("reviewText").value;
    const reviewerName = document.getElementById("reviewerName").value;
  
    // Validate input (you can add more validation if needed)
  
    // Create HTML elements for new testimonial
    const newTestimonial = document.createElement("div");
    newTestimonial.classList.add("testimonial");
  
    const quote = document.createElement("p");
    quote.classList.add("quote");
    quote.textContent = `"${reviewText}"`;
  
    const author = document.createElement("p");
    author.classList.add("author");
    author.textContent = reviewerName;
  
    // Append new testimonial to testimonials section
    const testimonialsSection = document.querySelector(".testimonials");
    testimonialsSection.insertBefore(newTestimonial, testimonialsSection.firstChild);
  
    newTestimonial.appendChild(quote);
    newTestimonial.appendChild(author);
  
    // Clear form fields after submission
    document.getElementById("reviewText").value = "";
    document.getElementById("reviewerName").value = "";
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    fetch("https://your-heroku-app.herokuapp.com/reviews")
      .then(response => response.json())
      .then(reviews => {
        const testimonialsSection = document.querySelector('.testimonials');
        reviews.forEach(review => {
          const testimonialDiv = document.createElement('div');
          testimonialDiv.className = 'testimonial';
          testimonialDiv.innerHTML = `<p class="quote">${review.review}</p><p class="author">${review.name}</p>`;
          testimonialsSection.appendChild(testimonialDiv);
        });
      })
      .catch(error => console.error('Error fetching reviews:', error));
  });

