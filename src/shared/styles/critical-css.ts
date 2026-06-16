export const criticalCss = `
*, *::before, *::after { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
html, body {
  margin: 0;
  padding: 0;
  min-height: 100dvh;
  background: #08040d;
  color: rgba(255, 255, 255, 0.9);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overscroll-behavior: none;
  overflow-x: hidden;
}
button { font-family: inherit; cursor: pointer; }
.nx-layout {
  position: relative;
  margin: 0 auto;
  display: flex;
  min-height: 100dvh;
  width: 100%;
  max-width: min(100%, 430px);
  flex-direction: column;
  overflow: hidden;
  background: #08040d;
  padding-top: env(safe-area-inset-top, 0px);
}
.nx-layout-body { display: flex; min-height: 0; flex: 1; flex-direction: column; }
.nx-welcome { position: relative; display: flex; min-height: 0; flex: 1; flex-direction: column; }
.nx-welcome-content { position: relative; z-index: 10; display: flex; flex-direction: column; gap: 8px; padding: 54px 16px 0; }
.nx-welcome-title { margin: 0; font-size: 38px; font-weight: 900; text-transform: uppercase; line-height: 1; letter-spacing: -0.4px; color: #fff; }
.nx-welcome-subtitle { margin: 0; font-size: 18px; color: #08f; }
.nx-welcome-footer { position: relative; z-index: 20; margin-top: auto; padding: 0 16px 12px; }
.nx-welcome-btn {
  position: relative;
  z-index: 20;
  width: 100%;
  border: none;
  border-radius: 16px;
  background: #000;
  color: #fff;
  padding: 14px 0;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.1px;
}
.nx-starburst {
  pointer-events: none;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  height: 417px;
  overflow: hidden;
}
.nx-starburst img {
  pointer-events: none;
  position: absolute;
  left: -56%;
  top: -23%;
  height: 201%;
  width: 219%;
  max-width: none;
}
.nx-home-indicator {
  pointer-events: none;
  display: flex;
  height: 34px;
  width: 100%;
  flex-shrink: 0;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
}
.nx-home-indicator-bar { height: 5px; width: 139px; border-radius: 999px; background: rgba(255, 255, 255, 0.9); }
`;
