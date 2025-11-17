import fs from 'fs'
const filePath: string = './src/data/custom_orders.json'
const ordersJson = fs.readFileSync(filePath, 'utf-8');

export type CustomOrder = {
    name: string;
    order: string;
    date: string;
    due: string;
    status: string;
};

interface CustomOrderList {
    [key: string]: CustomOrder;
}

const data: CustomOrderList = JSON.parse(ordersJson)

const customOrders: CustomOrder[] = [];
for (const key in data){
    let test:CustomOrder = data[key]
    customOrders.push(test)
}

export default customOrders