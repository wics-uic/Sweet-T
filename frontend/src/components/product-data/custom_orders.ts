export type OrderStatus = "Pending" | "Ready for Pickup" | "Complete";

export interface DashboardOrder {
  id: string;
  name: string;   // customer name
  order: string;  // order description or order number
  date: string;   // order date
  due: string;    // due / pickup date
  status: OrderStatus;
}

const Orders: DashboardOrder[] = [
  {
    id: "ORD-1001",
    name: "Emily Johnson",
    order: "6\" Celebration Cake – Vanilla + Strawberry",
    date: "2025-11-20",
    due: "2025-11-27",
    status: "Pending",
  },
  {
    id: "ORD-1002",
    name: "Michael Chen",
    order: "Dozen Assorted Cupcakes",
    date: "2025-11-19",
    due: "2025-11-26",
    status: "Ready for Pickup",
  },
  {
    id: "ORD-1003",
    name: "Sofia Martinez",
    order: "9\" Chocolate Fudge Birthday Cake",
    date: "2025-11-18",
    due: "2025-11-25",
    status: "Pending",
  },
  {
    id: "ORD-1004",
    name: "David Lee",
    order: "Half Sheet Cake – Funfetti",
    date: "2025-11-15",
    due: "2025-11-22",
    status: "Complete",
  },
  {
    id: "ORD-1005",
    name: "Ava Thompson",
    order: "Gluten-Free Cupcake Box (12)",
    date: "2025-11-16",
    due: "2025-11-23",
    status: "Ready for Pickup",
  },
  {
    id: "ORD-1006",
    name: "Noah Williams",
    order: "6\" Red Velvet Cake",
    date: "2025-11-21",
    due: "2025-11-28",
    status: "Pending",
  },
  {
    id: "ORD-1007",
    name: "Olivia Brown",
    order: "Cookie Platter – 3 Dozen",
    date: "2025-11-14",
    due: "2025-11-21",
    status: "Complete",
  },
  {
    id: "ORD-1008",
    name: "Liam Davis",
    order: "Custom Cake – Soccer Theme",
    date: "2025-11-17",
    due: "2025-11-24",
    status: "Pending",
  },
];

export default Orders;
