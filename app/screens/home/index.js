import React from "react";
import {
  ActivityIndicator,
  Text,
  View,
  SectionList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import {
  interviewsFetcher,
  selectArticle,
  categoriesFetcher,
  selectCategory,
  categoryModalAction
} from "../../actions";
import IconEntypo from "react-native-vector-icons/Entypo";
import VideoItem from "../../components/listItem/videoItem";
import CategoryModal from "../../components/categoryModal";
import config from "../../config";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  componentDidMount() {
    this.props.interviewsFetcher(
      this.state.page,
      this.props.categories.categorySelected.id
    );
    this.props.categoriesFetcher();
  }

  renderIntro = () => {
    let { categoryModalOpen, categorySelected } = this.props.categories;
    return (
      <TouchableOpacity
        style={styles.headerView}
        onPress={() => {
          this.props.categoryModalAction();
        }}
      >
        <Text style={styles.header}>{categorySelected.name}</Text>
        <IconEntypo
          name={
            categoryModalOpen
              ? "chevron-with-circle-up"
              : "chevron-with-circle-down"
          }
          size={40}
          color={config.colors.thinkerGreen}
          style={styles.iconShare}
        />
      </TouchableOpacity>
    );
  };

  renderActivityIndicator = () => {
    if (!this.props.interviews.isFetchingInterviews) return <View />;
    return (
      <View>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  };

  renderItem = (item, index) => {
    return (
      <VideoItem
        key={index}
        item={item}
        onPress={() => {
          this.props.selectArticle(item);
          this.props.navigation.navigate("Article");
        }}
      />
    );
  };

  render() {
    let {
      errorFetchingInterviews,
      data,
      isFetchingInterviews
    } = this.props.interviews;
    return (
      <View style={config.styles.containerNoPadding}>
        <CategoryModal />
        <SectionList
          refreshing={false}
          onRefresh={() => {
            this.props.interviewsFetcher(
              this.state.page,
              this.props.categories.categorySelected.id
            );
          }}
          sections={[
            {
              data: [1],
              keyExtractor: (item, index) => index,
              renderItem: (item, index) => this.renderIntro()
            },
            {
              data: [1],
              keyExtractor: (item, index) => index,
              renderItem: (item, index) => this.renderActivityIndicator()
            },
            {
              data: [1],
              keyExtractor: (item, index) => index,
              renderItem: (item, index) => {
                return (
                  <View style={styles.errorView}>
                    <Text style={styles.error}>
                      {errorFetchingInterviews
                        ? config.strings.errorLoading
                        : ""}
                    </Text>
                  </View>
                );
              }
            },
            {
              data: data ? data : "",
              keyExtractor: (item, index) => item.id,
              renderItem: (item, index) =>
                isFetchingInterviews ? (
                  <View />
                ) : (
                  this.renderItem(item.item, item.id)
                )
            }
          ]}
        />
      </View>
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
    fontSize: 24,
    fontFamily: config.fonts.titleFont,
    paddingBottom: 6,
    paddingRight: 6,
    color: config.colors.blackTorn
  },
  errorView: {
    flex: 1,
    alignItems: "center"
  },
  error: {
    fontSize: 14,
    fontFamily: config.fonts.bodyFont
  }
});

const mapStateToProps = state => {
  return { interviews: state.interviews, categories: state.categories };
};

const mapDispatchToProps = dispatch => {
  return {
    selectArticle: article => dispatch(selectArticle(article)),
    interviewsFetcher: (page, category_id) =>
      dispatch(interviewsFetcher(page, category_id)),
    categoriesFetcher: () => dispatch(categoriesFetcher()),
    selectCategory: category => dispatch(selectCategory(category)),
    categoryModalAction: () => dispatch(categoryModalAction())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
