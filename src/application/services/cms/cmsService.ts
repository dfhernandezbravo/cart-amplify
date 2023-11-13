import { bffWebInstance } from '@data-sources/bbf-web-instance';
import CmsService from '@interfaces/cms-service.interface';

const httpInstance = bffWebInstance;

export const cmsService: CmsService = {
  getParamData: () => {
    const url = `/cms/group/switches`;
    return httpInstance.get(url);
  },
};
