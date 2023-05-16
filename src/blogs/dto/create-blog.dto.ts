import { IsString,IsNumber, IsOptional } from "class-validator";
export class createBlogDto {
    @IsOptional()
    @IsString()
    readonly message: string;
    @IsOptional()
    @IsString()
    readonly image:Express.Multer.File;
    @IsOptional()
    @IsNumber()
    readonly authorId:number;
}