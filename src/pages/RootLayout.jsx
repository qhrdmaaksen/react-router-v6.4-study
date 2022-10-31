import MainNavigation from "../components/MainNavigation.jsx";
import { Outlet } from "react-router-dom";

function RootLayout({ children }) {
  return (
    <>
      <MainNavigation />
      {/*RootLayout 이 자식 라우트를 지원하기 위해서는 RootLayout.jsx 로 가야 하는데 원한다면 pages 폴더로 옮긴 후
				그보다 중요한 건 children 부분을 제거하는 대신 react-router-dom 이 제공하는 특수 컴포넌트 Outlet 을 사용해
				중첩된 모든 자식 컴포넌트가 렌더링되어야 하는 위치를 표시해야 해요*/}
      {/*루트 Route 안에 정의된 모든 컴포넌트 즉 지금 선택한 컴포넌트들이 여기에 렌더링되도록 Outlet 컴포넌트로 정의*/}
      <Outlet />
      {/*<main>{children}</main>*/}
    </>
  );
}

export default RootLayout;
