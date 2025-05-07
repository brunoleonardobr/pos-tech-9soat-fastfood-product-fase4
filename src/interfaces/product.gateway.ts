export default interface ProductGateway {
  create(product: CreateProductRequest): Promise<any>;
  update(id: string, product: any): Promise<any>;
  delete(id: string): Promise<any>;
  getById(id: string): Promise<any>;
  getByCategory(input: GetProductByCategoryRequest): Promise<any>;
  getByDescription(description: string): Promise<any>;
}

export type CreateProductRequest = {
  name: string;
  description: string;
  price: number;
  category: string;
};

export type GetProductByCategoryRequest = {
  category: string;
};
