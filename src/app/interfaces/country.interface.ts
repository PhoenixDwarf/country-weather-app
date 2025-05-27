export interface Country {
  cca2: string;
  flag: string;
  flagSvg: string;
  name: string;
  capital: string;
  population: number;
  region: string;
  subregion: string;
  languages: Languages;
}

export interface Languages {
  eng?: string;
  hin?: string;
  tam?: string;
  ber?: string;
  mey?: string;
  spa?: string;
  fra?: string;
  nrf?: string;
  deu?: string;
  nld?: string;
  mri?: string;
  nzs?: string;
  cat?: string;
  srp?: string;
  fin?: string;
  swe?: string;
  bjz?: string;
}
