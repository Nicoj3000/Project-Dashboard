import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { CompaniesChart } from "./components/CompaniesChart";

export default async function pageAnautics() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const companies = await db.company.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const events = await db.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="rounded-lg bg-background shdow-md">
      <h2 className="mb-4 text-2xl">Analytics page</h2>
      <div>
        <CompaniesChart companies={companies} events={events} />
      </div>
    </div>
  );
}