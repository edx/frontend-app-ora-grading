import { StrictDict } from 'utils';

import actions from 'data/actions';
import api from 'data/services/lms/api';

const locationId = window.location.pathname.slice(1);

/**
 * initialize the app, loading ora and course metadata from the api, and loading the initial
 * submission list data.
 */
export const initialize = () => (dispatch) => (
  api.initializeApp(locationId).then((response) => {
    console.log({ response });
    dispatch(actions.app.loadOraMetadata(response.oraMetadata));
    dispatch(actions.app.loadCourseMetadata(response.courseMetadata));
    dispatch(actions.submissions.loadList(response.submissions));
  })
);

export default StrictDict({ initialize });
