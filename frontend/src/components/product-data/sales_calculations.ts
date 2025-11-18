import productCatalog from '../../data/product_catalog.json'; 
import salesTransactions from '../../data/sales_transactions.json'; 

export interface Product {
    id: string;
    name: string;
    price: number;
}

export interface Order {
    id: string;
    productId: string;
    quantity: number;
    salePrice: number;
    date: string;
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
