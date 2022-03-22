export interface Release {
  au: string;
  eu: string;
  jp: string;
  na: string;
}

export interface AmiiboItem {
  amiiboSeries: string;
  character: string;
  gameSeries: string;
  head: string;
  image: string;
  name: string;
  release: Release;
  tail: string;
  type: string;
}

export interface Amiibo {
  amiibo: AmiiboItem[];
}


