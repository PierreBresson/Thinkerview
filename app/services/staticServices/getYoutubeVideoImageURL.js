export default getYoutubeVideoImageURL = (youtubeVideoURL='') => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = youtubeVideoURL.match(regExp);
    if (match)
        if (match[7].length == 11) {
            const ID = match[7];
            return "https://img.youtube.com/vi/" + ID + "/0.jpg";
        }
    return false;
};