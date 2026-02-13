const blogPosts = [
    { title: "My First Post", file: "blog/post1.html" },
    { title: "Learning Web Development", file: "blog/post2.html" },
    { title: "My Projects Journey", file: "blog/post3.html" }
  ];
  
  const personalSection = document.getElementById('personal').querySelector('.accordion-content');
  
  blogPosts.forEach(post => {
    fetch(post.file)
      .then(res => res.text())
      .then(content => {
        const postDiv = document.createElement('div');
        postDiv.className = 'blog-post';
        postDiv.innerHTML = `<h3>${post.title}</h3>${content}`;
        personalSection.appendChild(postDiv);
      })
      .catch(err => console.error(`Failed to load ${post.title}:`, err));
  });
  