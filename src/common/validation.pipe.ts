import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { type } from 'os';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        if(!metatype || !this.toValidate(metadata)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if(errors.length > 0) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }

    private toValidate(medatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find(type => medatype === type);
    }
}