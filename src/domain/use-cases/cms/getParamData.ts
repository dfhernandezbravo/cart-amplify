import { cmsService } from '@services/cms/cmsService';

const getParamData = async () => {
  try {
    const { data } = await cmsService.getParamData();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getParamData;
