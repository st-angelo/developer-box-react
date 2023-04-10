import { useState } from 'react';
import Window from './Window';
import { AppRoute } from './types';

type DeveloperBoxProps = {
  appCode: string;
  appRoutes: AppRoute[];
  devToolsUrl: string;
};

function DeveloperBox({ appCode, appRoutes, devToolsUrl }: DeveloperBoxProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      {!show && (
        <button className="box-handle" onClick={() => setShow(true)}>
          <i className="plus"></i>
        </button>
      )}
      {show && (
        <Window appCode={appCode} appRoutes={appRoutes} devToolsUrl={devToolsUrl} onClose={() => setShow(false)} />
      )}
    </>
  );
}

export default DeveloperBox;
