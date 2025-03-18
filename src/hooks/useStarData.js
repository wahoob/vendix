const useStarData = (reviews, totalStars = 5) => {
  const totalReviews = reviews.length;
  const stars = Array.from({ length: totalStars }, () => 0);

  reviews.forEach(({ rating }) => {
    stars[totalStars - rating]++;
  });

  return stars.map((count, index) => ({
    star: (totalStars - index).toFixed(1),
    count,
    percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0,
  }));
};

export default useStarData;
