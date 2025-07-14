import api from '@/lib/api';
import { 
  Trademark, 
  TrademarkCreate, 
  TrademarkUpdate, 
  TrademarkSearchQuery, 
  TrademarkSearchResponse 
} from '@/types/trademark';

export const trademarkService = {
  async getTrademarks(): Promise<Trademark[]> {
    const response = await api.get('/trademarks/');
    return response.data;
  },

  async getTrademark(id: string): Promise<Trademark> {
    const response = await api.get(`/trademarks/${id}`);
    return response.data;
  },

  async createTrademark(trademark: TrademarkCreate): Promise<Trademark> {
    const response = await api.post('/trademarks/', trademark);
    return response.data;
  },

  async updateTrademark(id: string, trademark: TrademarkUpdate): Promise<Trademark> {
    const response = await api.put(`/trademarks/${id}`, trademark);
    return response.data;
  },

  async deleteTrademark(id: string): Promise<void> {
    await api.delete(`/trademarks/${id}`);
  },

  async searchTMView(query: TrademarkSearchQuery): Promise<TrademarkSearchResponse> {
    const params = new URLSearchParams({
      query: query.query,
    });
    
    if (query.jurisdiction) {
      params.append('jurisdiction', query.jurisdiction);
    }
    
    if (query.nice_classes) {
      query.nice_classes.forEach(cls => params.append('nice_classes', cls.toString()));
    }

    const response = await api.get(`/search/tmview?${params}`);
    return response.data;
  },

  async searchLocal(query: TrademarkSearchQuery): Promise<TrademarkSearchResponse> {
    const params = new URLSearchParams({
      query: query.query,
    });
    
    if (query.jurisdiction) {
      params.append('jurisdiction', query.jurisdiction);
    }
    
    if (query.nice_classes) {
      query.nice_classes.forEach(cls => params.append('nice_classes', cls.toString()));
    }

    const response = await api.get(`/search/local?${params}`);
    return response.data;
  },

  async searchCombined(query: TrademarkSearchQuery): Promise<any> {
    const params = new URLSearchParams({
      query: query.query,
    });
    
    if (query.jurisdiction) {
      params.append('jurisdiction', query.jurisdiction);
    }
    
    if (query.nice_classes) {
      query.nice_classes.forEach(cls => params.append('nice_classes', cls.toString()));
    }

    const response = await api.get(`/search/combined?${params}`);
    return response.data;
  },
};