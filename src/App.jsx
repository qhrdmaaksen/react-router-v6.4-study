import {
  BrowserRouter,
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import BlogLayout from "./pages/BlogLayout";
import BlogPostsPage, { loader as blogPostsLoader } from "./pages/BlogPosts";
import NewPostPage, { action as newPostAction } from "./pages/NewPost";
import PostDetailPage, { loader as blogPostLoader } from "./pages/PostDetail";
import RootLayout from "./pages/RootLayout.jsx";
import WelcomePage from "./pages/Welcome";
import Error from "./pages/Error.jsx";

function App() {
  /*js route 정의 몇가지 사용하기위해 배열 전달
   * jsx 에 라우트 정의한것처럼 createBrowserRouter 함수에 또 다른 함수를 전달할수있음 createRoutesFromElements
   * 이런 식으로 라우트를 설정할 때는 Routes 컴포넌트 대신 단수형인 Route 를 입력해야 해요
   * 다른 라우트들을 자식 라우트로 가지는 하나의 부모 라우트
   * 여기서 장점은 이제 부모 라우트가 다른 라우트를 포함한 레이아웃을 렌더링한다는 겁니다 이 경우 RootLayout 이죠*/

  const router = createBrowserRouter(
    createRoutesFromElements(
      /*부모 라우트 경로가 활성화되어 있다면 인덱스 라우트가 렌더링되는 디폴트 라우트가 됩니다*/
      <Route path="/" element={<RootLayout />} errorElement={<Error />}>
        <Route index element={<WelcomePage />} />
        <Route path="/blog" element={<BlogLayout />}>
          <Route index element={<BlogPostsPage />} loader={blogPostsLoader} />
          <Route
            path=":id"
            element={<PostDetailPage />}
            loader={blogPostLoader}
          />
        </Route>
        {/*newPostAction이라는 별칭을 붙이겠습니다 이걸 action 프로퍼티에 값으로 지정하면
          양식이 제출될 때마다 action 함수가 실행될 겁니다 action을 추가한 라우트에 도달할 테니까요*/}
        <Route
          path="/blog/new"
          element={<NewPostPage />}
          action={newPostAction}
        />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />

    /*BrowserRouter 는 6.4 버전 새 기능 사용시 사용할 수 없음*/
    /*<BrowserRouter>
				<RootLayout>
					<Routes>
						<Route path="/" element={<WelcomePage />} />
						<Route path="/blog" element={<BlogLayout />}>
							<Route index element={<BlogPostsPage />} loader={blogPostsLoader} />
							<Route path=":id" element={<PostDetailPage />} />
						</Route>
						<Route path="/blog/new" element={<NewPostPage />} />
					</Routes>
				</RootLayout>
			</BrowserRouter>*/
  );
}

export default App;
