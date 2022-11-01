import { useState } from "react";
import {redirect, useActionData, useNavigate, useNavigation} from "react-router-dom";

import NewPostForm from "../components/NewPostForm";
import { savePost } from "../util/api";

function NewPostPage() {
  /*const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();*/
  const navigate = useNavigate();

  /*같은 페이지에 머물 때 반환된 데이터에 액세스하기 위해서는 useActionData 훅을 사용합니다
    React Router가 제공하는 이 훅을 사용하면 오류 데이터 등 액션이 반환하는 어떤 종류의 데이터든
    UI에서 사용할 수 있어요 데이터가 설정됐는지 확인하고 설정된 데이터가 오류 상태인지 확인하면
    오류가 일어났는지 알 수 있겠죠*/
  const errors = useActionData();

  const navigation = useNavigation()

  /*async function submitHandler(event) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(event.target);
      const post = {
        title: formData.get("title"),
        body: formData.get("post-text"),
      };
      await savePost(post);
      navigate("/");
    } catch (err) {
      setError(err);
    }
    setIsSubmitting(false);
  }*/

  function cancelHandler() {
    navigate("/blog");
  }

  return (
    <>
      {/*error 가 존재하며 errors.status 가 있다면 throw 로 설정한 message 출력*/}
      {errors ?.status && <p>{errors.message}</p>}

      {/*error && <p>{error.message}</p>}*/}

      <NewPostForm onCancel={cancelHandler} submitting={navigation.state === 'submitting'} />
      {/*<NewPostForm
        onCancel={cancelHandler}
        onSubmit={submitHandler}
        submitting={isSubmitting}
      />*/}
    </>
  );
}

export default NewPostPage;
/*양식이 제출될 때마다 action 함수가 실행되고 특정 데이터로 자동으로 생성된 객체를 가지게 될 겁니다
필요하다면 params도 가지지만 request 객체를 가지겠죠*/
/*자동으로 생성된 request 객체가 브라우저를 떠나지 않았어요 우리가 아직 브라우저 상에 있는 거니깐 중요합니다
자동으로 생성된 request 객체가 양식으로 제출된 데이터를 포함하고 있으니 양식의 입력값으로 지정된 이름을 이용해 데이터를 추출할 수 있어요
이름이 중요한 거죠 원래처럼 ref나 양방향 바인딩을 통해 양식에서 데이터를 직접 추출할 필요 없이 name 속성과
자동으로 생성된 요청의 일부인 자동으로 생성된 양식 제출 객체를 이용하면 됩니다*/
export const action = async ({ request }) => {
  /*생성된 기본 request 객체에 내장되어 있는 formData 메서드가 양식의 일부였던 데이터에 액세스할 수 있도록 합니다
이걸 formData로 설정하세요 이제 post 객체를 생성하고 title 프로퍼티를 추가해 formData.get('title')에 액세스합니다
get 메서드는 formData 객체가 지원하는 메서드로 formData 객체는 대기 후 formData 메서드가 반환하는 객체죠
모두 디폴트 브라우저 API로 React Router가 활용하는 기본 request 객체의 일부예요*/
  const formData = await request.formData();

  const post = {
    /*이렇게 title 값을 받기 위해 양식에 정의한 이름을 값으로 전달한 겁니다 title이라는 이름이죠
      만약 메인 텍스트를 입력하려면 해당하는 이름인 post-text를 전달해야 해요
     *body를 식별자로 사용하는 이유는 나중에 api.js에서 입력값의 유효성을 검사할 때 사용하고 더미 백엔드 API가 받을 예정이기 때문*/
    title: formData.get("title"),
    body: formData.get("post-text"),
  };
  /*try-catch 블록으로 래핑하겠습니다 문제가 생길 수 있기 때문이에요 savePost를 살펴보면 유효성 검사에 실패하거나
      요청 전송에 문제가 생기면 오류를 발생시키죠 따라서 여기서 err를 받게 되면 error.status가 422인지 확인해서
      유효성 검사 오류인지 알 수 있습니다*/
  try {
    await savePost(post);
  } catch (error) {
    if (error.status === 422) {
      /*throw 대신 return을 하면 같은 페이지에 머물면서 리디렉션 되지 않고 오류 페이지를 로딩하지 않겠죠*/
      return error;
    }
    throw error;
  }
  //redirect 메서드를 호출하면 다른 페이지로 이동하도록 브라우저를 트리거하는 응답을 생성하죠
  return redirect("/blog");
};
