import { bffWebInstanceV1 } from '@data-sources/v1/bff-instance';
import { bffWebInstanceV2 } from '@data-sources/v2/bff-instance';

export default function getInstanceHttp() {
  const isHeadless = sessionStorage.getItem('isHeadless');
  return isHeadless ? bffWebInstanceV2 : bffWebInstanceV1;
}
