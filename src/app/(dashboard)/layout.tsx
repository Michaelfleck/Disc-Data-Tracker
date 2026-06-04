import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 bg-gray-900 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="text-lg font-bold text-green-400">
            Disc Data Tracker
          </span>
          <div className="flex items-center gap-6 text-sm text-gray-300">
            <a href="/dashboard" className="hover:text-white">
              Dashboard
            </a>
            <a href="/rounds" className="hover:text-white">
              Rounds
            </a>
            <a href="/stats" className="hover:text-white">
              Stats
            </a>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
