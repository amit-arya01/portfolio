'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });




// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

//-----------------------------------*\
//  #NAVIGATION FUNCTIONALITY
//\*-----------------------------------*/

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase().replace(/\s+/g, '-') === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



//-----------------------------------*\
//  #ENHANCED NAVIGATION
//\*-----------------------------------*/

// Get all navigation buttons
const navButtons = document.querySelectorAll('[data-nav-link]');
const articles = document.querySelectorAll('[data-page]');

// Add click event to navigation buttons
navButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all buttons and articles
    navButtons.forEach(btn => btn.classList.remove('active'));
    articles.forEach(article => article.classList.remove('active'));
    
    // Add active class to clicked button
    this.classList.add('active');
    
    // Show corresponding article
    const targetPage = this.textContent.toLowerCase().replace(/\s+/g, '-');
    const targetArticle = document.querySelector(`[data-page="${targetPage}"]`);
    if (targetArticle) {
      targetArticle.classList.add('active');
    }
  });
});

//-----------------------------------*\
//  #PROJECT MODAL FUNCTIONALITY
//\*-----------------------------------*/

// Get all project links
const projectLinks = document.querySelectorAll('.project-link');

// Add click event to project links
projectLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    const projectType = this.getAttribute('data-project');
    showProjectDetails(projectType);
  });
});

// Function to show project details
function showProjectDetails(projectType) {
  const projectData = {
    'ecommerce': {
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution built with Django backend and React frontend.',
      technologies: ['Django', 'React', 'PostgreSQL', 'Redux', 'Stripe API'],
      features: ['User authentication', 'Product catalog', 'Shopping cart', 'Payment processing', 'Admin dashboard'],
      github: '#',
      live: '#'
    },
    'algorithm-visualizer': {
      title: 'Algorithm Visualizer',
      description: 'Interactive visualization of sorting and pathfinding algorithms with step-by-step execution.',
      technologies: ['Python', 'Tkinter', 'Algorithms', 'Data Structures'],
      features: ['Sorting algorithms', 'Pathfinding algorithms', 'Step-by-step visualization', 'Speed control'],
      github: '#',
      live: '#'
    },
    'ml-predictor': {
      title: 'ML Predictor',
      description: 'Machine learning model for predictive analytics with web interface.',
      technologies: ['Python', 'Scikit-learn', 'Flask', 'Pandas', 'NumPy'],
      features: ['Data preprocessing', 'Model training', 'Prediction interface', 'Model evaluation'],
      github: '#',
      live: '#'
    }
  };
  
  const project = projectData[projectType];
  if (project) {
    showProjectModal(project);
  }
}

// Function to show project modal
function showProjectModal(project) {
  // Create modal HTML
  const modalHTML = `
    <div class="project-modal" id="projectModal">
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>${project.title}</h2>
        <p class="project-description">${project.description}</p>
        
        <div class="project-details">
          <div class="technologies">
            <h3>Technologies Used</h3>
            <ul>
              ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
            </ul>
          </div>
          
          <div class="features">
            <h3>Key Features</h3>
            <ul>
              ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div class="project-links">
          <a href="${project.github}" class="project-link-btn">View Code</a>
          <a href="${project.live}" class="project-link-btn">Live Demo</a>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Show modal
  const modal = document.getElementById('projectModal');
  modal.style.display = 'block';
  
  // Close modal functionality
  const closeBtn = modal.querySelector('.close-modal');
  closeBtn.onclick = function() {
    modal.remove();
  };
  
  // Close modal when clicking outside
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.remove();
    }
  };
}

//-----------------------------------*\
//  #BLOG INTERACTIVITY
//\*-----------------------------------*/

// Get all blog links
const blogLinks = document.querySelectorAll('.blog-link');

// Add click event to blog links
blogLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    const blogType = this.getAttribute('data-blog');
    showBlogPreview(blogType);
  });
});

// Function to show blog preview
function showBlogPreview(blogType) {
  const blogData = {
    'python-algorithms': {
      title: 'Understanding Python Algorithms: A Deep Dive',
      content: 'This comprehensive guide explores time complexity, space complexity, and practical implementations of common algorithms in Python. We\'ll cover sorting algorithms, searching algorithms, and data structure operations with real-world examples.',
      readTime: '8 min read',
      difficulty: 'Intermediate'
    },
    'django-best-practices': {
      title: 'Django Best Practices for Production',
      content: 'Learn essential practices for building scalable, maintainable Django applications. This article covers project structure, database optimization, security best practices, and deployment strategies.',
      readTime: '12 min read',
      difficulty: 'Advanced'
    }
  };
  
  const blog = blogData[blogType];
  if (blog) {
    showBlogModal(blog);
  }
}

// Function to show blog modal
function showBlogModal(blog) {
  const modalHTML = `
    <div class="blog-modal" id="blogModal">
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>${blog.title}</h2>
        <div class="blog-meta">
          <span class="read-time">${blog.readTime}</span>
          <span class="difficulty">${blog.difficulty}</span>
        </div>
        <p>${blog.content}</p>
        <button class="read-more-btn">Read Full Article</button>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  const modal = document.getElementById('blogModal');
  modal.style.display = 'block';
  
  const closeBtn = modal.querySelector('.close-modal');
  closeBtn.onclick = function() {
    modal.remove();
  };
  
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.remove();
    }
  };
}

//-----------------------------------*\
//  #SKILLS ANIMATION
//\*-----------------------------------*/

// Animate skill bars on scroll
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
}

// Trigger skill animation when skills section is visible
const skillsSection = document.querySelector('.resume');
if (skillsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  });
  
  observer.observe(skillsSection);
}