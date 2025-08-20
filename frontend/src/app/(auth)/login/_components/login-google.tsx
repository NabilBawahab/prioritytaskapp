import Link from "next/link";

export function GoogleLogin() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  return <Link href={`${API_URL}/continuegoogle`}>Continue with google</Link>;
}
