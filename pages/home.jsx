import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  async function getPostsById() {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setPosts(data);
    console.log(posts)
  }

  useEffect(() => {
    getPostsById();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <div className="container" key={post.id}>
          <div className="row">
            <div className="user-list">
              <div className="user">
                <div className="user-card">
                  <div className="user-card__container">
                    <h3>{post.name}</h3>
                    <p>
                      <b>Email:</b> {post.email}
                    </p>
                    <p>
                      <b>Phone:</b> user.phone
                    </p>
                    <p>
                      <b>Website:</b>
                      user.website
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
