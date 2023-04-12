import { useState } from 'react';
import Window from './Window';
import { AppRoute, Tool } from './types';

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
        <button className="box-handle">
          <svg className="tool" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <path
              fill="currentColor"
              d="m8.914 24.5l4.257-4.257l-1.414-1.414L7.5 23.086l-.793-.793a1 1 0 0 0-1.414 0l-4 4a1 1 0 0 0 0 1.414l3 3a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414ZM5 28.586L3.414 27L6 24.414L7.586 26Z"
            />
            <path
              fill="currentColor"
              d="M24 30a6.007 6.007 0 0 1-6-6a5.84 5.84 0 0 1 .21-1.547L9.548 13.79A5.848 5.848 0 0 1 8 14a5.976 5.976 0 0 1-5.577-8.184l.558-1.421l3.312 3.312a1.023 1.023 0 0 0 1.413 0a.999.999 0 0 0 0-1.414L4.395 2.979l1.423-.557A5.977 5.977 0 0 1 14 8a5.84 5.84 0 0 1-.21 1.547l8.663 8.663A5.855 5.855 0 0 1 24 18a5.976 5.976 0 0 1 5.577 8.184l-.557 1.421l-3.313-3.312a1.023 1.023 0 0 0-1.413 0a.999.999 0 0 0-.001 1.414l3.313 3.313l-1.422.558A5.96 5.96 0 0 1 24 30ZM10.062 11.476l10.461 10.461l-.239.61a3.975 3.975 0 0 0 3.466 5.445l-.871-.87a3 3 0 0 1 0-4.243a3.072 3.072 0 0 1 4.243 0l.87.871a3.976 3.976 0 0 0-5.446-3.466l-.609.239l-10.46-10.46l.24-.61A3.975 3.975 0 0 0 8.25 4.008l.87.87a3 3 0 0 1 0 4.243a3.072 3.072 0 0 1-4.243 0l-.87-.871a3.975 3.975 0 0 0 5.445 3.466Z"
            />
            <path
              fill="currentColor"
              d="M29.123 2.85a3.072 3.072 0 0 0-4.243 0l-7.48 7.48l1.414 1.414l7.48-7.48a1.024 1.024 0 0 1 1.414 0a1.002 1.002 0 0 1 0 1.414l-7.48 7.48l1.414 1.415l7.48-7.48a3.003 3.003 0 0 0 0-4.243Z"
            />
          </svg>
        </button>
      )}
      {show && (
        <Window
          devToolsUrl={devToolsUrl}
          startupTool={startupTool}
          appCode={appCode}
          appRoutes={appRoutes}
          onClose={() => setShow(false)}
        />
      )}
    </>
  );
}

export default DeveloperBox;
