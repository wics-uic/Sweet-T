import cake from "../../assets/products-cake.png?url"
import cookie from "../../assets/products-cookie.png?url"
import cupcake from "../../assets/products-cupcake.png?url"
import flan from "../../assets/products-flan.png?url"
import pastelitos from "../../assets/products-pastelitos.png?url"


export type Product = {
  name: string;
  imagePath: string;   
  price: string;
};

const team: Product[] = [
  { name: 'Cake', imagePath: cake, price: "65" },
  { name: 'Cookie', imagePath: cookie, price: "42/dozen" },
  { name: 'Cupcake', imagePath: cupcake, price: "36/dozen" },
  { name: 'Flan', imagePath: flan, price: "36/dozen" },
  { name: 'Pastelitos', imagePath: pastelitos, price: "30/dozen" },
  
];

export default team;