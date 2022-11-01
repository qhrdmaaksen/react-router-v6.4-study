import { useState, useEffect } from 'react';
import {useLoaderData, useParams} from 'react-router-dom';

import BlogPost from '../components/BlogPost';
import { getPost } from '../util/api';

function PostDetailPage() {

  const postData = useLoaderData()


  /*const [error, setError] = useState();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function loadPost() {
      setIsLoading(true);
      try {
        const post = await getPost(id);
        setPost(post);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }

    loadPost();
  }, [id]);*/

  return (
    <>
      <BlogPost title={postData.title} text={postData.body} />
      {/*{isLoading && <p>Loading post...</p>}
      {error && <p>{error.message}</p>}
      {!error && post && <BlogPost title={post.title} text={post.body} />}*/}
    </>
  );
}

export default PostDetailPage;

/*이렇게 게시물 ID를 받으면 getPost 에 전달하고 getPost 가 반환한 데이터 이 경우 프로미스를 다시 return 하세요
그럼 프로미스가 리졸브하는 데이터를 PostDetailPage 에서 사용할 수 있어요 그러면 useLoaderData 로
postData 를 받을 수 있고 postData.title 과 postData.body 까지 가져올 수 있게 됩니다*/
export const loader = ({params})=>{
  const postId = params.id;
  return getPost(postId);
}