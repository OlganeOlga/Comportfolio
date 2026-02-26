import { loadBlogPosts } from './blog.js';
import { sendEmail } from './email.js';
import { openEmaiForm } from './contacts.js';

function returnHome() {
  document.querySelectorAll('.accordion').forEach(a => {
      a.classList.remove('active');
      a.classList.remove('inactive');
    });
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

function changeState(accordion, container) {
  let isActive;
  // Close all other accordions
  document.querySelectorAll('.accordion').forEach(a => {
    if (a !== accordion) {
      a.classList.remove('active');
      a.classList.add('inactive');
    }
  // Toggle this accordion
  accordion.classList.add('active');
  
  isActive = accordion.classList.contains('active'); // update after toggle
  });

  if (isActive) {
    // Section is now open → set hash
    history.replaceState(null, '', `#${container.id}`);
  } else {
    // Section is now closed → remove hash
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}

function initAccordions(container) {
  const accordions = container.querySelectorAll('.accordion');

  accordions.forEach(accordion => {
    accordion.addEventListener('click', () => changeState(accordion, container));
  });

  // Click on external references
  document.querySelectorAll('.ref').forEach(ref => {
    ref.addEventListener('click', (e) => {
      e.preventDefault(); // prevent default jump to hash

      // get target id from href
      const targetId = ref.getAttribute('href').replace('#', '');
      const targetAccordion = container.querySelector(`#${targetId}`);

      if (targetAccordion) {
        changeState(targetAccordion, container); // open/toggle the accordion
      }
    });
  });
}

async function loadHeader() {
  const headerContainer = await loadHTML('header', 'sections/header.html');

  // NOW it exists
  const homeBtn = headerContainer.querySelector('.home');

  if (homeBtn) {
    homeBtn.addEventListener('click', returnHome);
  }
}

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
    if (s.id === 'contacts') {
      openEmaiForm();
      sendEmail(); // <-- initialize email form here
    }
    loadedContainers[s.id] = container;
  }

  return loadedContainers;
}


async function initPortfolio() {
  // Remove hash without reloading the page
  history.replaceState(null, '', '#home');
  // Load header
  const header = await loadHeader();

  // Load all sections
  const sections = await loadAllSections();

  console.log("Portfolio loaded");
}

await initPortfolio();
