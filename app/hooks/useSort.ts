export const customSort = (a: Task, b: Task) => {
  const difficultyOrder = { easy: 1, medium: 2, hard: 3 };

  const difficultyA = difficultyOrder[a.badge as Badge] || 0;
  const difficultyB = difficultyOrder[b.badge as Badge] || 0;

  return difficultyA - difficultyB;
};