import { Transform } from 'class-transformer'
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator'

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value

export class CreateContactDto {
  @Transform(trim)
  @IsString()
  @Length(2, 100, { message: 'Please enter your name.' })
  name!: string

  @Transform(trim)
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @MaxLength(254)
  email!: string

  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(150)
  subject?: string

  @Transform(trim)
  @IsString()
  @Length(10, 5000, {
    message: 'Please write a message of at least 10 characters.',
  })
  message!: string

  /**
   * Honeypot. The form hides this field, so a real visitor never fills it —
   * anything here is a bot and the submission is dropped without sending.
   */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  company?: string
}
