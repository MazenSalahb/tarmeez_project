axios.get("https://tarmeezacademy.com/api/v1/posts?limit=5").then((res) => {
  const posts = res.data.data;

  document.getElementById("posts").innerHTML = "";
  posts.map((post) => {
    let content = `
            <div class="card shadow mb-3">
          <div class="card-header">
            ${
              typeof post.author.profile_image === "string" ?
              `<img
              src="${post.author.profile_image}"
              alt="Profile picture"
              width="40"
              height ="40"
              class="rounded-circle border border-3"
            />` : ''
            }
            <b>@${post.author.username}</b>
          </div>
          <div class="card-body">
            ${
              typeof post.image === "string" ?
              `<img
              src="${post.image}"
              alt="clinic"
              width="100%"
            />` : ''
            }
            <h6 class="text-secondary mt-1">${post.created_at}</h6>
            <h5>${post.title || ""}</h5>

            <p>
              ${post.body}
            </p>

            <hr />
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pen"
                viewBox="0 0 16 16"
              >
                <path
                  d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                />
              </svg>
              <span> (${post.comments_count}) Comments </span>
            </div>
          </div>
        </div>
        `;
    document.getElementById("posts").innerHTML += content;
  });
});
