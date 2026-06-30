import { loadBlogPosts } from './blog.js';
import { sendEmail } from './email.js';
import { openEmaiForm } from './contacts.js';

function returnHome() {
  document.querySelectorAll('.accordion').forEach(a => {
    a.classList.remove('active');
    a.classList.remove('inactive');
  });

  history.replaceState(null, '', '#home');
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

  // Close all accordions
  document.querySelectorAll('.accordion').forEach(a => {
    if (a !== accordion) {
      a.classList.remove('active');
      a.classList.add('inactive');
    }
  });

  // Open selected accordion
  accordion.classList.remove('inactive');
  accordion.classList.add('active');

  history.replaceState(null, '', `#${container.id}`);
}

function initAccordions(container) {

  container.querySelectorAll('.accordion').forEach(accordion => {

    accordion.addEventListener('click', () => {
      changeState(accordion, container);
    });

  });

}

function initHeaderNavigation() {

  document.querySelectorAll('.header-menu .ref').forEach(link => {

    link.addEventListener('click', e => {

      e.preventDefault();

      const targetId = link.getAttribute('href').substring(1);

      const container = document.getElementById(targetId);

      if (!container) return;

      const accordion = container.querySelector('.accordion');

      if (!accordion) return;

      changeState(accordion, container);

    });

  });

}

async function loadHeader() {

  const headerContainer = await loadHTML('header', 'sections/header.html');

  const homeBtn = headerContainer.querySelector('.home');

  if (homeBtn) {

    homeBtn.addEventListener('click', e => {

      e.preventDefault();

      returnHome();

    });

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

  for (const s of sectionList) {

    const container = await loadHTML(s.id, s.file);

    if (!container) continue;

    initAccordions(container);

    if (s.id === 'blog') {
      await loadBlogPosts();
    }

    if (s.id === 'contacts') {
      openEmaiForm();
      sendEmail();
    }

  }

}

async function initPortfolio() {

  history.replaceState(null, '', '#home');

  await loadHeader();

  await loadAllSections();

  initHeaderNavigation();

  console.log('Portfolio loaded');

}

await initPortfolio();