import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UserRole } from '../../shared/enums/role.enum';

@Injectable()
export class UserRoleValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!(value.role in UserRole)) {
            throw new BadRequestException(`${value.role} is not a valid role`)
        }
        return value;
    }
}
