interface industryIdentifiersInterface {
  type: string;
  identifier: string;
}

interface panelizationSummaryInterface {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

interface readingModesInterface {
  text: boolean;
  image: boolean;
}

export interface IData {
  kind: string;
  totalItems: number;
  items: IBook[];
}

export interface IBook {
  accessInfo: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
  };
  etag: string;
  id: string;
  kind: string;
  saleInfo: { country: string; saleability: string; isEbook: boolean };
  searchInfo: { textSnippet: string };
  selfLink: string;
  volumeInfo: IvolumeInfo;
}

export interface IvolumeInfo {
  allowAnonLogging: boolean;
  authors: string[];
  canonicalVolumeLink: string;
  categories: string[];
  contentVersion: string;
  description: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  industryIdentifiers: industryIdentifiersInterface[];
  infoLink: string;
  language: string;
  maturityRating: string;
  pageCount: number;
  panelizationSummary: panelizationSummaryInterface;
  previewLink: string;
  printType: string;
  publishedDate: string;
  publisher: string;
  readingModes: readingModesInterface;
  subtitle: string;
  title: string;
}
