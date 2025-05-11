import {
  CreateProduct,
  ListProductsByCategory,
  UpdateProduct,
} from "../../../src/application/usecases";
import DeleteProduct from "../../../src/application/usecases/product/delete-product";
import ProductsController from "../../../src/controllers/products.controller";
import ProductRepository from "../../../src/domain/interfaces/repositories/product-repository";

describe("ProductController", () => {
  let controller: ProductsController;
  let mockRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      getById: jest.fn(),
      getByDescription: jest.fn(),
      listByCategory: jest.fn(),
    };

    controller = new ProductsController();
    // injetando manualmente o repositório mockado
    (controller as any).productRepository = mockRepository;
  });

  it("createProduct", async () => {
    const mockProduct = {
      id: "1",
      description: "Test",
      price: 100,
      category: "LANCHE",
    };

    const mockCreateProduct = jest.spyOn(CreateProduct.prototype, "execute");
    (mockCreateProduct as jest.Mock).mockResolvedValue(mockProduct);
    const result = await controller.createProduct({
      description: "Test",
      price: 100,
      category: "LANCHE",
    });

    expect(result).toEqual(mockProduct);
    expect(CreateProduct.prototype.execute).toHaveBeenCalledWith({
      description: "Test",
      price: 100,
      category: "LANCHE",
    });
  });

  it("updateProduct", async () => {
    const mockProduct = {
      id: "1",
      description: "Test",
      price: 100,
      category: "LANCHE",
    };

    const mockUpdateProduct = jest.spyOn(UpdateProduct.prototype, "execute");
    (mockUpdateProduct as jest.Mock).mockResolvedValue(mockProduct);
    const result = await controller.updateProduct(
      { id: "1" },
      {
        description: "Test",
        price: 100,
        category: "LANCHE",
      }
    );

    expect(result).toEqual({ message: "Product updated successfully" });
    expect(UpdateProduct.prototype.execute).toHaveBeenCalledWith({
      id: "1",
      description: "Test",
      price: 100,
      category: "LANCHE",
    });
  });

  it("deleteProduct", async () => {
    const mockDelete = jest.spyOn(DeleteProduct.prototype, "execute");
    (mockDelete as jest.Mock).mockResolvedValue(undefined);

    const result = await controller.deleteProduct({ id: "1" });

    expect(result).toEqual({ message: "Product deleted successfully" });
    expect(DeleteProduct.prototype.execute).toHaveBeenCalledWith({ id: "1" });
  });

  it("listProductsByCategory", async () => {
    const mockProducts = [
      {
        id: "1",
        description: "Test",
        price: 100,
        category: "LANCHE",
      },
    ];

    const mockList = jest.spyOn(ListProductsByCategory.prototype, "execute");
    (mockList as jest.Mock).mockResolvedValue(mockProducts); // ✅ Agora retorna corretamente

    const result = await controller.listProductsByCategory({
      category: "LANCHE",
    });

    expect(result).toEqual(mockProducts); // ✅ Deve passar agora
    expect(ListProductsByCategory.prototype.execute).toHaveBeenCalledWith({
      category: "LANCHE",
    });
  });
});
