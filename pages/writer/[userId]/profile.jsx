import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const getUser = async (id) => {
  const res = await axios
    .get(`http://localhost:3000/api/user/${id}`)
    .then((res) => res.data);

  return res;
};

export default function UserProfile() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div>
      <p>Hello, {session?.user.name}</p>
      <button onClick={() => router.push(`/writer/${session?.id}/create`)}>
        Create Article
      </button>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
