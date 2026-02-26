import { BASE_PATH } from './utils.js';
export async function loadBlogPosts() {

  const blogPosts = [
    { title: "My First Post", file: "blog/post1.md", date: "2026-02-13", tags: ["webdev", "personal"] },
    { title: "Nice day", file: "blog/post2.md", date: "2026-02-18", tags: ["day off", "personal"] },
    { title: "Consern wit desigh", file: "blog/post3.md", date: "2026-02-25", tags: ["webdev", "design"] },
    { title: "Responsive design", file: "blog/post4.md", date: "2026-02-26", tags: ["webdev", "design"] },
    
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
  let html = marked.parse(content);

  // Fix image paths for GitHub Pages
  html = html.replaceAll('src="/', `src="${BASE_PATH}`);

  // Create title and body containers
  const titleDiv = document.createElement('div');
  titleDiv.className = "post-title";

  const bodyDiv = document.createElement('div');
  bodyDiv.className = "post-body";
  bodyDiv.innerHTML = html;

  // Extract first heading as title
  const firstHeading = bodyDiv.querySelector('h1, h2, h3');
  if (firstHeading) {
    titleDiv.innerHTML = firstHeading.outerHTML;
    firstHeading.remove(); // remove from body to avoid duplication
  }

  // Append children to post
  postDiv.appendChild(titleDiv);
  postDiv.appendChild(bodyDiv);

  // Append post to blog container
  blogContainer.appendChild(postDiv);
});

// Add ONE click listener for the whole container
blogContainer.addEventListener('click', (event) => {
  // Find the clicked post
  const blogPost = event.target.closest('.blog-post');
  const parent = blogPost.closest('.blog');
  if (!blogPost) return;

  const postBody = blogPost.querySelector('.post-body');
  if (!postBody) return;

  // Toggle the 'open' class
  parent.classList.toggle('open');
  blogPost.classList.toggle('open');
  postBody.classList.toggle('open');
});
  
  } catch (err) {
    console.error('Failed loading blog posts:', err);
  }
}

// Only call this when the DOM is ready
document.addEventListener('DOMContentLoaded', loadBlogPosts);
