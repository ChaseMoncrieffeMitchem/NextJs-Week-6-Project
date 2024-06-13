import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostsById() {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();
  const [search, setSearch] = useState(params?.id)

  async function getPostsById() {
    setLoading(true);
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${params.id || search}`
    );
    setPosts(data);
    setLoading(false);
    setSearch(params.id)
    console.log(data);
  }

  useEffect(() => {
    if (params !== null) {
      getPostsById();
    }
  }, [params?.id]);

  return (
    <>
      <div>
        <div className="post__search">
          <button>← Back</button>
          <div className="post__search--container">
            <label className="post__search--label">Search by Id</label>
            <input type="number" value={search} onChange={(event) => setSearch(event.target.value)}/>
            <button onClick={() => setSearch(params?.id)}>Enter</button>
          </div>
        </div>
        {loading ? (
          <div className="post">
            <div className="post__title">
              <div className="post__title--skeleton"></div>
            </div>
            <div className="post__body">
              <p className="post__body--skeleton"></p>
            </div>
          </div>
        ) : (
          posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post__title">{post.title}</div>
              <p className="post__body">{post.body}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
