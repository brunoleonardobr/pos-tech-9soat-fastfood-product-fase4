import { Given, When, Then } from "@cucumber/cucumber";
import ProductsController from "../../src/controllers/products.controller";
import ProductRepository, {
  CreateProductInput,
} from "../../src/domain/interfaces/repositories/product-repository";
import assert from "assert";

let controller: ProductsController;
let produtosCriados: CreateProductInput[] = [];

Given(
  "Tenho um produto com descrição {string}, preço {int} e categoria {string}",
  function (descricao: string, preco: number, categoria: string) {
    const fakeRepository: ProductRepository = {
      create: async (input) => {
        produtosCriados.push(input);
        return;
      },
      update: async () => {},
      delete: async () => {},
      getById: async () => {},
      getByDescription: async () => {},
      listByCategory: async () => {},
    };

    controller = new ProductsController();
    (controller as any).productRepository = fakeRepository; // injeção manual

    this.produto = {
      description: descricao,
      price: preco,
      category: categoria,
    };
  }
);

When("Quando crio o Produto", async function () {
  const result = await controller.createProduct(this.produto);
  this.resultado = result;
  this.mensagem = "Produto criado com sucesso";
});

Then(
  "Então o reusultado deve ser {string}",
  function (mensagemEsperada: string) {
    assert.strictEqual(this.resultado.description, this.produto.description);
  }
);
