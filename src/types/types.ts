export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface Match {
  match: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface SearchResponse {
  resultIds: string[];
  total: number;
  next: string;
  prev: string;
}

export interface SearchInput {
  zipCodes?: Location[];
  ageMin?: number;
  ageMax?: number;
  breeds?: string[];
  size?: number;
  from?: string;
  sort?: string;
}

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface LocationResponse {
  results: Location[];
  total: number;
}
