import Orders from './orders';
import productCatalog from './product_catalog.json'; 
import salesTransactions from './sales_transactions.json'; 
import type { DashboardOrder } from './orders';

export interface Product {
    id: string;
    name: string;
    price: number;
}

export interface AnalyticsResult {
    salesThisWeek: number;
    salesLastWeek: number;
    salesThisMonth: number;
    salesLastMonth: number;
    ordersThisWeek: number;
    ordersThisMonth: number;
    topProductsThisMonth: { name: string; revenue: number; }[];
}


function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addDays(d: Date, days: number) {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function isBetween(dateStr: string, start: Date, end: Date) {
  const d = new Date(dateStr);
  return d >= start && d <= end;
}

function isSameMonth(dateStr: string, ref: Date) {
  const d = new Date(dateStr);
  return d.getMonth() === ref.getMonth() && d.getFullYear() === ref.getFullYear();
}

function isLastMonth(dateStr: string, ref: Date) {
  const d = new Date(dateStr);
  const lastMonth = new Date(ref.getFullYear(), ref.getMonth() - 1, 1);
  return d.getMonth() === lastMonth.getMonth() && d.getFullYear() === lastMonth.getFullYear();
}

export function getAnalytics(rawOrders: DashboardOrder[]): AnalyticsResult {
  const now = new Date();
  const today = startOfDay(now);

  // Define week windows as rolling 7-day windows:
  const startThisWeek = addDays(today, -6);       // last 7 days incl. today
  const endThisWeek = today;
  const startLastWeek = addDays(startThisWeek, -7);
  const endLastWeek = addDays(startThisWeek, -1);

  let salesThisWeek = 0;
  let salesLastWeek = 0;
  let ordersThisWeek = 0;

  let salesThisMonth = 0;
  let salesLastMonth = 0;
  let ordersThisMonth = 0;

  // Revenue aggregation by product for "this month"
  const revenueByProductId = new Map<string, number>();

  for (const order of rawOrders) {
    const { date, totalPaid, productId } = order;

    // Weeks
    if (isBetween(date, startThisWeek, endThisWeek)) {
      salesThisWeek += totalPaid;
      ordersThisWeek += 1;
    } else if (isBetween(date, startLastWeek, endLastWeek)) {
      salesLastWeek += totalPaid;
    }

    // Months
    if (isSameMonth(date, now)) {
      salesThisMonth += totalPaid;
      ordersThisMonth += 1;

      const current = revenueByProductId.get(productId) ?? 0;
      revenueByProductId.set(productId, current + totalPaid);
    } else if (isLastMonth(date, now)) {
      salesLastMonth += totalPaid;
    }
  }

  // Build top products this month
  const topProductsThisMonth = Array.from(revenueByProductId.entries())
    .map(([productId, revenue]) => {
      const catalog = productCatalog as Product[];
      const product = catalog.find((p) => p.id === productId);
      return {
        name: product?.name ?? productId,
        revenue,
      };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);

  return {
    salesThisWeek,
    salesLastWeek,
    salesThisMonth,
    salesLastMonth,
    ordersThisWeek,
    ordersThisMonth,
    topProductsThisMonth,
  };
}


// Export a ready-made analytics object for the dashboard
export const analytics = getAnalytics(Orders as DashboardOrder[]);
