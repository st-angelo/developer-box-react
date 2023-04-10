import { useCallback, useEffect, useRef } from 'react';
import './style.css';
import { AppRoute } from './types';
import { useLocation } from 'react-router-dom';

type WindowProps = {
  appCode: string;
  routes: AppRoute[];
  onClose: () => void;
};

function Window({ appCode, routes, onClose }: WindowProps) {
  const contentRef = useRef<HTMLIFrameElement>(null);

  const location = useLocation();
  console.log(location);

  const syncRoute = useCallback(() => {
    // if (route !== '/not-registered')
    contentRef.current?.contentWindow?.postMessage(
      { type: 'route-changed', payload: { appCode, route: location.pathname } },
      'https://developer-tools-five.vercel.app/'
    );
    // else
    //   contentRef.current?.contentWindow?.postMessage(
    //     { type: 'route-not-registered', payload: { route } },
    //     'http://localhost:5173'
    //   );
  }, [location]);

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
        onLoad={syncRoute}
        src={`https://developer-tools-five.vercel.app/task-viewer`}
      ></iframe>
    </div>
  );
}

export default Window;
