export interface Category {
    id: number;
    name: string;
}

export interface Comment {
    id: number;
    createdAt: string;
    updatedAt: string;
    content: string;
    wpisId: number;
}

export interface Post {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    content: string;
    published: boolean;
    kategoriaId: number;
    kategoria?: Category;
    komentarze?: Comment[];
}

export const categories: Category[] = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Travel" },
    { id: 3, name: "Lifestyle" },
    { id: 4, name: "Cooking" }
];

export const comments: Comment[] = [
    {
        id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: "Great article! Very informative.",
        wpisId: 1
    },
    {
        id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: "I totally agree with your points.",
        wpisId: 1
    },
    {
        id: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: "Can you share more details about the itinerary?",
        wpisId: 2
    }
];

export const posts: Post[] = [
    {
        id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: "The Future of Web Development",
        content: "Web development is constantly evolving. From static pages to dynamic web apps, the journey has been incredible. In this post, we explore the latest trends like React Server Components, AI-driven coding, and the return of server-side rendering. We also discuss how tools like Vite and Next.js are shaping the developer experience.",
        published: true,
        kategoriaId: 1,
        kategoria: categories[0],
        komentarze: [comments[0], comments[1]]
    },
    {
        id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: "My Trip to Japan",
        content: "Japan is a country of contrasts. From the neon lights of Tokyo to the serene temples of Kyoto, every corner has a story to tell. I spent two weeks exploring the culture, food, and landscapes. The sushi was fresh, the trains were on time, and the people were incredibly polite. Here are some highlights from my journey...",
        published: true,
        kategoriaId: 2,
        kategoria: categories[1],
        komentarze: [comments[2]]
    },
    {
        id: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: "10 Tips for a Healthy Lifestyle",
        content: "Living a healthy lifestyle doesn't have to be complicated. It starts with small changes. Drink more water, get enough sleep, and move your body every day. In this article, I share 10 practical tips that helped me improve my energy levels and overall well-being. Tip #1: Start your day with a glass of water...",
        published: true,
        kategoriaId: 3,
        kategoria: categories[2],
        komentarze: []
    },
    {
        id: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: "Hidden Gems in Europe",
        content: "Europe is full of famous landmarks, but the real magic often lies off the beaten path. Have you ever visited the fairy-tale village of Hallstatt in Austria? Or the colorful streets of Cinque Terre in Italy? Join me as I uncover some of the most beautiful, yet less crowded, destinations in Europe.",
        published: false,
        kategoriaId: 2,
        kategoria: categories[1],
        komentarze: []
    },
    {
        id: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: "Mastering Sourdough Bread",
        content: "Baking sourdough bread is both an art and a science. It requires patience and attention to detail. I've been experimenting with different hydration levels and flour types. In this guide, I break down the process step-by-step, from creating your starter to achieving that perfect open crumb.",
        published: true,
        kategoriaId: 4,
        kategoria: categories[3],
        komentarze: []
    }
];
