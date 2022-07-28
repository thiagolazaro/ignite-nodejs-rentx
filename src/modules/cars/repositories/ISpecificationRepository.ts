import { Specification } from "../entities/Specification";

interface ICreateSpecifitonDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecifitonDTO): void;
  findByName(name: string): Specification;
}

export { ISpecificationsRepository, ICreateSpecifitonDTO };
