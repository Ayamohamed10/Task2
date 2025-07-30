document.addEventListener("DOMContentLoaded", function () {
  // ----------- HOME PAGE FUNCTIONALITY -----------
  const blogContainer = document.getElementById("blogPostsContainer");
  const noPostsMessage = document.querySelector(".no-posts-message");
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  if (blogContainer && noPostsMessage) {
    if (blogs.length > 0) {
      noPostsMessage.style.display = "none";
    }

    blogs.forEach((blog) => {
      const blogCard = document.createElement("div");
      blogCard.className = "blog-post-card";

      const postHeader = document.createElement("div");
      postHeader.className = "post-header";

      const title = document.createElement("h3");
      title.textContent = blog.title;

      const meta = document.createElement("p");
      meta.className = "post-meta";
      meta.innerHTML = `By: ${blog.author}`;

      postHeader.appendChild(title);
      postHeader.appendChild(meta);

      const image = document.createElement("img");
      image.src = blog.imageData || "https://via.placeholder.com/600x300.png?text=No+Image+Available";
      image.alt = "Blog Post Image";
      image.className = "post-image";

      const postContent = document.createElement("div");
      postContent.className = "post-content";

      const content = document.createElement("p");
      content.textContent = blog.content;
      postContent.appendChild(content);

      const postActions = document.createElement("div");
      postActions.className = "post-actions";

      const commentIcon = document.createElement("div");
      commentIcon.className = "icon-text";
      commentIcon.innerHTML = `<i class="fas fa-comment"></i> ${blog.comments || 0}`;

      const likeIcon = document.createElement("div");
      likeIcon.className = "icon-text";
      likeIcon.innerHTML = `<i class="fas fa-heart"></i> ${blog.likes || 0}`;

      postActions.appendChild(commentIcon);
      postActions.appendChild(likeIcon);

      const commentSection = document.createElement("div");
      commentSection.className = "comment-section";

      const commentInputWrapper = document.createElement("div");
      commentInputWrapper.className = "comment-input-wrapper";

      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Write a comment...";

      const sendBtn = document.createElement("button");
      sendBtn.className = "send-comment-btn";
      sendBtn.textContent = ">";

      commentInputWrapper.appendChild(input);
      commentInputWrapper.appendChild(sendBtn);
      commentSection.appendChild(commentInputWrapper);

      blogCard.appendChild(postHeader);
      blogCard.appendChild(image);
      blogCard.appendChild(postContent);
      blogCard.appendChild(postActions);
      blogCard.appendChild(commentSection);

      blogContainer.appendChild(blogCard);
    });
  }

  // ----------- ASK PAGE FUNCTIONALITY -----------
  const questionForm = document.getElementById("questionForm");

  if (questionForm) {
    questionForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const question = questionForm.elements["question"].value;
      const description = questionForm.elements["description"].value;
      const fileInput = questionForm.elements["fileInput"];

      if (fileInput.files && fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const newBlog = {
            title: question,
            content: description,
            author: "Anonymous",
            imageData: e.target.result,
          };

          const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
          existingBlogs.push(newBlog);
          localStorage.setItem("blogs", JSON.stringify(existingBlogs));
          window.location.href = "home.html";
        };
        reader.readAsDataURL(fileInput.files[0]);
      } else {
        const newBlog = {
          title: question,
          content: description,
          author: "Anonymous",
          imageData: "",
        };

        const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
        existingBlogs.push(newBlog);
        localStorage.setItem("blogs", JSON.stringify(existingBlogs));
        window.location.href = "home.html";
      }
    });

    const cancelBtn = questionForm.querySelector(".cancel-btn");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", function () {
        questionForm.reset();
      });
    }
  }
});
