document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown-btn');
  
    // Function to toggle dropdown and update icon
    function toggleDropdown(dropdown) {
      const dropdownContainer = dropdown.nextElementSibling;
      const triangleIcon = dropdown.querySelector('.triangle-icon');
  
      dropdownContainer.classList.toggle('active');
      triangleIcon.classList.toggle('rotated');
    }
  
    // Attach event listeners to dropdowns
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('click', function () {
        toggleDropdown(this);
      });
    });
  
    // Function to update the main nav link icon
    function updateNavLinkIcon(id, isActive) {
      const navLink = document.querySelector(`a[href="#${id}"]`);
      if (navLink) {
        const icon = navLink.querySelector('i.fa-circle');
        const triangleIcon = navLink.querySelector('.triangle-icon');
        
        // Update icon
        if (icon) {
          if (isActive) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
          } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
          }
        }
        
        // Rotate triangle icon
        if (triangleIcon) {
          if (isActive) {
            triangleIcon.classList.add('rotated');
          } else {
            triangleIcon.classList.remove('rotated');
          }
        }
      }
    }
  
    // Intersection Observer callback to handle the sections and submenus
    const observer = new IntersectionObserver((entries) => {
      let activeId = null;
  
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        if (entry.isIntersecting) {
          activeId = id;
        }
      });
  
      // Update icons based on the active section
      if (activeId) {
        updateNavLinkIcon(activeId, true);
      }
  
      // Ensure icons for non-active sections are set to fa-regular
      document.querySelectorAll('.page').forEach(section => {
        const id = section.getAttribute('id');
        if (id !== activeId) {
          updateNavLinkIcon(id, false);
        }
      });
  
      // Check submenus to update the corresponding main nav link icon
      document.querySelectorAll('.sub-menu').forEach(submenu => {
        submenu.querySelectorAll('a').forEach(link => {
          const href = link.getAttribute('href');
          if (href.startsWith('#')) {
            const id = href.substring(1);
            const submenuItem = document.querySelector(`#${id}`);
            if (submenuItem && submenuItem.getBoundingClientRect().top < window.innerHeight) {
              updateNavLinkIcon(id, true);
            } else {
              updateNavLinkIcon(id, false);
            }
          }
        });
      });
    }, { threshold: 0.5 }); // Adjust the threshold as needed
  
    // Observe main sections
    document.querySelectorAll('.page').forEach(section => {
      observer.observe(section);
    });
  
    // Observe submenu items
    document.querySelectorAll('.sub-menu a').forEach(link => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        const id = href.substring(1);
        const submenuItem = document.querySelector(`#${id}`);
        if (submenuItem) {
          observer.observe(submenuItem);
        }
      }
    });
  });



/*   document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const leftNav = document.getElementById('leftNav');
  
    menuToggle.addEventListener('click', function () {
      if (leftNav.style.display === 'block') {
        leftNav.style.display = 'none';
      } else {
        leftNav.style.display = 'block';
      }
    });
  }); */
  