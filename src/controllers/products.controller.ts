import {
  CreateProduct,
  ListProductsByCategory,
  UpdateProduct,
} from "../application/usecases";
import DeleteProduct from "../application/usecases/product/delete-product";
import ProductRepository from "../domain/interfaces/repositories/product-repository";
import CreateProductDTO from "../infra/api/dto/create-product.dto";
import DeleteProductParamDTO from "../infra/api/dto/delete-product-param.dto";
import ListProductByCategoryDTO from "../infra/api/dto/list-product-by-category.dto";
import UpdateProductParamDTO from "../infra/api/dto/update-product-param.dto";
import UpdateProductDTO from "../infra/api/dto/update-product.dto";
import { inject } from "../infra/di/registry";
import ProductGateway from "../infra/gateways/product.gateway.impl";

export default class ProductsController {
  @inject("productRepository")
  private readonly productRepository!: ProductRepository;
  constructor() {}
  async createProduct(body: any) {
    const createProductDTO = new CreateProductDTO(
      body.description,
      body.price,
      body.category
    );
    const gateway = new ProductGateway(this.productRepository);
    const useCase = new CreateProduct(gateway);
    const product = await useCase.execute(createProductDTO);
    return product;
  }

  async updateProduct(params: any, body: any) {
    const updateProductDTO = new UpdateProductDTO(
      body.description,
      body.price,
      body.category
    );
    const updateProductParamDTO = new UpdateProductParamDTO(params.id);
    const gateway = new ProductGateway(this.productRepository);
    const useCase = new UpdateProduct(gateway);
    await useCase.execute({
      id: updateProductParamDTO.id,
      ...updateProductDTO,
    });
    return { message: "Product updated successfully" };
  }

  async deleteProduct(params: any) {
    const deleteProductParamDTO = new DeleteProductParamDTO(params.id);
    const gateway = new ProductGateway(this.productRepository);
    const useCase = new DeleteProduct(gateway);
    await useCase.execute({ id: deleteProductParamDTO.id });
    return { message: "Product deleted successfully" };
  }

  async listProductsByCategory(params: any) {
    const listProductsByCategoryDTO = new ListProductByCategoryDTO(
      params.category
    );
    const gateway = new ProductGateway(this.productRepository);
    const useCase = new ListProductsByCategory(gateway);
    const products = await useCase.execute(listProductsByCategoryDTO);
    return products;
  }
}
