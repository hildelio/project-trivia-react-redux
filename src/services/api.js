export async function getTokenAPI() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const token = await fetch(url);
  const response = await token.json();
  return response;
}

export async function getQuestions(token) {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const questions = await fetch(url);
  const response = await questions.json();
  return response;
}
