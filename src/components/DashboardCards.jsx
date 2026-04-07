import {
  ComputerIcon,
  FileText,
  ListOrdered,
  TriangleAlert,
} from "lucide-react";
import styles from "../styles/components/DashboardCards.module.css";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/api/workorders";

const DashboardCards = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
  });

  const cards = [
    {
      title: "Active Orders",
      value: data?.activeOrders ?? 0,
      sub: "Open work orders currently being tracked.",
      icon: <ListOrdered size={20} />,
      tone: "blue",
    },
    {
      title: "Past Due",
      value: data?.pastDue ?? 0,
      sub: "Orders that have passed their expected date.",
      icon: <TriangleAlert size={20} />,
      tone: "red",
    },
    {
      title: "New This Week",
      value: data?.newThisWeek ?? 0,
      sub: "Recently created work orders from this week.",
      icon: <FileText size={20} />,
      tone: "amber",
    },
    {
      title: "Active PMs",
      value: data?.activePms ?? 0,
      sub: "Open PM orders.",
      icon: <ComputerIcon size={20} />,
      tone: "purple",
    },
  ];

  if (isLoading) {
    return <div>Loading dashboard stats...</div>;
  }

  if (isError) {
    return <div>Failed to load dashboard stats.</div>;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.heading}>Overview</h2>
          <p className={styles.description}>
            Quick visibility into your current maintenance workload.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {cards.map((card) => (
          <article
            key={card.title}
            className={`${styles.card} ${styles[card.tone]}`}
          >
            <div className={styles.topRow}>
              <div>
                <p className={styles.label}>{card.title}</p>
                <h3 className={styles.value}>{card.value}</h3>
              </div>

              <div className={styles.iconWrap}>{card.icon}</div>
            </div>

            <p className={styles.sub}>{card.sub}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DashboardCards;