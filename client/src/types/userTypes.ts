enum nationality {
  CANADA,
  BRAZIL,
  INDIA,
  GERMANY,
  CHILE,
}

export interface userDetails {
  name: string | null;
  username: string | null;
  age: number | null;
  nationality: string | null;
}
export interface user {
  id: number;
  name: String;
  username: String;
  age: number;
  nationality: nationality;
}
