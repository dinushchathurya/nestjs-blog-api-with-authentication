import { IsNotEmpty } from 'class-validator';

export class CreateBlogDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}