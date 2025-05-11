import DeleteProduct from "../../../../../src/application/usecases/product/delete-product";
import ProductNotFoundException from "../../../../../src/domain/exceptions/product-not-found.exception";
import { mockProductGateway } from "../../../mocks/mockProductGateway";

describe("Remove Products Use Case", () => {
  it("should remove products successfully", async () => {
    const mockProducts = {
      id: "1",
      description: "Product 1",
      price: 100,
      category: "Acompanhamento",
    };
    const mockGateway = {
      ...mockProductGateway,
      getById: jest.fn().mockResolvedValueOnce(mockProducts),
    };
    const removeProductsUseCase = new DeleteProduct(mockGateway);
    await removeProductsUseCase.execute({
      id: "1",
    });
    expect(mockGateway.delete).toHaveBeenCalledWith({
      id: "1",
    });
  });
  it("should throw an error if no products are found for the id", async () => {
    const mockGateway = {
      ...mockProductGateway,
      getById: jest.fn().mockResolvedValueOnce(null),
    };
    const removeProductsUseCase = new DeleteProduct(mockGateway);
    await expect(removeProductsUseCase.execute({ id: "1" })).rejects.toThrow(
      ProductNotFoundException
    );
  });
});
