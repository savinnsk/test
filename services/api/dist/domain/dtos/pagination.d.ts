import { Client } from '@domain/entities/client/client.schema';
export interface PaginationResponse {
    page?: number;
    limit?: number;
    total_items?: number;
    content?: any[];
}
export interface PaginationRequest {
    user?: Client;
    page?: number;
    limit?: number;
    total_items?: number;
    payerName?: string;
}
