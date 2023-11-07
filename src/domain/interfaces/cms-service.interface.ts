import { ParamDataProps } from '@entities/cms/paramData.request';
import { ParamDataResponse } from '@entities/cms/paramData.response';
import { AxiosResponse } from 'axios';

export default interface CmsService {
  getParamData(data: ParamDataProps): Promise<AxiosResponse<ParamDataResponse>>;
}
