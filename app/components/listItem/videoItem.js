import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import LabelCategory from "../labelCategory";
import config from "../../config";
import _ from "lodash";

class VideoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCategories = categories => {
    const { all_categories } = this.props.categories;
    let categories_name = [];
    if (all_categories && categories) {
      if (all_categories.length && categories.length) {
        categories.map(category => {
          category_found = all_categories.filter(cat => category === cat.id);
          if (category_found)
            if (category_found[0].name != "Interviews")
              categories_name.push(category_found[0].name);
        });
      }
    }
    if (categories_name)
      if (categories_name.length)
        return categories_name.map(category_name => (
          <LabelCategory key={category_name} category={category_name} />
        ));
  };

  // renderImage = () => {
  //   let { img_url, image_offline } = this.props.item;

  //   if (image_offline) {
  //     return (
  //       <Image
  //         style={styles.img}
  //         resizeMode="cover"
  //         source={require(`${image_offline}`)}
  //       />
  //     );
  //   } else {
  //     return (
  //       <Image
  //         style={styles.img}
  //         resizeMode="cover"
  //         source={{ uri: img_url }}
  //       />
  //     );
  //   }
  // };

  render() {
    let { item, onPress, style } = this.props;
    let { title, video_id, categories, img_url } = item;
    if (!title || !video_id || !img_url) return null;

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={{ uri: img_url }}
        />
        <View style={styles.textView}>
          <Text numberOfLines={2} style={styles.text}>
            {_.capitalize(title)}
          </Text>
          <View style={styles.categoriesView}>
            {this.renderCategories(categories)}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: config.colors.silverTwo
  },
  img: {
    height: 76,
    width: 134
  },
  textView: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  text: {
    fontSize: 16,
    fontFamily: config.fonts.bold,
    color: config.colors.black
  },
  categoriesView: {
    flexDirection: "row",
    marginTop: 14
  }
});

const mapStateToProps = state => {
  return { categories: state.categories };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoItem);
