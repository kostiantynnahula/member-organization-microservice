import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public items: Map<number, Record<string, any>> = new Map();

  getHello(): string {
    return 'Hello World!';
  }
}
