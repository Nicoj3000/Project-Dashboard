"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { CompaniesChartProps } from "./CompaniesChart.types";

// Componente de Tooltip personalizado
const CustomTooltip = ({
  active,
  payload,
}: {
  active: boolean;
  payload: any[];
}) => {
  if (active && payload && payload.length) {
    const events = payload[0].payload.events;
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#f9f9f9",
          border: `1px solid #8884d8`,
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <p
          className="label"
          style={{ color: "#8884d8", fontWeight: "bold" }}
        >{`Eventos de ${payload[0].payload.name}`}</p>
        <ul
          className="list-disc list-inside"
          style={{ margin: "0", padding: "0", listStyleType: "none" }}
        >
          {events.map((event: any) => (
            <li key={event.id} style={{ color: "#333", fontWeight: "450" }}>
              - {" "} {event.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export function CompaniesChart(props: CompaniesChartProps) {
  const { companies, events } = props;

  const dataChart = companies.map((company) => ({
    name:
      company.name.length > 10
        ? company.name.slice(0, 10) + "..."
        : company.name,
    eventsByCompany: events.filter((event) => event.companyId === company.id)
      .length,
    events: events.filter((event) => event.companyId === company.id),
  }));

  return (
    <div className="h-[550px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={dataChart}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip active={true} payload={[]} />} />
          <Legend />
          <Bar dataKey="eventsByCompany" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}