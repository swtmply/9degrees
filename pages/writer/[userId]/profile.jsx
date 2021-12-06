import axios from "axios";
import React from "react";

export default function UserProfile({ user }) {
  return <div>{JSON.stringify(user, null, 2)}</div>;
}

export async function getServerSideProps(context) {
  const res = await axios
    .get(`http://localhost:3000/api/user/${context.query.userId}`)
    .then((res) => res.data);

  return {
    props: { user: res.user },
  };
}
