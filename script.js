document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Back to top button
  const backToTopButton = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Animate progress bars when they come into view
  const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = '0';
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            bar.style.width = width + '%';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(bar);
    });
  };

  // Animate timeline items when they come into view
  const animateTimelineItems = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(item);
    });
  };

  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Basic form validation
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
      }
      
      // Here you would typically send the form data to a server
      console.log('Form submitted:', { name, email, subject, message });
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
  }

  // Header scroll effect
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      header.style.padding = '1rem 2rem';
      header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    } else {
      header.classList.remove('scrolled');
      header.style.padding = '1.5rem 2rem';
      header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
  });

  // Project card hover effect
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.querySelector('.project-overlay').style.opacity = '1';
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('.project-overlay').style.opacity = '0';
    });
  });

  // Initialize animations
  animateProgressBars();
  animateTimelineItems();

  // Lazy loading images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { threshold: 0.1 });

  images.forEach(img => imageObserver.observe(img));

  // Active navigation link highlighting
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active-link');
      }
    });
  });
});
 document.querySelector('.view-more-btn').addEventListener('click', function () {
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    const arrowIcon = document.getElementById('arrow-icon');
    const isExpanded = arrowIcon.textContent === '›';

    hiddenProjects.forEach(project => {
      project.style.display = isExpanded ? 'block' : 'none';
    });

    arrowIcon.textContent = isExpanded ? '˅' : '›';
    this.innerHTML = isExpanded ? 'View Less <span id="arrow-icon">˅</span>' : 'View More <span id="arrow-icon">›</span>';
  });


document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    subject: document.getElementById('subject').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  fetch('script/sdjdsldsk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    alert('Message sent successfully!');
    document.getElementById('contactForm').reset();
  })
  .catch(error => {
    console.error('Error!', error.message);
    alert('There was an error sending your message.');
  });
});
