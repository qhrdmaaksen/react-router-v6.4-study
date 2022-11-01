import MainNavigation from "../components/MainNavigation.jsx";
import {useRouteError} from "react-router-dom";

const Error = () => {

	/*이런 오류 객체를 발생시키니 React Router 가 useRouteError 훅을 통해
해당 오류 객체를 사용할 수 있게 하는 거죠 그럼 error.message를 입력해서
해당 오류 객체에 대한 메시지를 출력할 수 있습니다*/
	const error = useRouteError()

	return (
			<>
				<MainNavigation />
				<main>
					<h1>에러가 발생하였습니다.</h1>
					<p>{error.message}</p>
				</main>
			</>
	)
}

export default Error;