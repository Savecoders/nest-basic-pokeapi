import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';
import { FetcherAdapter } from './adapters/fetch.adapter';

@Module({
  providers: [AxiosAdapter, FetcherAdapter],
  exports: [AxiosAdapter, FetcherAdapter],
})
export class CommonModule {}
