// Packages
import React from "react";

// Components
import AskerEachQuestion from "./AskerEachQuestion.js";

class AskerQuestionsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
}



render() {
    const { questions, userInfo } = this.props.data

    return(
        <div>

        {questions.map( ({ title, question, id}) =>
            <AskerEachQuestion id={id} title={title} question={question} userInfo={userInfo} />
        )}
        
        </div>
    )
}
};

export default AskerQuestionsList;
