import { bffWebInstance } from '@data-sources/bbf-web-instance';
import { ParamDataProps } from '@entities/cms/paramData.request';
import CmsService from '@interfaces/cms-service.interface';

const httpInstance = bffWebInstance;

export const cmsService: CmsService = {
  getParamData: (data: ParamDataProps) => {
    const url = `/cms/group/${data.groupName}/${data.paramName}`;
    return httpInstance.get(url);
  },
};
