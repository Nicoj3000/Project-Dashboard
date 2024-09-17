import { Company, Event as PrismaEvent } from "@prisma/client";

export type Event = PrismaEvent & {
  company: Company;
};

export type CalendarProps = {
  companies: Company[];
  events: Event[];
};