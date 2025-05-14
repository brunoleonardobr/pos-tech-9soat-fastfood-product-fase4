import {
  CreateProductInput,
  DeleteProductInput,
  GetProductByCategory,
  GetProductById,
  GetProductByName,
  ProductGateway,
  UpdateProductInput,
} from "../../domain/interfaces/gateways/product-gateway";
import ProductRepository from "../../domain/interfaces/repositories/product-repository";

export default class ProductGatewayImpl implements ProductGateway {
  constructor(readonly productRepository: ProductRepository) {}
  async create(input: CreateProductInput): Promise<void> {
    await this.productRepository.create(input);
  }
  async update(input: UpdateProductInput): Promise<void> {
    await this.productRepository.update(input);
  }
  async delete(input: DeleteProductInput): Promise<void> {
    return this.productRepository.delete(input);
  }
  async getByDescription(input: GetProductByName): Promise<any> {
    return this.productRepository.getByDescription(input);
  }
  async listByCategory(input: GetProductByCategory): Promise<any> {
    return this.productRepository.listByCategory(input);
  }
  async getById(input: GetProductById): Promise<any> {
    return this.productRepository.getById(input);
  }
}
