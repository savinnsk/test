import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HandlerError } from '@common/formatters/handler-error';
import { IDataFromApi, ParserMapper } from '@common/mappers/parser.mapper';

@Controller()
export class ParserMessage {
  @MessagePattern('koin-to-api')
  async execute(
    @Payload()
    payload: IDataFromApi,
  ) {
    try {
      return ParserMapper.toApi(payload);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
