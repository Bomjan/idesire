export type Category = "iPhone" | "Mac" | "iPad" | "Accessories";

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: Category;
  price: number;
  image: string;
  badge?: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro",
    tagline: "Titanium. So strong. So light. So Pro.",
    category: "iPhone",
    price: 165000,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=700&q=85",
    badge: "New",
    featured: true,
  },
  {
    id: "iphone-16",
    name: "iPhone 16",
    tagline: "A total powerhouse. In a lighter package.",
    category: "iPhone",
    price: 119000,
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=700&q=85",
    badge: "New",
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    tagline: "A familiar face. A formidable force.",
    category: "iPhone",
    price: 94000,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=700&q=85",
  },
  {
    id: "macbook-air-m3",
    name: "MacBook Air M3",
    tagline: "Lean. Mean. M3 machine.",
    category: "Mac",
    price: 189000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&q=85",
    badge: "Popular",
    featured: true,
  },
  {
    id: "macbook-pro-m4",
    name: "MacBook Pro M4",
    tagline: "Outrageously powerful. Outrageously thin.",
    category: "Mac",
    price: 259000,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=700&q=85",
    badge: "New",
  },
  {
    id: "imac-m3",
    name: "iMac M3",
    tagline: "It's as powerful as it is beautiful.",
    category: "Mac",
    price: 229000,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&q=85",
  },
  {
    id: "ipad-pro-m4",
    name: "iPad Pro M4",
    tagline: "Impossibly thin. Incredibly powerful.",
    category: "iPad",
    price: 159000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=700&q=85",
    badge: "New",
  },
  {
    id: "ipad-air-m2",
    name: "iPad Air M2",
    tagline: "Supercharged by M2. Ready for anything.",
    category: "iPad",
    price: 109000,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=700&q=85",
    featured: true,
  },
  {
    id: "ipad-mini",
    name: "iPad mini",
    tagline: "Small. Mighty. Mini.",
    category: "iPad",
    price: 79000,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=700&q=85",
  },
  {
    id: "apple-watch-s10",
    name: "Apple Watch Series 10",
    tagline: "The thinnest Apple Watch ever.",
    category: "Accessories",
    price: 59000,
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=700&q=85",
    badge: "New",
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    tagline: "Adaptive Audio. Now playing.",
    category: "Accessories",
    price: 35000,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=700&q=85",
    featured: true,
  },
  {
    id: "airpods-4",
    name: "AirPods 4",
    tagline: "Beloved design. Brilliant new features.",
    category: "Accessories",
    price: 24000,
    image: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=700&q=85",
  },
];

export const categories: Category[] = ["iPhone", "Mac", "iPad", "Accessories"];

export function formatPrice(price: number): string {
  return `Nu. ${price.toLocaleString("en-IN")}`;
}
