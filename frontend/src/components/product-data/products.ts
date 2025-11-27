import cake from "../../assets/products-cake.png?url"
import cookie from "../../assets/products-cookie.png?url"
import cupcake from "../../assets/products-cupcake.png?url"
import flan from "../../assets/products-flan.png?url"
import pastelitos from "../../assets/products-pastelitos.png?url"


export type Product = {
  name: string;
  imagePath: string;   
  price: string;
  ready: boolean;
  link: string;
};

const team: Product[] = [
  { name: 'Cake', imagePath: cake, price: "65", ready: true, link:"cakes" },
  { name: 'Cookies', imagePath: cookie, price: "42/dozen", ready: false, link:"cookies"},
  { name: 'Cupcake', imagePath: cupcake, price: "36/dozen", ready: true, link:"cupcakes" },
  { name: 'Flan', imagePath: flan, price: "36/dozen", ready: false, link:"flans" },
  { name: 'Pastelitos', imagePath: pastelitos, price: "30/dozen", ready: false, link:"pastelitos" },
  
];

export default team;