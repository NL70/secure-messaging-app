import { cookies } from "next/headers";
import prisma from "./utils/prisma.mjs";

export default async function Home() {
  const token = cookies().get('token');
  const session = await prisma.sessions.findFirst({
    where: {
        token: token?.value
    }
})
  const userId = session.userId
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  return (
    <>
      <h1>Welcome, {user.username}!</h1>
    </>   
  );
}

// TODO:
// 1. Make /signin and /login redirect to / if logged in
// 2. Implement /signout
// 3. Try to reduce num of database calls :P
// 4. make it such that when you /signin you immediately get authenticated
// 5. Email verification :skull: