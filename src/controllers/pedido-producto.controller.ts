import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedido,
  Producto,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoProductoController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof Pedido.prototype.id,
  ): Promise<Producto> {
    return this.pedidoRepository.producto(id);
  }
}
