

/* Please ❤ this if you like it! */

/* -----------------Navigation----------------- */
 (function($) { "use strict";

	$(function() {
		var header = $(".start-style");
		$(window).scroll(function() {    
			var scroll = $(window).scrollTop();
		
			if (scroll >= 10) {
				header.removeClass('start-style').addClass("scroll-on");
			} else {
				header.removeClass("scroll-on").addClass('start-style');
			}
		});
	});		
		
	//Animation
	


	//Menu On Hover
		
	$('body').on('mouseenter mouseleave','.nav-item',function(e){
			if ($(window).width() > 750) {
				var _d=$(e.target).closest('.nav-item');_d.addClass('show');
				setTimeout(function(){
				_d[_d.is(':hover')?'addClass':'removeClass']('show');
				},1);
			}
	});	
	
	//Switch light/dark
	
	$("#switch").on('click', function () {
		if ($("body").hasClass("dark")) {
			$("body").removeClass("dark");
			$("#switch").removeClass("switched");
		}
		else {
			$("body").addClass("dark");
			$("#switch").addClass("switched");
		}
	});  
	
  })(jQuery); 

// Declare iso variable in the global scope
var iso;

document.addEventListener("DOMContentLoaded", function() {
    // Initialize Isotope
    iso = new Isotope('.portfolio', {
        itemSelector: '.portfolio_item',
        masonry: {
            // columnWidth: 500,
            gutter: 18,
        }
    });

    // Add Event Listener to Filter Buttons
    var buttons = document.querySelectorAll(".filters button");
    buttons.forEach(function(b) {
        b.addEventListener("click", filter);
    });

    // Initial filter trigger
    var activeButton = document.querySelector(".filters button.active");
    if (activeButton) {
        var filterValue = '.' + activeButton.id;
        iso.arrange({ filter: filterValue });
    }
});

// Filter by button id
function filter(e) {
    var buttons = document.querySelectorAll(".filters button");
    buttons.forEach(function(button) {
        button.classList.remove('active');
    });
    e.target.classList.add("active");
    var filterValue = '.' + e.target.id;
    iso.arrange({ filter: filterValue });
}





 // JavaScript to handle hover effect
 document.addEventListener("DOMContentLoaded", function() {
  var images = document.querySelectorAll(".card_content_image");
  images.forEach(function(image) {
    image.addEventListener("mouseenter", function() {
      var title = this.nextElementSibling.querySelector(".project-title");
      title.classList.add("underline");
    });
    image.addEventListener("mouseleave", function() {
      var title = this.nextElementSibling.querySelector(".project-title");
      title.classList.remove("underline");
    });
  });
});

function toggleIcon(link) {
	// Remove active class from all links
	const navLinks = document.querySelectorAll('.nav-link');
	navLinks.forEach(item => {
		item.classList.remove('active');
	});

	// Add active class to the clicked link
	link.classList.add('active');

	// Reset all icons to regular
	const icons = document.querySelectorAll('.nav-link i');
	icons.forEach(icon => {
		icon.classList.remove('fa-solid');
		icon.classList.add('fa-regular');
	});

	// Toggle the clicked link's icon to solid
	const icon = link.querySelector('i');
	icon.classList.remove('fa-regular');
	icon.classList.add('fa-solid');
}

function openOverlay(imageSrc) {
	const overlay = document.getElementById('overlay');
	const overlayImage = document.getElementById('overlay-image');
	
	overlay.style.display = 'flex';
	overlayImage.src = imageSrc;
  }
  
  function closeOverlay() {
	const overlay = document.getElementById('overlay');
	overlay.style.display = 'none';
  }





  function scrollValue() {
    var navbar = document.querySelector('.navigation-wrap');
    var scroll = window.scrollY;

    // Check if the current page is index.html
    if (window.location.pathname.includes('index.html')) {
        if (scroll < 200) {
            navbar.classList.remove('BgColour-Index');
            navbar.classList.add('BgColour-Default');
        } else {
            navbar.classList.remove('BgColour-Default');
            navbar.classList.add('BgColour-Index');
        }
    } else {
        if (scroll < 500) {
            navbar.classList.remove('BgColour-Other');
   
        } else {
     
            navbar.classList.add('BgColour-Other');
        }
    }
}

window.addEventListener('scroll', scrollValue);



document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-item a');
  const sections = document.querySelectorAll('section[id]');
  const currentPage = window.location.pathname.split('/').pop(); // Get the current page name

  // Function to change active navigation based on scroll position
  function changeActiveNav() {
      if (currentPage === 'index.html') {
          let index = sections.length;

          while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

          navLinks.forEach((link) => link.parentElement.classList.remove('active'));
          if (index >= 0) {
              navLinks[index].parentElement.classList.add('active');
          }
      }
  }

  // Add scroll event listener
  window.addEventListener('scroll', changeActiveNav);
  changeActiveNav(); // Run on page load

  // Add click event listener to nav links
  navLinks.forEach((link) => {
      link.addEventListener('click', function(event) {
          const href = this.getAttribute('href');

          // Only prevent default for internal hash links on the index.html page
          if (currentPage === 'index.html' && href.startsWith('#')) {
              event.preventDefault(); // Prevent default anchor click behavior

              const targetId = href.substring(1);
              const targetSection = document.getElementById(targetId);

              if (targetSection) {
                  window.scrollTo({
                      top: targetSection.offsetTop,
                      behavior: 'smooth'
                  });
              }
          }
      });
  });
});



  