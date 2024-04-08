import { Content } from '@entities/cms/getCmsViews.response';
import { cmsService } from '@services/cms/cmsService';
import getInstanceHttp from '@use-cases/cart/get-instance-http';

async function getContentViewCms(view: string): Promise<Content[] | null> {
  try {
    const { data } = await cmsService(getInstanceHttp()).getCmsView(view);
    const content = data?.content;
    if (content) return content;
    else return null;
  } catch (error) {
    return null;
  }
}

export default getContentViewCms;
