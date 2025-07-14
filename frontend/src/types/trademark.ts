export enum TrademarkStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_EXAMINATION = 'under_examination',
  PUBLISHED = 'published',
  REGISTERED = 'registered',
  REJECTED = 'rejected',
  ABANDONED = 'abandoned',
  EXPIRED = 'expired',
}

export enum TrademarkType {
  WORD = 'word',
  FIGURATIVE = 'figurative',
  COMBINED = 'combined',
  THREE_DIMENSIONAL = 'three_dimensional',
  SOUND = 'sound',
  COLOR = 'color',
  OTHER = 'other',
}

export interface Trademark {
  id: string;
  name: string;
  description?: string;
  type: TrademarkType;
  status: TrademarkStatus;
  owner_id: string;
  application_number?: string;
  registration_number?: string;
  filing_date?: string;
  registration_date?: string;
  expiration_date?: string;
  nice_classes?: number[];
  goods_services?: string;
  jurisdiction: string;
  image_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface TrademarkCreate {
  name: string;
  description?: string;
  type: TrademarkType;
  nice_classes?: number[];
  goods_services?: string;
  jurisdiction: string;
  image_url?: string;
}

export interface TrademarkUpdate {
  name?: string;
  description?: string;
  type?: TrademarkType;
  nice_classes?: number[];
  goods_services?: string;
  jurisdiction?: string;
  image_url?: string;
  status?: TrademarkStatus;
}

export interface TrademarkSearchResult {
  id?: string;
  name: string;
  description?: string;
  type: TrademarkType;
  status: TrademarkStatus;
  jurisdiction: string;
  nice_classes?: number[];
  goods_services?: string;
  application_number?: string;
  registration_number?: string;
  filing_date?: string;
  registration_date?: string;
  similarity_score?: number;
  source: string;
}

export interface TrademarkSearchResponse {
  results: TrademarkSearchResult[];
  total_results: number;
  query: string;
  jurisdiction?: string;
  nice_classes?: number[];
}

export interface TrademarkSearchQuery {
  query: string;
  jurisdiction?: string;
  nice_classes?: number[];
}