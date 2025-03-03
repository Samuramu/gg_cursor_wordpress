declare module "*.json" {
  export const studies: Array<{
    authors: string;
    journal: string;
    population: string;
    module: string;
    summary: string[];
    fullText: string;
    isRct: boolean;
  }>;
} 