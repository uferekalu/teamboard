import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'A valid email address for the new user.',
  })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user (minimum 3 characters).',
  })
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long.' })
  name: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd!',
    description:
      'Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character.',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password too weak. It must contain uppercase, lowercase, number, and special character.',
  })
  password: string;
}
