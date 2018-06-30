export default getYoutubeVideoID = (youtubeVideoURL='') => {    
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = youtubeVideoURL.match(regExp);
    if (match)
        if (match[7].length == 11)
            return match[7];
    return false;
};