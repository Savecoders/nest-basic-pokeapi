import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // metadata is an object that contains the value and the metadata of the value
    // metadata = {
    //   value: '65dcf222810c0ff073161f12',
    //   metadata: { metatype: [Function: String], type: 'param', data: 'id' }
    // }

    if (!isValidObjectId(value)) {
      throw new BadRequestException(
        `${value} is not a valid MongoDB ObjectId.`,
      );
    }
    return value;
  }
}
