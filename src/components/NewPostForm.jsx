import classes from "./NewPostForm.module.css";
import { Form } from "react-router-dom";

function NewPostForm({ onCancel, onSubmit, submitting }) {
  return (
    /*React Router가 인식하도록 모든 필드를 Form 컴포넌트로 래핑하세요 Form 컴포넌트에 method를 추가해
			get이나 post 뿐만 아니라 patch, put, delete도 가능합니다 저는 post로 하고 action도 정의하겠습니다
			action에는 요청이 전송될 경로를 정의*/
    <Form className={classes.form} method="post" action="/blog/new">
      {/*<form className={classes.form} onSubmit={onSubmit}>*/}
      <fieldset>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required minLength={5} />
      </fieldset>
      <fieldset>
        <label htmlFor="text">Post Text</label>
        <textarea
          id="text"
          name="post-text"
          required
          minLength={10}
          rows={5}
        ></textarea>
      </fieldset>
      <button type="button" onClick={onCancel} disabled={submitting}>
        Cancel
      </button>
      <button disabled={submitting}>
        {submitting ? "Submitting..." : "Create Post"}
      </button>
    </Form>
  );
}

export default NewPostForm;
