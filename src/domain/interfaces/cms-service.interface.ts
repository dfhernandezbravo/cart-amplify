import { ParamDataResponse } from '@entities/cms/paramData.response';
import { AxiosResponse } from 'axios';
import { GetCmsViewsResponse } from '@entities/cms/getCmsViews.response';

export default interface CmsService {
  getParamData(): Promise<AxiosResponse<ParamDataResponse>>;
  getCmsView: (view: string) => Promise<AxiosResponse<GetCmsViewsResponse>>;
}
