export interface User {
  uid?: string;
  name?: string;
  email?: string;
  password?: string;
  joind_date?: Date;
}

export interface Comic {
  id: string;
  title: string;
  format: string;
  description?: string;
  cover: string;
  pages: number;
  condition: string;
  price: number;
  date: Date;
  owner?: string;
  characters?: { name: string; image: string }[];
  poster?: string;
  uid?: string;
  pageCount?: number;
  favorite_date?: Date;
  mycomic_date?: Date;
}
export interface Character {
  id: number;
  name: string;
  image: string;
  description?: string;
  comics?: {
    available: number;
    items: { name: string; resourceURI: string }[];
  };
}

// export interface NewComic extends Comic {
//   condition: string;
//   price: string;
//   description: string;

// }
