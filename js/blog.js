export async function loadBlogPosts() {
  const blogPosts = [
    { title: "My First Post", file: "blog/post1.md", date: "2026-02-13", tags: ["webdev", "personal"] },
    // Add more posts here
  ];

  // Select the blog section
  const blogSection = document.getElementById('blog');
  if (!blogSection) return;

  // Select the container inside the accordion content
  const blogContainer = blogSection.querySelector('.accordion-content .blog-posts');
  if (!blogContainer) return;

  try {
    // Fetch all Markdown posts
    const posts = await Promise.all(
      blogPosts.map(post => fetch(post.file).then(res => res.text()))
    );

    // Loop over posts and append
    posts.forEach((content, index) => {
      const postDiv = document.createElement('div');
      postDiv.className = 'blog-post';

      // Convert Markdown to HTML using marked.js
      const html = marked.parse(content);

      postDiv.innerHTML = html;
      blogContainer.appendChild(postDiv);
    });

  } catch (err) {
    console.error('Failed loading blog posts:', err);
  }
}

// Only call this when the DOM is ready
document.addEventListener('DOMContentLoaded', loadBlogPosts);
