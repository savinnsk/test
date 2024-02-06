import { BilletFine } from '@domain/interfaces/billetFine.interface';
import { BilletInterestDto } from './billetInterest.dto';
export declare class BilletDto {
    barcode: string;
    instructions: string;
    due_at: string;
    interest: BilletInterestDto;
    fine: BilletFine;
}
