import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.enitity';
import { UpdateProductsDto } from './dto/update-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepositary: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepositary.find();
  }

  //   findOne(id: number): Product | undefined {
  //     return this.products.find((product) => product.id === id);
  //   }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    let createdProduct: Product;
    try {
      createdProduct = this.productRepositary.create({
        ...createProductDto,
      });
      await this.productRepositary.save(createdProduct);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create Product');
    }

    return createdProduct;
  }

  async update(
    id: number,
    updatedProductDto: UpdateProductsDto,
  ): Promise<Product> {
    // 1. Check if the product exists
    const product = await this.productRepositary.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    // 2. Use Object.assign to merge existing data with partial update data
    // This only updates the fields present in the DTO
    const updatedProduct = Object.assign(product, updatedProductDto);

    // 3. Save the merged entity back to the database
    // TypeORM detects changes and runs the UPDATE query
    await this.productRepositary.save(updatedProduct);

    return updatedProduct;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepositary.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  async delete(id: number): Promise<void> {
    const product = await this.productRepositary.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    await this.productRepositary.remove(product);
  }
}
