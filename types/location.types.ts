export type Location = {
  lat: number;
  lng: number;
};

export interface DefaultValues {
  location: Location;
  setLocation: (location: Location) => void;
}
