import { createAsyncThunk } from '@reduxjs/toolkit';
import { cmsService } from '@services/cms/cmsService';

const getParamData = createAsyncThunk('/cart/getParamData', async () => {
  try {
    const { data } = await cmsService.getParamData();
    return data;
  } catch (error) {
    console.error(error);
  }
});

export default getParamData;
