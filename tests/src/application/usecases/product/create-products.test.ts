import { CreateProduct } from "../../../../../src/application/usecases";
import { Category } from "../../../../../src/domain/enums/category.enum";
import { mockProductGateway } from "../../../mocks/mockProductGateway";

describe("Create Products Use Case", () => {
  it("should create a product successfully", async () => {
    const productInput = {
      description: "Test Product",
      price: 100,
      category: Category.ACOMPANHAMENTO,
    };
    const mockGateway = {
      ...mockProductGateway,
      getByDescription: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({
        id: "123",
        ...productInput,
      }),
    };
    const createProductUseCase = new CreateProduct(mockGateway);
    const result = await createProductUseCase.execute(productInput);
    expect(result).toHaveProperty("id");
    expect(result.description).toBe(productInput.description);
    expect(result.price).toBe(productInput.price);
  });
  it("should throw an error if the product already exists", async () => {
    const productInput = {
      description: "Test Product",
      price: 100,
      category: Category.ACOMPANHAMENTO,
    };
    const mockGateway = {
      ...mockProductGateway,
      getByDescription: jest.fn().mockResolvedValue({
        id: "123",
        ...productInput,
      }),
    };
    const createProductUseCase = new CreateProduct(mockGateway);
    await expect(createProductUseCase.execute(productInput)).rejects.toThrow(
      "Product already exists"
    );
  });
});
