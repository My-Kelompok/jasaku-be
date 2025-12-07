export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
  paging?: Paging;
}

export class Paging {
  current_page: number;
  total_page: number;
  size: number;
}
