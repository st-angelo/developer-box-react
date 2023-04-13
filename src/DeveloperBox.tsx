import { useState } from 'react';
import Window from './Window';
import { AppRoute, Tool } from './types';
import { CSSTransition } from 'react-transition-group';
import './style.css';
import { Tools2 } from './Icons';

type DeveloperBoxProps = {
  devToolsUrl: string;
  startupTool?: Tool;
  appCode: string;
  appRoutes: AppRoute[];
};

function DeveloperBox({ devToolsUrl, startupTool = 'Default', appCode, appRoutes }: DeveloperBoxProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      {!show && (
        <button className="box-handle" onClick={() => setShow(true)}>
          <Tools2 />
        </button>
      )}
      <CSSTransition in={show} timeout={200} classNames={'window'} mountOnEnter unmountOnExit appear>
        <Window
          devToolsUrl={devToolsUrl}
          startupTool={startupTool}
          appCode={appCode}
          appRoutes={appRoutes}
          onClose={() => setShow(false)}
        />
      </CSSTransition>
    </>
  );
}

export default DeveloperBox;
