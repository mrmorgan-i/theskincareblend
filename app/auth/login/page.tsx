
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";

export default async function Login() {
  const session = await auth();

  if (session) redirect('/'); // Redirect logged-in users to the homepage
  if (!session) return <LoginForm />;
}