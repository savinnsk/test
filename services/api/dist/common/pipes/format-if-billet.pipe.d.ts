import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class FormatIfBilletPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
