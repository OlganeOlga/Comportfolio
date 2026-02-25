import { loadBlogPosts } from './blog.js';
const BASE_PATH = window.location.hostname.includes('github.io')
  ? '/Comportfolio/'   // your repo name here
  : '/';
let lastScrollPosition = 0;

function clearHashOnReload() {
  if (window.location.hash) {
    // Remove hash without reloading the page
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}

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

    title.addEventListener('click', () => {
      // Toggle this accordion
      accordion.classList.toggle('active');
      const isActive = accordion.classList.contains('active');

      // Close all other active accordions
      document.querySelectorAll('.accordion').forEach(a => {
        if (a !== accordion) a.classList.remove('active');
      });

      if (window.location.hash === `#${container.id}`) {
        // Hash is already set → remove it
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } else {
        // Hash not set → set it
        history.replaceState(null, '', `#${container.id}`);
        //scrolle under fixed header
        scrollToSectionUnderHeader(container)
      }
        
      if (isActive) {
        // Section was open → now closing
        // Remove hash
        history.replaceState(null, '', window.location.pathname + window.location.search);
    
        // Scroll back to previous position
        window.scrollTo({ top: lastScrollPosition, behavior: 'smooth' });
      } else {
        // Currently closed → now opening
        //
        // Section was closed → now opening
        // Save current scroll position
        lastScrollPosition = window.scroll;
    
        // Add hash
        history.replaceState(null, '', `#${container.id}`);
    
        // Scroll under fixed header
        scrollToSectionUnderHeader(container);
      }
     
    });
  });
}

function closeAllSectionsExcept(exceptId = 0) {
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

// ← This was missing! Adds it back:
async function loadAllSections() {
  const sectionList = [
    { id: 'about', file: 'sections/about.html' },
    { id: 'work', file: 'sections/work.html' },
    { id: 'skills', file: 'sections/skills.html' },
    { id: 'contacts', file: 'sections/contacts.html' },
    { id: 'personal', file: 'sections/personal.html' },
    { id: 'blog', file: 'sections/blog.html' }
  ];

  const loadedContainers = {};

  for (const s of sectionList) {
    const container = await loadHTML(s.id, s.file);
    if (!container) continue;

    initAccordions(container);

    if (s.id === 'blog') await loadBlogPosts();

    loadedContainers[s.id] = container;
  }

  return loadedContainers;
}

function activateSection(container) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
  // closeAllSectionsExcept(container.id);
  closeAllSectionsExcept();
  //container.querySelectorAll('.accordion').forEach(a => a.classList.remove('active'));
  scrollToSectionUnderHeader(container);
}

async function initPortfolio() {
  clearHashOnReload()
  // Load header
  await loadHTML('header', 'sections/header.html');

  // Load all sections
  const sections = await loadAllSections();

  // Activate section on page load if hash exists
  if (window.location.hash) {
    const targetId = window.location.hash.replace('#', '');
    if (sections[targetId]) activateSection(sections[targetId]);
  }

  // Listen for menu clicks / hash changes
  window.addEventListener('hashchange', () => {
    const targetId = window.location.hash.replace('#', '');
    if (sections[targetId]) activateSection(sections[targetId]);
  });

  console.log("Portfolio loaded");
}

await initPortfolio();
