import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import LabelCategory from "../labelCategory";
import config from "../../config";
import _ from "lodash";

class VideoItemFeatured extends React.Component {
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

  render() {
    let { item, onPress, style } = this.props;
    let { title, img_url, video_id, categories } = item;

    if (!title || !video_id) return null;

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <View style={styles.imgView}>
          <View style={styles.categoriesView}>
            {this.renderCategories(categories)}
          </View>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={{ uri: img_url ? img_url : "" }}
          />
        </View>
        <View style={styles.textView}>
          <Text numberOfLines={2} style={styles.text}>
            {_.capitalize(title)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingBottom: 14,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: config.colors.silverTwo
  },
  imgView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    height: 200
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  textView: {
    flex: 1
  },
  text: {
    fontSize: 20,
    fontFamily: config.fonts.bold
  },
  categoriesView: {
    flexDirection: "row",
    // zIndex: 1,
    position: "absolute",
    bottom: 10,
    left: 8
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
)(VideoItemFeatured);
