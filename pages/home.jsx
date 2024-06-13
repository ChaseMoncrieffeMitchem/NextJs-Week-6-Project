import axios from "axios";
import { useState } from "react";

export async function getServerSideProps(context) {

    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users")

    return {
        props: {
            initialUsers: data,
        }
    }
}



export default function Home({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers)

  console.log(users)
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="user-list">
            <div className="user">
              <div className="user-card">
                <div className="user-card__container">
                  <h3>user.name</h3>
                  <p>
                    <b>Email:</b> user.email
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
    </>
  );
}
