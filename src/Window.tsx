import { useCallback, useEffect, useRef } from 'react';
import './style.css';
import { AppRoute, Tool } from './types';
import { useLocation, matchPath } from 'react-router-dom';
import { Events, DevToolsMessageEvent } from 'developer-tools-common-language';
import { Tools1, X } from './Icons';

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

  const syncRoute = useCallback(() => {
    let route: string | undefined;
    for (const appRoute of appRoutes) {
      if (matchPath(location.pathname, { path: appRoute.urlPattern, exact: true })) {
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
          <Tools1 />
          <h1 className="brand-title">DevTools</h1>
        </div>
        <button onClick={onClose} className="box-header__close">
          <X />
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
