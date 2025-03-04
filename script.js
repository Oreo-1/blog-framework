//  _____          _       
// |  __ \        | |      
// | |__) |__  ___| |_ ___ 
// |  ___/ _ \/ __| __/ __|
// | |  | (_) \__ \ |_\__ \
// |_|   \___/|___/\__|___/
const posts = [
    { title: 'First Post', path: 'posts/01.md' },
    { title: 'Second Post', path: 'posts/02.md' },
    { title: 'Third Post', path: 'posts/03.md' },
    { title: 'Fourth Post', path: 'posts/04.md' },
  ];

  // Function to render post tabs in the sidebar
  function renderPostTabs() {
    const postTabs = document.getElementById('post-tabs');
  
    posts.forEach((post, index) => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#post-${index + 1}`;
      link.textContent = post.title;
      link.addEventListener('click', () => {
        // Remove the 'selected' class from all list items
        document.querySelectorAll('#post-tabs li').forEach(li => {
          li.classList.remove('selected');
        });
        // Add the 'selected' class to the clicked list item
        listItem.classList.add('selected');
        loadPost(post.path);
      });
      listItem.appendChild(link);
      postTabs.appendChild(listItem);
    });
  }
  
  // Function to load and render a Markdown post
  async function loadPost(postPath) {
    const response = await fetch(postPath);
    const markdown = await response.text();
    const html = marked.parse(markdown);
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = html;
  }
  
  // Function to load and render the homepage
  async function loadHomepageFirst() {
    const response = await fetch('homepage.html');
    const html = await response.text();
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = html;
  }

  // go back to home page
  document.getElementById('gotohome').addEventListener('click', loadHomepage);

  
  // Render post tabs and load the homepage by default (first startup)
  loadHomepageFirst();

async function loadPost(postPath) {
  const contentDiv = document.getElementById('content');
  
  // Apply slide-out animation to the current content
  contentDiv.classList.add('slide-out-right');
  
  // Wait for the slide-out animation to complete
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Load the new content
  const response = await fetch(postPath);
  const markdown = await response.text();
  const html = marked.parse(markdown);
  contentDiv.innerHTML = html;
  
  // Apply slide-in animation to the new content
  contentDiv.classList.remove('slide-out-right');
  contentDiv.classList.add('slide-in-up');
  
  // Wait for the slide-in animation to complete
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Remove the slide-in animation class after the animation is done
  contentDiv.classList.remove('slide-in-up');
}

async function loadHomepage() {
  const contentDiv = document.getElementById('content');
  
  // Apply slide-out animation to the current content
  contentDiv.classList.add('slide-out-right');
  
  // Wait for the slide-out animation to complete
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Load the new content
  const response = await fetch('homepage.html');
  const html = await response.text();
  contentDiv.innerHTML = html;
  
  // Apply slide-in animation to the new content
  contentDiv.classList.remove('slide-out-right');
  contentDiv.classList.add('slide-in-right');
  
  // Wait for the slide-in animation to complete
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Remove the slide-in animation class after the animation is done
  contentDiv.classList.remove('slide-in-up','slide-in-right');

  // Remove the 'selected' class from all list items
  document.querySelectorAll('#post-tabs li').forEach(li => {
    li.classList.remove('selected');
  });
  // Add the 'selected' class to the homepage link
  document.getElementById('gotohome').parentElement.classList.add('selected');
}

renderPostTabs();