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
      accordion.classList.toggle('active');
    });
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

    if (s.id === 'blog') {
      await loadBlogPosts();
    
      if (window.location.hash === `#personal`) {
        container.scrollIntoView({ behavior: 'smooth' });
        container.querySelectorAll('.accordion').forEach(a => a.classList.add('active'));
      }
    } else if (window.location.hash === `#${s.id}`) {
      container.scrollIntoView({ behavior: 'smooth' });
      container.querySelectorAll('.accordion').forEach(a => a.classList.add('active'));
    }
  }
  
  console.log("Portfolio loaded");
}

initPortfolio();
