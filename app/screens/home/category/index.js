import React from "react";
import {
  Platform,
  ActivityIndicator,
  Text,
  View,
  Linking,
  SectionList,
  StyleSheet,
  StatusBar
} from "react-native";
import { connect } from "react-redux";
import {
  categoryInterviewsFetcher,
  selectArticle,
  categoryInterviewsScrollToTop,
  resetCategoryInterviewsFetcher
} from "../../../actions";
import Header from "../../../components/header";
import Button from "../../../components/button";
import VideoItem from "../../../components/listItem/videoItem";
import VideoItemFeatured from "../../../components/listItem/videoItemFeatured";
import config from "../../../config";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.startAppFromZero();
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      "TCL: Category -> shouldComponentUpdate -> nextProps",
      nextProps
    );
    if (nextProps.categoryInterviews.shouldScrollToTop) {
      this.props.categoryInterviewsScrollToTop();
      this.sectionList.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0
      });
    }
    return true;
  }

  startAppFromZero = () => {
    const { isFetchingCategoryInterviews } = this.props.categoryInterviews;
    this.props.resetCategoryInterviewsFetcher();
    if (!isFetchingCategoryInterviews) {
      this.props.categoryInterviewsFetcher(
        this.props.categories.categorySelected.id
      );
    }
  };

  _onEnReached = () => {
    const {
      isFetchingCategoryInterviews,
      errorFetchingCategoryInterviews
    } = this.props.categoryInterviews;

    const shouldFetchData =
      !isFetchingCategoryInterviews && !errorFetchingCategoryInterviews;

    if (shouldFetchData) {
      this.props.categoryInterviewsFetcher(
        this.props.categories.categorySelected.id
      );
    }
  };

  renderActivityIndicator = () => {
    const {
      isFetchingCategoryInterviews,
      data
    } = this.props.categoryInterviews;
    if (isFetchingCategoryInterviews && !data) {
      return <ActivityIndicator size="large" color="black" />;
    }

    return null;
  };

  renderItem = (item, index) => {
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

  renderFooter = ({ section }) => {
    const {
      isFetchingCategoryInterviews,
      lastPage
    } = this.props.categoryInterviews;

    if (section.data)
      if (section.data.length > 1)
        if (isFetchingCategoryInterviews) {
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
    const { errorFetchingCategoryInterviews } = this.props.categoryInterviews;
    const { isFetchingCategoryInterviews } = this.props.categoryInterviews;

    if (!isFetchingCategoryInterviews && errorFetchingCategoryInterviews) {
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

  render() {
    let { data } = this.props.categoryInterviews;

    return (
      <View style={config.styles.containerNoPadding}>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        />
        <SectionList
          ref={sectionList => {
            this.sectionList = sectionList;
          }}
          bounces={false}
          refreshing={false}
          onEndReachedThreshold={0.4}
          onEndReached={this._onEnReached}
          onRefresh={this.startAppFromZero}
          renderSectionFooter={this.renderFooter}
          sections={[
            {
              data: [1],
              keyExtractor: (item, index) => index,
              renderItem: item => (
                <Header onPressLeft={() => this.props.navigation.goBack()} />
              )
            },
            {
              data: [1],
              keyExtractor: (item, index) => index,
              renderItem: (item, index) => this.renderActivityIndicator()
            },
            {
              data: data ? data : "",
              keyExtractor: (item, index) => item.id,
              renderItem: item => this.renderVideoItem(item.item, item.index)
            },
            {
              data: [1],
              keyExtractor: (item, index) => index,
              renderItem: (item, index) => this.renderError()
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
  }
});

const mapStateToProps = state => {
  return {
    categoryInterviews: state.categoryInterviews,
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetCategoryInterviewsFetcher: () =>
      dispatch(resetCategoryInterviewsFetcher()),
    selectArticle: article => dispatch(selectArticle(article)),
    categoryInterviewsFetcher: category_id =>
      dispatch(categoryInterviewsFetcher(category_id)),
    categoryInterviewsScrollToTop: () =>
      dispatch(categoryInterviewsScrollToTop())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
