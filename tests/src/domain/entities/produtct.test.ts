import { Product } from "../../../../src/domain/entities/product";
import { ERROR_MESSAGES } from "../../../../src/domain/enums/error-messages.enum";
import UnprocessableEntityException from "../../../../src/domain/exceptions/unprocessable-entity.exception";

jest.mock("crypto", () => ({
  randomUUID: jest.fn(() => "mocked-uuid"),
}));

describe("Product entity", () => {
  it("should create a product instance successfully using constructor", () => {
    const product = new Product("1", "Test product", "LANCHE", 100);

    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBe("1");
    expect(product.description).toBe("Test product");
    expect(product.category).toBe("LANCHE");
    expect(product.price).toBe(100);
  });

  it("should create a product using static create() with generated id", () => {
    const product = Product.create("Static product", 50, "BEBIDA");

    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBe("mocked-uuid"); // validando o mock
    expect(product.description).toBe("Static product");
    expect(product.category).toBe("BEBIDA");
    expect(product.price).toBe(50);
  });

  it("should throw UnprocessableEntityException if price is 0", () => {
    expect(() => {
      new Product("2", "Invalid product", "LANCHE", 0);
    }).toThrow(UnprocessableEntityException);

    expect(() => {
      new Product("2", "Invalid product", "LANCHE", 0);
    }).toThrow(ERROR_MESSAGES.PRICE_INVALID);
  });

  it("should throw UnprocessableEntityException if price is negative", () => {
    expect(() => {
      new Product("3", "Invalid product", "LANCHE", -10);
    }).toThrow(UnprocessableEntityException);
  });
});
