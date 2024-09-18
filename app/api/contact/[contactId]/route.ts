import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { contactId: string } }) {
  try {
    const { userId } = auth();
    const { contactId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const contact = await db.contact.update({
      where: {
        id: contactId,
        
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.log("[CONTACT ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { contactId: string } }) {
  try {
    const { userId } = auth();
    const { contactId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deleteContact = await db.contact.delete({
      where: {
        id: contactId,
      },
    });

    return NextResponse.json(deleteContact);
  } catch (error) {
    console.log("[CONTACT ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}