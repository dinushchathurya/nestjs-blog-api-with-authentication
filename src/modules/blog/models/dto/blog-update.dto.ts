import { IsNotEmpty } from 'class-validator';

export class UpdateBlogDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}