import Link from "next/link";

export function SidebarItem({
  icon,
  text,
  href,
  active,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link href={href} className="block">
      <div
        className={`
          flex gap-2 px-2 py-1 rounded-xl ${
            active
              ? "bg-blue-500 text-white transition-colors duration-300"
              : "hover:bg-gray-100 transition-colors duration-300"
          }
        `}
      >
        <span>{icon}</span>
        <span>{text}</span>
      </div>
    </Link>
  );
}
