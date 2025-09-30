import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-products.dto';
import { ProductsService } from './products.service';
import { UpdateTweetDto } from 'src/tweets/dto/update-tweet.dto';
import { UpdateProductsDto } from './dto/update-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  public createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  public getProducts() {
    return this.productsService.findAll();
  }

  @Patch(':id')
  public updateProduct(
    @Param('id') id: string,
    @Body() updatedProductDto: UpdateProductsDto,
  ) {
    return this.productsService.update(+id, updatedProductDto);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Delete(':id')
  deleteProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
