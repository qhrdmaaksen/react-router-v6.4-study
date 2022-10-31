/*게시물을 가져오는 HTTP 요청을 생성 및 전송하고 게시물을 성공적으로 가져왔는지 검사하며
그렇지 않을 경우 커스텀 오류 객체를 발생시킵니다 성공적일 경우 JSON 데이터로 리졸브하는 프로미스를 반환하죠
응답의 일부로 반환함*/
export async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw { message: 'Failed to fetch posts.', status: 500 };
  }
  return response.json();
}

export async function getPost(id) {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts/' + id
  );
  if (!response.ok) {
    throw { message: 'Failed to fetch post.', status: 500 };
  }
  return response.json();
}

export async function savePost(post) {
  if (post.title.trim().length < 5 || post.body.trim().length < 10) {
    throw { message: 'Invalid input data provided.', status: 422 };
  }

  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw { message: 'Could not save post.', status: 500 };
  }
}
