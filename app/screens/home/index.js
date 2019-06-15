import React from "react";
import {
  Platform,
  ActivityIndicator,
  Text,
  View,
  Linking,
  SectionList,
  StyleSheet,
  StatusBar,
  TouchableOpacity
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
import CategoryItem from "../../components/listItem/categoryItem";
import Button from "../../components/button";
import VideoItem from "../../components/listItem/videoItem";
import VideoItemFeatured from "../../components/listItem/videoItemFeatured";
import config from "../../config";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.startAppFromZero();
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

  startAppFromZero = () => {
    const { isFetchingInterviews } = this.props.interviews;
    const { isFetchingCategories } = this.props.categories;

    if (!isFetchingCategories && !isFetchingInterviews) {
      this.props.interviewsFetcher(0);
      this.props.categoriesFetcher();
    }
  };

  renderHeader = () => (
    <View style={styles.headerView}>
      <Text style={styles.header}>{config.strings.homeScreen.explorer}</Text>
    </View>
  );

  goToCategory = (category = 0) => {
    this.props.selectCategory(category);
    this.props.resetInterviewsFetcher();
    this.props.navigation.navigate("Category");
  };

  renderIntroInterviews = () => (
    <View style={styles.introView}>
      <View style={{ flex: 3 }}>
        <Text style={styles.subHeader}>
          {config.strings.homeScreen.lastestInterviews}
        </Text>
      </View>
      <TouchableOpacity style={styles.linkView} onPress={this.goToCategory}>
        <Text style={styles.link}>{config.strings.homeScreen.seeAll}</Text>
      </TouchableOpacity>
    </View>
  );

  renderIntroCategories = () => (
    <View style={styles.introView}>
      <Text style={styles.subHeader}>
        {config.strings.homeScreen.categories}
      </Text>
    </View>
  );

  renderActivityIndicator = () => {
    const { isFetchingInterviews } = this.props.interviews;
    const { isFetchingCategories } = this.props.categories;

    if (isFetchingInterviews || isFetchingCategories) {
      return <ActivityIndicator size="large" color="black" />;
    }

    return null;
  };

  renderVideoItem = (item, index) => {
    const VideoComponent = index ? VideoItem : VideoItemFeatured;

    return (
      <VideoComponent
        item={item}
        onPress={() => {
          this.props.selectArticle(item);
          this.props.navigation.navigate("Article");
        }}
      />
    );
  };

  renderCategoryItem = (item, index) => (
    <CategoryItem item={item} onPress={() => this.goToCategory(item.id)} />
  );

  renderFooter = ({ section }) => {
    const { isFetchingInterviews, lastPage } = this.props.interviews;

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
  };

  renderError = () => {
    const { errorFetchingInterviews } = this.props.interviews;
    const { errorFetchingCategories } = this.props.categories;
    const { isFetchingInterviews } = this.props.interviews;
    const { isFetchingCategories } = this.props.categories;

    if (!isFetchingInterviews && !isFetchingCategories) {
      if (errorFetchingInterviews || errorFetchingCategories) {
        return (
          <View style={styles.errorView}>
            <Text style={styles.error}>{config.strings.errorLoading}</Text>
            <Button
              message={config.strings.tryAgain}
              iconName={"refresh"}
              onPress={this.startAppFromZero}
            />
            <Text style={styles.error}>
              {config.strings.homeScreen.check_website_message}
            </Text>
            <Button
              message={config.strings.homeScreen.check_website_button}
              onPress={() =>
                Linking.openURL(config.urls.links.thinkerview.website)
              }
            />
          </View>
        );
      }
    }

    return null;
  };

  render() {
    const {
      data,
      isFetchingCategories,
      isFetchingInterviews
    } = this.props.interviews;
    const { all_categories } = this.props.categories;
    const isFetching = isFetchingCategories && isFetchingInterviews;
    const allData = all_categories && data;

    return (
      <View style={config.styles.containerNoPadding}>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        />
        <SectionList
          ref={sectionList => {
            this.sectionList = sectionList;
          }}
          refreshing={false}
          onRefresh={this.startAppFromZero}
          sections={[
            {
              data: [1],
              keyExtractor: (item, index) => index,
              renderItem: (item, index) => this.renderHeader()
            },
            {
              data: [1],
              keyExtractor: (item, index) => index,
              renderItem: (item, index) =>
                allData && !isFetching ? this.renderIntroInterviews() : null
            },
            {
              data: [1],
              keyExtractor: (item, index) => index,
              renderItem: (item, index) => this.renderActivityIndicator()
            },
            {
              data: [1],
              keyExtractor: (item, index) => index,
              renderItem: (item, index) => this.renderError()
            },
            {
              data: allData ? data.slice(0, 3) : "",
              keyExtractor: (item, index) => item.id,
              renderItem: item => this.renderVideoItem(item.item, item.index)
            },
            {
              data: [1],
              keyExtractor: (item, index) => index,
              renderItem: (item, index) =>
                allData && !isFetching ? this.renderIntroCategories() : null
            },
            {
              data: allData ? all_categories : "",
              keyExtractor: (item, index) => index,
              renderItem: (item, index) =>
                allData && !isFetching
                  ? this.renderCategoryItem(item.item, item.index)
                  : null
            }
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    ...config.styles.container,
    paddingTop: 40
  },
  header: {
    fontSize: 30,
    fontFamily: config.fonts.titleFont,
    paddingBottom: 10,
    paddingRight: 6,
    color: config.colors.blackTorn
  },
  introView: {
    ...config.styles.container,
    flexDirection: "row",
    paddingBottom: 10,
    paddingTop: 20
  },
  subHeader: {
    fontSize: 22,
    fontFamily: config.fonts.subTitleFont,
    paddingBottom: 4,
    paddingRight: 6,
    color: config.colors.blackTorn
  },
  linkView: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  link: {
    fontSize: 16,
    fontFamily: config.fonts.bodyFont,
    color: config.colors.thinkerGreen
  },
  errorView: {
    ...config.styles.container,
    alignItems: "center",
    justifyContent: "center"
  },
  error: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: config.fonts.bodyFont
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
  },
  categoryElementView: {
    flex: 1,
    backgroundColor: config.colors.thinkerGreen
  },
  categoryElementText: {
    fontSize: 18
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
