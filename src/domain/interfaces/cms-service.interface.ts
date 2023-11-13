import { ParamDataResponse } from '@entities/cms/paramData.response';
import { AxiosResponse } from 'axios';

export default interface CmsService {
  getParamData(): Promise<AxiosResponse<ParamDataResponse>>;
}
