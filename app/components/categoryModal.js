import React from "react";
import {
  Modal,
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import {
  categoryModalAction,
  categoriesFetcher,
  interviewsFetcher,
  selectCategory,
  resetInterviewsFetcher
} from "../actions";
import CategoryItem from "./listItem/categoryItem";
import Button from "./button";
import Ionicons from "react-native-vector-icons/Ionicons";
import config from "../config";

class CategoryModal extends React.Component {
  constructor(props) {
    super(props);
  }

  renderItem = (item, index) => {
    if (item.id === config.interview_category_id) return null;
    return (
      <CategoryItem
        item={item}
        onPress={() => {
          this.props.selectCategory(item);
          this.props.categoryModalAction();
          this.props.resetInterviewsFetcher();
          this.props.interviewsFetcher(item.id);
        }}
      />
    );
  };

  renderIntro = () => {
    return (
      <TouchableOpacity
        style={styles.headerView}
        onPress={() => this.props.categoryModalAction()}
      >
        <Text style={styles.header}>{config.strings.categoryModal.header}</Text>
        <Ionicons
          name={"ios-close-circle-outline"}
          size={40}
          color={config.colors.thinkerGreen}
          style={styles.iconShare}
        />
      </TouchableOpacity>
    );
  };

  renderError = () => {
    const { errorFetchingCategories } = this.props.categories;

    if (errorFetchingCategories) {
      return (
        <View style={styles.errorView}>
          <Text style={styles.error}>{config.strings.errorLoading}</Text>
          <Button
            message={config.strings.tryAgain}
            iconName={"refresh"}
            onPress={this.props.categoriesFetcher()}
          />
        </View>
      );
    }

    return null;
  };

  render() {
    let {
      categoryModalOpen,
      isFetchingCategories,
      all_categories
    } = this.props.categories;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={categoryModalOpen}
        onRequestClose={() => {}}
      >
        <SectionList
          style={config.styles.containerNoPadding}
          refreshing={isFetchingCategories}
          sections={[
            {
              data: [1],
              keyExtractor: (item, index) => index,
              renderItem: (item, index) => this.renderIntro()
            },
            {
              data: [1],
              keyExtractor: (item, index) => index,
              renderItem: (item, index) => this.renderError()
            },
            {
              data: all_categories ? all_categories : "",
              keyExtractor: (item, index) => item.id,
              renderItem: (item, index) =>
                isFetchingCategories ? (
                  <View />
                ) : (
                  this.renderItem(item.item, item.index)
                )
            }
          ]}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20
  },
  header: {
    fontSize: 28,
    fontFamily: config.fonts.titleFont,
    paddingBottom: 6,
    paddingRight: 6,
    color: config.colors.blackTorn
  },
  errorView: {
    flex: 1,
    paddingTop: 10,
    marginHorizontal: 10
  },
  error: {
    fontSize: 14,
    fontFamily: config.fonts.bodyFont,
    textAlign: "center"
  }
});

const mapStateToProps = state => {
  return { categories: state.categories };
};

const mapDispatchToProps = dispatch => {
  return {
    selectCategory: category => dispatch(selectCategory(category)),
    categoryModalAction: () => dispatch(categoryModalAction()),
    categoriesFetcher: () => dispatch(categoriesFetcher()),
    interviewsFetcher: category_id => dispatch(interviewsFetcher(category_id)),
    resetInterviewsFetcher: () => dispatch(resetInterviewsFetcher())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryModal);
