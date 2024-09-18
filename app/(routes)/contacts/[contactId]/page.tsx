import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ContactForm } from "@/app/(routes)/contacts/[contactId]/components/contactForm";

export default async function ContactIdPage({ params }: { params: { contactId: string } }) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const contact = await db.contact.findUnique({
    where: {
      id: params.contactId
    },
  });

  if (!contact) {
    return redirect("/");
  }

  return (
    <div>
      <ContactForm contact={contact} />
    </div>
  );
}