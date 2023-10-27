import { UseAnalytics } from '@entities/analytics';
import WindowsEvents from '@events/index';
import { customDispatchEvent } from '@store/events/dispatchEvents';

export const useAnalytics = () => {
  const methods: UseAnalytics = {
    dispatchAnalyticsEvent: (data) => {
      customDispatchEvent({
        name: WindowsEvents.ANALYTICS,
        detail: {
          ...data,
        },
      });
    },
    sendQuantityClickEvent: (data) => {
      methods.dispatchAnalyticsEvent(data);
    },
  };

  return { methods };
};

export default useAnalytics;
