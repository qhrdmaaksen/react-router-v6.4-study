import { useEffect, useState } from 'react';

import Posts from '../components/Posts';
import { getPosts } from '../util/api';
import {useLoaderData} from "react-router-dom";

function BlogPostsPage() {
  /*react-router-dom 이 제공하는 useLoaderData 훅이죠 이 훅은 loaderData 에 액세스할 수 있게 만들고
loader 함수에 의해 데이터가 반환됩니다 만약 loader 함수가 프로미스를 반환한다면
프로미스가 리졸브하게 되는 데이터를 말하는 거예요 지금 같은 경우 api.js 요청에 대한 응답이 반환한 데이터죠*/
  const loadData = useLoaderData()


  /*const [error, setError] = useState();
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }

    loadPosts();
  }, []);*/

  return (
    <>
      <h1>Our Blog Posts</h1>
      <Posts blogPosts={loadData} />
      {/*{isLoading && <p>Loading posts...</p>}
      {error && <p>{error}</p>}
      {!error && posts && <Posts blogPosts={posts} />}*/}
    </>
  );
}

export default BlogPostsPage;

// getPosts 가 반환하는 프로미스를 loader 함수가 반환하게 됨
export const loader = () => {
  return getPosts();
}