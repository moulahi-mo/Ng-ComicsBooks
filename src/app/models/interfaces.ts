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
  cover: string;
  pages: number;
  condition: string;
  price: number;
  date: Date;
  owner: string;
  characters: { count: number; items: [{ name: string; resourceURI: string }] };
}
