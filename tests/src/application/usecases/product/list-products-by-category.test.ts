import { ListProductsByCategory } from "../../../../../src/application/usecases";
import ProductsByCategoryNotFoundException from "../../../../../src/domain/exceptions/products-by-category-not-foud.exception";
import { mockProductGateway } from "../../../mocks/mockProductGateway";

describe("List Products By Category Use Case", () => {
  it("should list products by category successfully", async () => {
    const mockProducts = [
      {
        id: "1",
        description: "Product 1",
        price: 100,
        category: "Acompanhamento",
      },
      {
        id: "2",
        description: "Product 2",
        price: 200,
        category: "Acompanhamento",
      },
    ];
    const mockGateway = {
      ...mockProductGateway,
      listByCategory: jest.fn().mockResolvedValueOnce(mockProducts),
    };
    const listProductsByCategoryUseCase = new ListProductsByCategory(
      mockGateway
    );
    const result = await listProductsByCategoryUseCase.execute({
      category: "Acompanhamento",
    });
    expect(result).toEqual(mockProducts);
  });

  it("should throw an error if no products are found for the category", async () => {
    const mockGateway = {
      ...mockProductGateway,
      listByCategory: jest.fn().mockResolvedValueOnce([]),
    };
    const listProductsByCategoryUseCase = new ListProductsByCategory(
      mockGateway
    );
    await expect(
      listProductsByCategoryUseCase.execute({ category: "NonExistentCategory" })
    ).rejects.toThrow(ProductsByCategoryNotFoundException);
  });
});
