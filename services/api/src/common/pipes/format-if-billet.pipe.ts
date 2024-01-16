import { genBilletDueAt } from '@helpers/functions/gen-billet-due-at';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FormatIfBilletPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const isBillet = value?.paymentMethod === 'billet';
    console.log(genBilletDueAt());
    if (!isBillet) return value;
    return Object.assign(value, {
      billet: {
        due_at: genBilletDueAt(),
        instructions: 'Pagar até vencimento: ' + genBilletDueAt(),
        interest: {
          days: 4,
          type: 'percentage',
          amount: '10',
        },
        fine: {
          days: 4,
          type: 'percentage',
          amount: '10',
        },
      },
    });
  }
}
