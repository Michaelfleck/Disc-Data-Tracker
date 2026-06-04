import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-white">
      <h1 className="text-4xl font-bold mb-4">Disc Data Tracker</h1>
      <p className="text-gray-400 mb-8">
        Upload your UDisc export and explore your stats.
      </p>
      <Link
        href="/login"
        className="rounded-lg bg-green-600 px-6 py-3 font-semibold hover:bg-green-500 transition-colors"
      >
        Sign in with Google
      </Link>
    </main>
  );
}
