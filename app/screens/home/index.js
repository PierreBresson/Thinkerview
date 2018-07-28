import React from "react";
import { ActivityIndicator, Text, View, SectionList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { interviewsFetcher } from "../../actions";
import VideoItem from "../../components/listItem/videoItem";
import config from "../../config";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    }
  }

  componentDidMount() {
    this.props.interviewsFetcher(this.state.page);
  }

  renderIntro = () => {
    return (
      <View style={styles.headerView}>
        <Text style={styles.header}>
          {config.strings.homeScreen.header}
        </Text>
      </View>
    );
  };

  renderActivityIndicator = () => {
    if(!this.props.interviews.isFetchingInterviews)
      return <View/>;
    return (
      <View>
        <ActivityIndicator size="large" color="black" />
      </View>
    )
  }

  renderItem = (item, index) => {    
    return (
      <VideoItem
        key={index}
        item={item}
        onPress={() => {
          this.props.navigation.navigate("Article", { item });
        }}
      />
    );
  };

  render() {
    return (
    <View style={config.styles.containerNoPadding} >
      <SectionList
        refreshing={false}
        onRefresh={()=>{this.props.interviewsFetcher(this.state.page)}}
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
              return(
                <View style={styles.errorView}>
                  <Text style={styles.error}>
                    { this.props.interviews.errorFetchingInterviews ? config.strings.errorLoading : "" }
                  </Text>
                </View>
              )
            }
          },
          {
            data: this.props.interviews.data ? this.props.interviews.data : "",
            keyExtractor: (item, index) => item.id,
            renderItem: (item, index) => 
              this.props.interviews.isFetchingInterviews ? <View/> : this.renderItem(item.item, item.id)
          }
        ]}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    fontSize: 28,
    fontFamily: config.fonts.titleFont,
    paddingBottom: 6,
    color: config.colors.blackTorn
  },
  errorView: {
    flex:1, 
    alignItems: "center"
  },
  error: {
    fontSize: 14,
    fontFamily: config.fonts.bodyFont
  },
});

const mapStateToProps = state => {
  return {
    interviews: state.interviews,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    interviewsFetcher: (page) => dispatch(interviewsFetcher(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);