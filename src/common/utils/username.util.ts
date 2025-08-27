export function generateRandomName(): string {
  const adjectives = [
    'Fast',
    'Smart',
    'Happy',
    'Crazy',
    'Silent',
    'Red',
    'Blue',
  ];
  const animals = [
    'Tiger',
    'Elephant',
    'Eagle',
    'Fox',
    'Wolf',
    'Shark',
    'Lion',
  ];

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(Math.random() * 1000);

  return `${adj}${animal}${number}`;
}
