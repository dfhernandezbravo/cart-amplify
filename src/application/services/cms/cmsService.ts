import CmsService from '@interfaces/cms-service.interface';
import { bffWebInstanceV2 as httpInstance } from '@data-sources/bff-v2/bff-instance';

export const cmsService: CmsService = {
  getParamData: () => {
    const url = `/cms/group/switches`;
    return httpInstance.get(url);
  },
  getCmsView: (view, eventName = 'default') =>
    httpInstance.get(`/cms/views/${view}`, { params: { eventName } }),
};
