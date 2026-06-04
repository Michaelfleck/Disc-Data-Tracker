import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CsvUploader from "@/components/upload/CsvUploader";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">
        Welcome, {session?.user?.name?.split(" ")[0]}
      </h1>
      <p className="mb-8 text-gray-400">
        Upload a UDisc export CSV to get started.
      </p>
      <CsvUploader />
    </div>
  );
}
