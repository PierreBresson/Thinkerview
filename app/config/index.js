import icons from "./icons";
import images from "./images";
import colors from "./colors";
import strings from "./strings";
import fonts from "./fonts";
import urls from "./urls";
import privateKeys from "./privateKeys";

export default {
  interview_category_id: 9,
  articlesPerPage: "25",
  icons: icons,
  images: images,
  colors: colors,
  fonts: fonts,
  strings: strings,
  urls: urls,
  privateKeys: privateKeys,
  styles: {
    container: {
      flex: 1,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: colors.backgroundColor
    },
    containerNoPadding: {
      flex: 1,
      backgroundColor: colors.backgroundColor
    }
  }
};

/* Inside privateKeys.js */

// const privateKeys = {
//   youtube_api_token: ""
// };

// export default privateKeys;
