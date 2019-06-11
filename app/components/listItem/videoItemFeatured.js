import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import config from "../../config";
import { connect } from "react-redux";
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
            if (category_found[0])
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
    const { item, onPress, style } = this.props;
    let { title, img_url, video_id, categories } = item;

    if (!title || !video_id || !img_url) return null;

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <View style={styles.textView}>
          <View style={styles.categoriesView}>
            {this.renderCategories(categories)}
          </View>
          <Text numberOfLines={2} style={styles.text}>
            {_.capitalize(title)}
          </Text>
        </View>
        <View style={styles.imgView}>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={{ uri: img_url }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    ...config.styles.container
  },
  imgView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    height: 200
  },
  img: {
    borderRadius: 4,
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
    marginTop: 2,
    fontSize: 18,
    fontFamily: config.fonts.bold,
    color: config.colors.black,
    paddingBottom: 8
  },
  categoriesView: {
    flexDirection: "row"
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
