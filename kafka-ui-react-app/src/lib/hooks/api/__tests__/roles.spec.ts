import fetchMock from 'fetch-mock';
import { expectQueryWorks, renderQueryHook } from 'lib/testHelpers';
import { useGetUserInfo } from 'lib/hooks/api/roles';

const userInfoPath = '/api/authorization';

describe('Roles hooks', () => {
  beforeEach(() => fetchMock.removeRoutes().clearHistory());
  describe('useGetUserInfo', () => {
    it('returns the correct data', async () => {
      const mock = fetchMock.getOnce(userInfoPath, { rbacEnabled: false });
      const { result } = renderQueryHook(() => useGetUserInfo());
      await expectQueryWorks(mock, result);
    });
  });
});
