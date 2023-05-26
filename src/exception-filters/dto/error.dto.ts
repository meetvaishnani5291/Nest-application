import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class errorResponseDto {
  @ApiProperty({
    type: Number,
    description: 'status code of response',
    example: HttpStatus.FORBIDDEN,
  })
  @IsNumber()
  statusCode: number;

  @ApiProperty({
    type: String,
    description: 'error message',
    example: 'Forbidden resource',
  })
  @IsString()
  message: string;

  @ApiProperty({
    type: String,
    description: 'error type',
    example: 'Forbidden',
  })
  @IsString()
  error: string;
}
