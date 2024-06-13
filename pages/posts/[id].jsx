import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps(context) {
  const { id } = context.params;

  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );

  return {
    props: {
      initialPosts: data,
    },
  };
}

export default function PostsById({ initialPosts }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState(initialPosts);

  const fetchPosts = async (userId) => {
    setLoading(true);
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    setPosts(data);
    setLoading(false);
  };

  const onSearch = () => {
    fetchPosts(searchInput);
  };

  return (
    <>
      <div>
        <div className="post__search">
          <Link href="/">
            <button>← Back</button>
          </Link>
          <div className="post__search--container">
            <label className="post__search--label">Search by Id</label>
            <input
              type="number"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSearch()}
            />
            <button onClick={onSearch}>Enter</button>
          </div>
        </div>
        {loading
          ? new Array(10).fill(0).map((_, index) => (
              <div className="post" key={index}>
                <div className="post__title">
                  <div className="post__title--skeleton"></div>
                </div>
                <div className="post__body">
                  <p className="post__body--skeleton"></p>
                </div>
              </div>
            ))
          : posts?.map((post) => (
              <div className="post" key={post.id}>
                <div className="post__title">{post.title}</div>
                <p className="post__body">{post.body}</p>
              </div>
            ))}
      </div>
    </>
  );
}
