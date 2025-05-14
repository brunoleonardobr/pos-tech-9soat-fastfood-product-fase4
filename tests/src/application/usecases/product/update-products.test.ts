import { UpdateProduct } from "../../../../../src/application/usecases";
import { mockProductGateway } from "../../../mocks/mockProductGateway";

describe("Update Products Use Case", () => {
  it("should update products successfully", async () => {
    const updateProductsUseCase = new UpdateProduct(mockProductGateway);
    await updateProductsUseCase.execute({
      id: "123",
      description: "Updated Description",
      price: 100,
      category: "Updated Category",
    });
    expect(mockProductGateway.update).toHaveBeenCalledWith({
      id: "123",
      category: "Updated Category",
      description: "Updated Description",
      price: 100,
    });
  });

  it("should throw an error if no parameters are provided", async () => {
    const updateProductsUseCase = new UpdateProduct(mockProductGateway);
    await expect(
      updateProductsUseCase.execute({
        id: "123",
        description: "",
        price: 0,
        category: "",
      })
    ).rejects.toThrow("At least one parameter is required");
  });

  it("should throw an error if product is not found", async () => {
    const updateProductsUseCase = new UpdateProduct(mockProductGateway);
    mockProductGateway.getById.mockResolvedValue(null);
    const result = updateProductsUseCase.execute({
      id: "123",
      description: "Updated Description",
      price: 100,
      category: "Updated Category",
    });
    await expect(result).rejects.toThrow("Product not found");
  });

  it("should throw an error if ID is not provided", async () => {
    const updateProductsUseCase = new UpdateProduct(mockProductGateway);
    await expect(
      updateProductsUseCase.execute({
        id: "",
        description: "Updated Description",
        price: 100,
        category: "Updated Category",
      })
    ).rejects.toThrow("Id is required");
  });
});
