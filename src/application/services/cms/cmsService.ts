import { bffWebInstanceV2 } from '@data-sources/bff-v2/bff-instance';
import CmsService from '@interfaces/cms-service.interface';

export const cmsService = (httpInstance = bffWebInstanceV2): CmsService => ({
  getParamData: () => {
    const url = `/cms/group/switches`;
    return httpInstance.get(url);
  },
  getCmsView: (view, eventName = 'default') =>
    httpInstance.get(`/cms/views/${view}`, { params: { eventName } }),
});
