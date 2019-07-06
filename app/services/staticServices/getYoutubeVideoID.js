export default (getYoutubeVideoID = (youtubeVideoURL = "") => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  if (!youtubeVideoURL) {
    // for some reason youtubeVideoURL can be null...
    return false;
  }
  const match = youtubeVideoURL.match(regExp);
  if (match) if (match[7].length == 11) return match[7];
  return false;
});
