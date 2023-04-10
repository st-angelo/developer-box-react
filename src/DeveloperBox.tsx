import { useState } from 'react';
import Window from './Window';
import { AppRoute } from './types';

type DeveloperBoxProps = {
  appCode: string;
  routes: AppRoute[];
};

function DeveloperBox({ appCode, routes }: DeveloperBoxProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      {!show && (
        <button className="box-handle" onClick={() => setShow(true)}>
          <i className="plus"></i>
        </button>
      )}
      {show && <Window appCode={appCode} routes={routes} onClose={() => setShow(false)} />}
    </>
  );
}

export default DeveloperBox;
