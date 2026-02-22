import { loadBlogPosts } from './blog.js';

async function loadHTML(id, file) {
  try {
    const res = await fetch(file);
    const data = await res.text();
    const container = document.getElementById(id);
    container.innerHTML = data;
    return container;
  } catch (err) {
    console.error(`Failed to load ${file}:`, err);
  }
}

function initAccordions(container) {
  const accordions = container.querySelectorAll('.accordion');

  accordions.forEach(accordion => {
    const title = accordion.querySelector('.accordion-title');
    const content = accordion.querySelector('.accordion-content');

    title.addEventListener('click', () => {
       // Close all other accordions in this container
       accordions.forEach(a => {
        if (a !== accordion) a.classList.remove('active');
      });
       // Toggle this accordion
      accordion.classList.toggle('active');
    });
  });
}

function closeAllSectionsExcept(exceptId) {
  const sections = document.querySelectorAll('section'); // assuming each section has <section id="...">
  sections.forEach(s => {
    if (s.id !== exceptId && s.id !== 'header') {
      s.querySelectorAll('.accordion').forEach(a => a.classList.remove('active'));
    }
  });
}

function scrollToSectionUnderHeader(section) {
  const header = document.getElementById('header');
  const headerHeight = header.offsetHeight;
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: sectionTop - headerHeight, // scroll just below header
    behavior: 'smooth'
  });
}

async function initPortfolio() {
  // Load header
  await loadHTML('header', 'sections/header.html');

  const sections = [
    { id: 'about', file: 'sections/about.html' },
    { id: 'work', file: 'sections/work.html' },
    { id: 'skills', file: 'sections/skills.html' },
    { id: 'contacts', file: 'sections/contacts.html' },
    { id: 'personal', file: 'sections/personal.html' },
    { id: 'blog', file: 'sections/blog.html' }
  ];

  for (const s of sections) {
    const container = await loadHTML(s.id, s.file);
    if (!container) continue;

    initAccordions(container);

    // Check if this section is the hash target
    if (window.location.hash === `#${s.id}`) {
      // Close all other sections
      closeAllSectionsExcept(s.id);

      // Open all accordions in this section
      container.querySelectorAll('.accordion').forEach(a => a.classList.add('active'));

      // Scroll under header
      scrollToSectionUnderHeader(container);
    }

    // Special case for blog to load posts
    if (s.id === 'blog') {
      await loadBlogPosts();
    }
  }
  
  console.log("Portfolio loaded");
}

initPortfolio();
