export const transformString = (
  string: string,
  stringType: 'kebab-case' | 'camel-case' | 'snake-case' = 'camel-case'
) => {
  let splittedWords;

  switch (stringType) {
    case 'kebab-case':
      splittedWords = string.split('-');
      break;

    case 'camel-case':
      splittedWords = string.split(/(?=[A-Z])/);
      break;

    case 'snake-case':
      splittedWords = string.split('_');
      break;
  }

  const normalText = splittedWords.map(word => `${word[0].toUpperCase()}${word.slice(1, word.length)}`).join(' ');

  return normalText;
};
