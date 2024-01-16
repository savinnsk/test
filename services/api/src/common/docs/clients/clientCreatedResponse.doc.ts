import { ApiProperty } from '@nestjs/swagger';

import { ClientInfoDoc } from './clientInfos.doc';

export class ClientCreatedResponseDoc {
  @ApiProperty({
    description: 'Client created.',
  })
  client: ClientInfoDoc;
}
