"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AlertTriangle, Activity } from "lucide-react";
import styles from "../styles/components/DashboardChartsRow.module.css";

const priorityData = [
  { name: "Low", value: 14 },
  { name: "Medium", value: 28 },
  { name: "High", value: 19 },
  { name: "Urgent", value: 11 },
];

const statusData = [
  { name: "Open", value: 24 },
  { name: "In Progress", value: 18 },
  { name: "Completed", value: 36 },
  { name: "On Hold", value: 6 },
];

const PIE_COLORS = ["#0f172a", "#475569", "#94a3b8", "#e2e8f0"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label || payload[0].name}</p>
      <p className={styles.tooltipValue}>{payload[0].value} work orders</p>
    </div>
  );
};

const DashboardChartsRow = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Analytics</p>
            <h3 className={styles.title}>Work Orders by Priority</h3>
            <p className={styles.subtitle}>
              Current distribution of work orders based on urgency.
            </p>
          </div>

          <div className={styles.headerIcon}>
            <AlertTriangle size={18} />
          </div>
        </div>

        <div className={styles.chartWrap}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={priorityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              <Bar
                dataKey="value"
                fill="#000000"
                radius={[8, 8, 0, 0]}
                barSize={42}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Analytics</p>
            <h3 className={styles.title}>Work Orders by Status</h3>
            <p className={styles.subtitle}>
              Snapshot of the current work order pipeline.
            </p>
          </div>

          <div className={styles.headerIcon}>
            <Activity size={18} />
          </div>
        </div>

        <div className={styles.pieSection}>
          <div className={styles.pieWrap}>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={92}
                  paddingAngle={3}
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.legend}>
            {statusData.map((item, index) => (
              <div key={item.name} className={styles.legendItem}>
                <div
                  className={styles.legendDot}
                  style={{ backgroundColor: PIE_COLORS[index] }}
                />
                <div className={styles.legendText}>
                  <span className={styles.legendLabel}>{item.name}</span>
                  <span className={styles.legendValue}>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardChartsRow;