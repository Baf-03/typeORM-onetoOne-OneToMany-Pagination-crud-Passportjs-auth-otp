// pagination.dto.ts
import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit: number;

  constructor() {
    // Set defaults if values are undefined or invalid
    this.page = this.page || 1;
    this.limit = this.limit || 10;
  }
}
