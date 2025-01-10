// frontend/types/tourism.ts
export interface Demographics {
    age_groups: {
      group: string;
      percentage: number;
    }[];
    purpose: {
      type: string;
      percentage: number;
    }[];
  }
  
  export interface VisitorTrend {
    month: string;
    visitors: number;
    avg_stay_days: number;
  }
  
  export interface VisitorData {
      month: string;
      visitors: number;
      domestic: number;
      international: number;
    }
    
    export interface Destination {
      name: string;
      visitors: number;
      rating: number;
    }