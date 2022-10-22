import { HttpParams } from "@angular/common/http";

interface Params {
  page?: number;
  page_size?: number;
  search?: string;
  search_precise?: boolean;
}

export type SearchParams = Params | HttpParams
