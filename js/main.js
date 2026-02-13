// Load header
fetch('sections/header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  })
  .catch(err => console.error('Header load failed:', err));

// Load main HTML sections dynamically
const sections = [
  { id: 'about', file: 'sections/about.html' },
  { id: 'work', file: 'sections/work.html' },
  { id: 'skills', file: 'sections/skills.html' },
  { id: 'contacts', file: 'sections/contacts.html' },
  { id: 'personal', file: 'sections/personal.html' }
];

sections.forEach(s => {
  fetch(s.file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(s.id).innerHTML = data;

      // Initialize accordion for this section
      const accordions = document.getElementById(s.id).querySelectorAll('.accordion');
      accordions.forEach(accordion => {
        const title = accordion.querySelector('.accordion-title');
        const content = accordion.querySelector('.accordion-content');
        content.style.display = 'none'; // hide by default
        title.addEventListener('click', () => {
          const isOpen = content.style.display === 'block';
          content.style.display = isOpen ? 'none' : 'block';
          accordion.classList.toggle('active', !isOpen);
        });
      });

      // If page opened with hash to this section, open it
      const hash = window.location.hash;
      if (hash === `#${s.id}`) {
        accordions.forEach(accordion => {
          const content = accordion.querySelector('.accordion-content');
          content.style.display = 'block';
          accordion.classList.add('active');
        });
        document.querySelector(hash).scrollIntoView({ behavior: 'smooth' });
      }
    })
    .catch(err => console.error(`Failed to load section ${s.id}:`, err));
});

// Optional: log when portfolio fully loaded
console.log("Portfolio loaded");
