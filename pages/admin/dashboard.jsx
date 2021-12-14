import React from "react";
import { signOut } from "next-auth/react"

export default function Dashboard() {
  return (
    <>
      <div>Dashboard</div>
      <button onClick={() => signOut()}>Logout</button>
    </>
  )
}

// export async function getServerSideProps(context) {

//   const session = await getSession({ req: context.req })
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth/login',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {}
//   }
// }