/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 */

import React, { useEffect } from "react";
import { MDBNotification } from "mdbreact";
import { useSelector, useDispatch } from "react-redux";
import { hideError } from "../../actions/errorAction";

/**
 * Renders GlobalErrorNotification if an error occurs
 *
 * ### Usage
 *
 * ```
 * import GlobalErrorNotification from './components/GlobalErrorNotification/GlobalErrorNotification';
 * ```
 *
 * @component
 * @category Components
 * @requires react
 * @requires mdbreact
 * @requires 'react-redux'
 * @requires '../../actions/errorAction'
 *
 * @example
 * return (
 *      <GlobalErrorNotification />
 * );
 */
const GlobalErrorNotification = (props) => {
  const { isShow, error } = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isShow) {
      const timer = setTimeout(() => {
        dispatch(hideError());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isShow, dispatch]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1051, // display on the top of the pup up modal
      }}
    >
      {isShow && (
        <MDBNotification
          show
          iconClassName="text-white"
          icon="exclamation-triangle"
          fade
          title="Error"
          titleClassName="bg-danger text-white"
          message={error}
          bodyClassName="text-danger"
        />
      )}
    </div>
  );
};

export default GlobalErrorNotification;
