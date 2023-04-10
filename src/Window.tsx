import { useCallback, useEffect, useRef } from 'react';
import './style.css';
import { AppRoute } from './types';
import { useLocation, matchPath } from 'react-router-dom';

type WindowProps = {
  appCode: string;
  appRoutes: AppRoute[];
  devToolsUrl: string;
  onClose: () => void;
};

function Window({ appCode, appRoutes, devToolsUrl, onClose }: WindowProps) {
  const contentRef = useRef<HTMLIFrameElement>(null);

  const location = useLocation();
  console.log(location);

  const syncRoute = useCallback(() => {
    let route: string | undefined;

    for (const appRoute of appRoutes) {
      if (matchPath(location.pathname, { path: appRoute.urlPattern })) {
        route = appRoute.alias;
        break;
      }
    }

    if (route)
      contentRef.current?.contentWindow?.postMessage(
        { type: 'route-changed', payload: { appCode, route } },
        devToolsUrl
      );
    else
      contentRef.current?.contentWindow?.postMessage({ type: 'route-not-registered', payload: { route } }, devToolsUrl);
  }, [location]);

  const devToolsLoaded = useCallback(() => {
    // Iframe load can be buggy; adding multiple sync calls at different intervals
    syncRoute();
    setTimeout(syncRoute, 200);
    setTimeout(syncRoute, 400);
    setTimeout(syncRoute, 600);
  }, [syncRoute]);

  useEffect(() => {
    syncRoute();
  }, [syncRoute]);

  return (
    <div className="box-window">
      <div className="box-header">
        <span>DevTools</span>
        <button onClick={onClose}>
          <i className="x"></i>
        </button>
      </div>
      <iframe
        title="DevTools"
        ref={contentRef}
        className="box-content"
        onLoad={devToolsLoaded}
        src={`https://developer-tools-five.vercel.app/task-viewer`}
      ></iframe>
    </div>
  );
}

export default Window;
