export async function loadBlogPosts() {
  const blogPosts = [
    { title: "My First Post", file: "blog/post1.md", date: "2026-02-13", tags: ["webdev", "personal"] },
    { title: "Learning Web Development", file: "blog/post2.md" },
    { title: "My Projects Journey", file: "blog/post3.md" }
  ];

  const personal = document.getElementById('personal');
  if (!personal) return;

  const personalSection = personal.querySelector('.accordion-content');
  if (!personalSection) return;

  try {
    const posts = await Promise.all(
      blogPosts.map(post => fetch(post.file).then(res => res.text()))
    );

    posts.forEach((content, index) => {
      const postDiv = document.createElement('div');
      postDiv.className = 'blog-post';
      postDiv.innerHTML = `
        <h3>${blogPosts[index].title}</h3>
        ${content}
      `;
      personalSection.appendChild(postDiv);
    });

  } catch (err) {
    console.error('Failed loading blog posts:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadBlogPosts);

  