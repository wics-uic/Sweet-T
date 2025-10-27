import fs from 'fs'
const filePath: string = './src/data/testimonials.json'
const testJson = fs.readFileSync(filePath, 'utf-8');

export type Testimonial = {
    name: string;
    message: string;
};

interface TestimonialsList {
    [key: string]: Testimonial;
}

const data: TestimonialsList = JSON.parse(testJson)

const testimonials: Testimonial[] = [];
for (const key in data){
    let test:Testimonial = data[key]
    testimonials.push(test)
}

export default testimonials