import { ParamDataProps } from '@entities/cms/paramData.request';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { cmsService } from '@services/cms/cmsService';

const getParamData = createAsyncThunk(
  '/cart/getParamData',
  async (props: ParamDataProps) => {
    try {
      const { data } = await cmsService.getParamData(props);
      return data;
    } catch (error) {
      console.error(error);
    }
  },
);

export default getParamData;
