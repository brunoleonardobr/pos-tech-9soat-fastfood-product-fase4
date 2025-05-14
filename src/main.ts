import HealthCheckApiController from "./infra/api/healthcheck-api";
import ProductsApi from "./infra/api/products-api";
import MysqlAdapter from "./infra/database/mysql-adapter";
import Registry from "./infra/di/registry";
import ExpressAdapter from "./infra/http/express-adapter";
import ProductRepositoryDatabase from "./infra/repositories/product-repository-database";

(async () => {
  const dependencies = {
    database: new MysqlAdapter(),
    productRepository: new ProductRepositoryDatabase(),
    httpServer: new ExpressAdapter(),
  };
  const registry = Registry.getInstance();
  Object.entries({ ...dependencies }).forEach(([name, dependency]) => {
    registry.provide(name, dependency);
  });

  new HealthCheckApiController();
  new ProductsApi();
  dependencies.httpServer.listen(3001);
})();
