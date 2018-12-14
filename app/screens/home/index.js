import React from "react";
import {
  Platform,
  ActivityIndicator,
  Text,
  View,
  SectionList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import {
  interviewsFetcher,
  selectArticle,
  categoriesFetcher,
  selectCategory,
  categoryModalAction,
  resetInterviewsFetcher,
  interviewsScrollToTop
} from "../../actions";
import IconEntypo from "react-native-vector-icons/Entypo";
import VideoItem from "../../components/listItem/videoItem";
import VideoItemFeatured from "../../components/listItem/videoItemFeatured";
import CategoryModal from "../../components/categoryModal";
import config from "../../config";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.interviews.shouldScrollToTop) {
      this.props.interviewsScrollToTop();
      this.sectionList.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0
      });
    }
    return true;
  }

  componentDidMount() {
    this.props.interviewsFetcher(this.props.categories.categorySelected.id);
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

  renderItem = (item, index) => {
    if (!index)
      return (
        <VideoItemFeatured
          item={item}
          onPress={() => {
            this.props.selectArticle(item);
            this.props.navigation.navigate("Article");
          }}
        />
      );

    return (
      <VideoItem
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
      isFetchingInterviews,
      lastPage
    } = this.props.interviews;
    let {
      categorySelected,
      all_categories,
      errorFetchingCategories,
      isFetchingCategories
    } = this.props.categories;
    let barStyle = "dark-content";
    if (Platform.OS === "android") barStyle = "light-content";
    return (
      <SafeAreaView style={config.styles.containerNoPadding}>
        <StatusBar barStyle={barStyle} />
        <CategoryModal />
        <SectionList
          ref={sectionList => {
            this.sectionList = sectionList;
          }}
          refreshing={isFetchingInterviews || isFetchingCategories}
          onEndReachedThreshold={0.4}
          onEndReached={() => {
            if (!isFetchingInterviews)
              this.props.interviewsFetcher(categorySelected.id);
          }}
          onRefresh={() => {
            this.props.resetInterviewsFetcher();
            this.props.interviewsFetcher(categorySelected.id);
            this.props.categoriesFetcher();
          }}
          renderSectionFooter={({ section }) => {
            if (section.data)
              if (section.data.length > 1)
                if (isFetchingInterviews) {
                  return (
                    <ActivityIndicator
                      style={styles.loader}
                      size="small"
                      color="black"
                    />
                  );
                } else {
                  if (lastPage)
                    return (
                      <View style={styles.endOfListView}>
                        <Text style={styles.endOfListText}>
                          {config.strings.homeScreen.endOfList}
                        </Text>
                      </View>
                    );
                  return null;
                }
            return null;
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
              renderItem: (item, index) => {
                return (
                  <View style={styles.errorView}>
                    <Text style={styles.error}>
                      {errorFetchingInterviews || errorFetchingCategories
                        ? config.strings.errorLoading
                        : ""}
                    </Text>
                  </View>
                );
              }
            },
            {
              data: all_categories ? (data ? data : "") : "",
              keyExtractor: (item, index) => item.id,
              renderItem: item => this.renderItem(item.item, item.index)
            }
          ]}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
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
    paddingTop: 10,
    marginHorizontal: 10
  },
  error: {
    fontSize: 14,
    fontFamily: config.fonts.bodyFont,
    textAlign: "center"
  },
  loader: {
    marginTop: 10,
    marginBottom: 10
  },
  endOfListView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  endOfListText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: config.fonts.bodyFont,
    color: config.colors.blackTorn
  }
});

const mapStateToProps = state => {
  return { interviews: state.interviews, categories: state.categories };
};

const mapDispatchToProps = dispatch => {
  return {
    selectArticle: article => dispatch(selectArticle(article)),
    interviewsFetcher: category_id => dispatch(interviewsFetcher(category_id)),
    resetInterviewsFetcher: () => dispatch(resetInterviewsFetcher()),
    categoriesFetcher: () => dispatch(categoriesFetcher()),
    selectCategory: category => dispatch(selectCategory(category)),
    categoryModalAction: () => dispatch(categoryModalAction()),
    interviewsScrollToTop: () => dispatch(interviewsScrollToTop())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
