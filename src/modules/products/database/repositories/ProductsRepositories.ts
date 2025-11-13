import { AppDataSource } from "@shared/typeorm/data-source";
import { Product } from "../entities/Product";
import { In } from "typeorm";

interface IFindProducts {
  id: string;
}

export const productsRepositories = AppDataSource.getRepository(Product).extend(
  {
    async findByName(name: string): Promise<Product | null> {
      return this.findOneBy({ name });
    },
    async findById(id: string): Promise<Product | null> {
      return this.findOneBy({ id });
    },
    async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
      // Extrai apenas os IDs dos produtos recebidos.
      // Exemplo: [{ id: '1' }, { id: '2' }] → ['1', '2']
      const productsIds = products.map((product) => product.id);
      // Faz uma consulta no banco de dados buscando todos os produtos
      // cujo campo "id" está contido no array "productsIds".
      // O operador In() é uma função do TypeORM que traduz isso para:
      // SELECT * FROM products WHERE id IN (...);
      const existentProducts = await this.find({
        where: { id: In(productsIds) },
      });

      return existentProducts;
    },
  }
);
