import axios from "axios";
import { signOut, useSession } from "next-auth/react";

export const getUser = async (id) => {
  const res = await axios
    .get(`http://localhost:3000/api/user/${id}`)
    .then((res) => res.data);

  return res;
};

export default function UserProfile() {
  const { data: session } = useSession();

  return (
    <div>
      <p>Hello, {session?.user.name}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
