// Load header
fetch('sections/header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  })
  .catch(err => console.error('Header load failed:', err));

// Load main-HTML sections dynamically
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
  
        // After loading, add accordion functionality
        const accordions = document.getElementById(s.id).querySelectorAll('.accordion');
        accordions.forEach(accordion => {
          const title = accordion.querySelector('.accordion-title');
          title.addEventListener('click', () => {
            accordion.classList.toggle('active');
          });
        });
      });
  });
  //show result on console
  console.log("Portfolio loaded");