export const camelCaseToNormal = (textInCamelCase: string) => {
  const splittedWords = textInCamelCase.split(/(?=[A-Z])/);

  const normalText = splittedWords.map(word => `${word[0].toUpperCase()}${word.slice(1, word.length)}`).join(' ');

  return normalText;
};
