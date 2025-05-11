export const mockProductGateway = {
  create: jest.fn().mockResolvedValue(true),
  update: jest.fn().mockResolvedValue(true),
  delete: jest.fn().mockResolvedValue(true),
  getByDescription: jest.fn().mockResolvedValue(true),
  listByCategory: jest.fn().mockResolvedValue(true),
  getById: jest.fn().mockResolvedValue(true),
};
