"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, ClipboardList } from "lucide-react";
import styles from "../styles/components/WorkOrdersChart.module.css";

const chartData = [
  { name: "Jan", workOrders: 18 },
  { name: "Feb", workOrders: 24 },
  { name: "Mar", workOrders: 21 },
  { name: "Apr", workOrders: 29 },
  { name: "May", workOrders: 34 },
  { name: "Jun", workOrders: 27 },
  { name: "Jul", workOrders: 39 },
  { name: "Aug", workOrders: 31 },
  { name: "Sep", workOrders: 36 },
  { name: "Oct", workOrders: 42 },
  { name: "Nov", workOrders: 33 },
  { name: "Dec", workOrders: 38 },
];

const totalWorkOrders = chartData.reduce((sum, item) => sum + item.workOrders, 0);
const latestMonth = chartData[chartData.length - 1]?.workOrders ?? 0;
const previousMonth = chartData[chartData.length - 2]?.workOrders ?? 0;
const change = latestMonth - previousMonth;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      <p className={styles.tooltipValue}>{payload[0].value} work orders</p>
    </div>
  );
};

const WorkOrdersChart = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Analytics</p>
          <h3 className={styles.title}>Work Orders Over Time</h3>
          <p className={styles.subtitle}>
            Monthly trend of work orders created across the year.
          </p>
        </div>

        <div className={styles.headerIcon}>
          <ClipboardList size={18} />
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total This Year</span>
          <strong className={styles.statValue}>{totalWorkOrders}</strong>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Latest Month</span>
          <strong className={styles.statValue}>{latestMonth}</strong>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Month Change</span>
          <strong className={styles.statValue}>
            <span className={styles.changeWrap}>
              <TrendingUp size={14} />
              {change >= 0 ? `+${change}` : change}
            </span>
          </strong>
        </div>
      </div>

      <div className={styles.chartWrap}>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="#eef2f7" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="workOrders"
              stroke="#000000"
              strokeWidth={2.5}
              dot={{ r: 4, strokeWidth: 2, fill: "#ffffff" }}
              activeDot={{ r: 5, strokeWidth: 2, fill: "#000000" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkOrdersChart;