import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject } from 'class-validator';

export class responseDTO {
  @ApiProperty({
    example: true,
    description: 'tell about status of order',
    type: Boolean,
  })
  @IsBoolean()
  success: boolean;

  @ApiProperty({
    type: Object,
  })
  @IsObject()
  data: Object;
}
