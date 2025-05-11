import ProductNotFoundException from "../../../domain/exceptions/product-not-found.exception";
import { ProductGateway } from "../../../domain/interfaces/gateways/product-gateway";
import UseCase from "../use-case";

export default class DeleteProduct implements UseCase {
  constructor(readonly productGateway: ProductGateway) {}

  async execute(input: Input) {
    const productExists = await this.productGateway.getById({ id: input.id });
    if (!productExists) {
      throw new ProductNotFoundException();
    }
    await this.productGateway.delete({ id: input.id });
  }
}

type Input = {
  id: string;
};
