import { Repository } from "typeorm";
import { AppDataSource } from "./../../../../database/data-source";
import { Specification } from "../../entities/Specification";
import { ICreateSpecifitonDTO, ISpecificationsRepository } from "../ISpecificationRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecifitonDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);
  }

  findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOneBy({ name });

    return specification;
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }
}

export { SpecificationsRepository };
