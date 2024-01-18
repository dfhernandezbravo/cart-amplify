import { bffWebInstanceV2 } from '@data-sources/v2/bff-instance';
import CmsService from '@interfaces/cms-service.interface';

const httpInstance = bffWebInstanceV2;

export const cmsService: CmsService = {
  getParamData: () => {
    const url = `/cms/group/switches`;
    return httpInstance.get(url);
  },
};
