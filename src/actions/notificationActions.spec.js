import { DISMISS_NOTIFICATION } from './actionTypes';
import { dismissNotification } from './notificationActions';


describe('Notification actions', () => {
  describe('dismissNotification', () => {
    it('should create DISMISS_NOTIFICATION', () => {
      expect(dismissNotification()).toEqual({
        type: DISMISS_NOTIFICATION
      });
    });
  });
});
