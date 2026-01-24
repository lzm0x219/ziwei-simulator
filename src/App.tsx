import { ConfigProvider, App as AntdApp } from "antd";
import { createGlobalStyle } from "antd-style";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import Simulator from "./components/Simulator";
import SimulatorSetting from "./components/SimulatorSetting";
import { RenderContainer } from "./hooks/useRender";
import { RuntimeContainer } from "./hooks/useRuntime";
import { SimulatorContainer } from "./hooks/useSimulator";

const GlobalStyle = createGlobalStyle`
  /* @font-face {
    font-family: 'Source Han Serif VF';
    src: url('/fonts/Source Han Serif CN VF.tff.woff2') format('woff2');
    font-display: block;
  } */

  @font-face {
    font-family: 'Source Han Serif VF';
    src: url('/fonts/SourceHanSerifCN-Light.woff2') format('woff2');
    font-weight: 300;
    font-style: light;
    font-display: block;
  }

  @font-face {
    font-family: 'Source Han Serif VF';
    src: url('/fonts/SourceHanSerifCN-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: 'Source Han Serif VF';
    src: url('/fonts/SourceHanSerifCN-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: medium;
    font-display: block;
  }


  @font-face {
    font-family: 'Source Han Serif VF';
    src: url('/fonts/SourceHanSerifCN-SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-style: SemiBold;
    font-display: block;
  }

  @font-face {
    font-family: 'Source Han Serif VF';
    src: url('/fonts/SourceHanSerifCN-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: Bold;
    font-display: block;
  }


  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    overscroll-behavior: none;
    user-select: none;
    font-synthesis: style;
    -webkit-font-smoothing: antialiased;
    font-weight: 600;
  }

  .ant-app {
    display: flex;
    height: 100%;
  }
`;

export default function App() {
  return (
    <SimulatorContainer.Provider>
      <RuntimeContainer.Provider>
        <RenderContainer.Provider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#000",
                fontFamily: "'Source Han Serif VF', serif",
              },
            }}
          >
            <AntdApp>
              <GlobalStyle />
              <ErrorBoundary
                fallbackRender={({ error }) => <div>Error: {getErrorMessage(error)}</div>}
              >
                <Simulator side={660} />
                <SimulatorSetting />
              </ErrorBoundary>
            </AntdApp>
          </ConfigProvider>
        </RenderContainer.Provider>
      </RuntimeContainer.Provider>
    </SimulatorContainer.Provider>
  );
}
