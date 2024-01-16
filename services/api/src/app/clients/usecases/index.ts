import { CreateClientService } from './create-client/create-client.service';
import { DeleteClientService } from './delete-client/delete-client.service';
import { FindAllClientService } from './find-all-client/find-all-client.service';
import { FindClientByApiKeyService } from './find-client-by-api-key/find-client-by-api-key.service';
import { FindClientByIdService } from './find-client-by-id/find-client-by-id.service';
import { UpdateClientByApiKeyService } from './update-client-by-api-key/update-client-by-api-key.service';
import { UpdateClientService } from './update-client/update-client.service';

export default [
  CreateClientService,
  FindAllClientService,
  FindClientByIdService,
  FindClientByApiKeyService,
  UpdateClientService,
  DeleteClientService,
  UpdateClientByApiKeyService,
];
