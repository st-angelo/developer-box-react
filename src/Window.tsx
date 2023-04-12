import { useCallback, useEffect, useRef } from 'react';
import './style.css';
import { AppRoute, Tool } from './types';
import { useLocation, matchPath } from 'react-router-dom';
import { Events, DevToolsMessageEvent } from 'developer-tools-common-language';

const toolXPath = {
  Default: '',
  TaskViewer: 'task-viewer'
};

type WindowProps = {
  devToolsUrl: string;
  startupTool: Tool;
  appCode: string;
  appRoutes: AppRoute[];
  onClose: () => void;
};

function Window({ devToolsUrl, startupTool, appCode, appRoutes, onClose }: WindowProps) {
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
        { type: Events.TaskViewer.ParentRouteChanged, payload: { appCode, route } },
        devToolsUrl
      );
    else
      contentRef.current?.contentWindow?.postMessage(
        { type: Events.TaskViewer.RouteNotConfigured, payload: { route: location.pathname } },
        devToolsUrl
      );
  }, [location]);

  useEffect(() => {
    function handleDevToolsMessage({ origin, data }: DevToolsMessageEvent) {
      if (origin !== devToolsUrl || !data) return;
      if (data.type === Events.TaskViewer.Loaded) syncRoute();
    }

    syncRoute();

    window.addEventListener('message', handleDevToolsMessage);
    return function () {
      window.removeEventListener('message', handleDevToolsMessage);
    };
  }, [syncRoute]);

  return (
    <div className="box-window">
      <div className="box-header">
        <div className="box-header__brand">
          <div className="brand-circle__outer">
            <div className="brand-circle__inner" />
          </div>
          <h1 className="brand-title">DevTools</h1>
        </div>
        <button onClick={onClose} className="box-header__close">
          <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
            <path
              fill="currentColor"
              d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"
            />
          </svg>
        </button>
      </div>
      <iframe
        title="DevTools"
        ref={contentRef}
        className="box-content"
        src={`${devToolsUrl}/${toolXPath[startupTool]}`}
      ></iframe>
    </div>
  );
}

export default Window;
