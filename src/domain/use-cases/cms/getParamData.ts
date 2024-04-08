import { cmsService } from '@services/cms/cmsService';
import getInstanceHttp from '@use-cases/cart/get-instance-http';

const getParamData = async () => {
  try {
    const { data } = await cmsService(getInstanceHttp()).getParamData();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getParamData;
