import { ERROR_MESSAGES } from "../../../domain/enums/error-messages.enum";
import InvalidParameterException from "../../../domain/exceptions/invalid-parameter.exception";
import { ProductGateway } from "../../../domain/interfaces/gateways/product-gateway";
import UseCase from "../use-case";

export default class UpdateProduct implements UseCase {
  constructor(readonly productGateway: ProductGateway) {}

  async execute(input: Input) {
    this.validateInput(input);
    const productExists = await this.productGateway.getById({
      id: input.id,
    });
    if (!productExists) {
      throw new InvalidParameterException(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }
    const updateData = this.mapUpdateData(input);
    await this.productGateway.update(updateData);
  }

  private validateInput(input: Input): void {
    if (!input.id) {
      throw new InvalidParameterException(ERROR_MESSAGES.ID_REQUIRED);
    }
    const { description, price, category } = input;
    if (!description && price == 0 && !category) {
      throw new InvalidParameterException(
        ERROR_MESSAGES.AT_LEAST_ONE_PARAM_REQUIRED
      );
    }
  }

  private mapUpdateData(input: Input): UpdateData {
    const { id, description, price, category } = input;
    const updateData: UpdateData = { id };

    if (description) updateData.description = description;
    if (price != 0) updateData.price = price;
    if (category) updateData.category = category;

    return updateData;
  }
}

type Input = {
  id: string;
  description: string;
  price: number;
  category: string;
};

type UpdateData = {
  id: string;
  description?: string;
  price?: number;
  category?: string;
};
