import { Route, Routes } from 'react-router-dom';

import NewEngagementInstanceScreen from '../../screens/newEngagementInstance/NewEngagementInstanceScreen';
import PageNotFound from '../404/404';

const AppContent = () => {
  return (
    <Routes>
      {/* root path route */}
      <Route path="/" element={<NewEngagementInstanceScreen key={1} />} />
      <Route path="/:newEngagementInstanceId" element={<NewEngagementInstanceScreen key={2} />} />

      {/* any other route results in 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppContent;
