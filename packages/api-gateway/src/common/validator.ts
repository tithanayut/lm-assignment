import { IsPositive, Max } from "class-validator";

export class PaginationQuery {
  @IsPositive()
  @Max(50)
  limit: number = 10;

  @IsPositive()
  page: number = 1;
}
