import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setUsers(data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {users?.map((user) => (
        <Link href={`/posts/${user.id}`} key={user.id}>
          <div className="container" >
            <div className="row">
              <div className="user-list">
                <div className="user">
                  <div className="user-card">
                    <div className="user-card__container">
                      <h3>{user.name}</h3>
                      <p>
                        <b>Email:</b> {user.email}
                      </p>
                      <p>
                        <b>Phone:</b> {user.phone}
                      </p>
                      <p>
                        <b>Website:</b>
                        {user.website}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
