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
    <div className="flex flex-col items-center justify-center">
      <p>Hello, {session?.user.name}</p>
      <button
        className="font-semibold bg-padeepBlue text-white px-4 py-2 rounded-md"
        onClick={() => router.push(`/writer/${session?.id}/create`)}
      >
        Create Article
      </button>
      <button
        onClick={async () => {
          const result = await signOut({ redirect: false, callbackUrl: "/" });

          router.push(result.url);
        }}
      >
        Logout
      </button>
    </div>
  );
}
