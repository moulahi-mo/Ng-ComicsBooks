export interface User {
  uid?: string;
  name?: string;
  email: string;
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
  characters: { name: string; image: string }[];
  poster?: string;
}
export interface Character {
  id: string;
  name: string;
  image: string;
  description?: string;
  comics: {
    available: number;
    items: { name: string; resourceURI: string }[];
  };
}
