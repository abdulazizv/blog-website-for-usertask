import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;

	@IsString({ message: 'Не ук азан пароль' })
	password: string;

	@IsString({ message: 'Не указано имя' })
	name: string;
}