const API_ENDPOINT = `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev`;

const request = async (nodeId) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/${nodeId ? nodeId : ''}`);

    if (!response.ok) {
      throw new Error('서버 상태가 불안정합니다...');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`에러가 발생했습니다: ${error.message}`)
  }
}