import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Req() req: any) {
    const decodedToken = req.user;
    return this.productsService.create(createProductDto, decodedToken.userId);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Req() req: any) {
    const decodedToken = req.user;
    return this.productsService.update(id, updateProductDto, decodedToken.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    const decodedToken = req.user;
    return this.productsService.remove(id, decodedToken.userId);
  }

  @EventPattern('user.created')
  async handleUserCreated(@Payload() data: { userId: string; email: string; name: string }) {
    console.log('Received user.created event in Product Service:', data);
  }
}