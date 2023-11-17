import { UseAnalytics } from '@entities/analytics';
import WindowsEvents from '@events/index';
import { customDispatchEvent } from '@store/events/dispatchEvents';
import { useAppSelector } from './storeHooks';

export const useAnalytics = () => {
  const { hasHybridation } = useAppSelector((state) => state.cart);

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
      // Híbrido cart headless/vtex
      if (hasHybridation) {
        window.parent.postMessage(
          { ANALYTICS_MINICART_HYBRIDATION: data },
          '*',
        );
      }
    },
    sendPageviewVirtualEvent: (data) => {
      methods.dispatchAnalyticsEvent(data);
    },
  };

  return { methods };
};

export default useAnalytics;
