import { cookies } from "next/headers";
import prisma from "./utils/prisma.mjs";

export default async function Home() {
  const token = cookies().get('token');
  const response = await fetch(`${process.env.BASE_URL}/api/auth`, {
    method: 'GET',
    headers: {
        'Token': `${token.value}`, // Assuming you want to use the token here
    },
  })
  const data = await response.json();
  const userId = data.session.userId
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