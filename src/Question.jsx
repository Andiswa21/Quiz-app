import React, {Component} from 'react'
import Options from './Option';

class Question extends Component{
    render(){
        const {question, selectedOption, onOptionChange, onSubmit} = this.props;

        if(!question) return <div><h3>Loading ...
            </h3></div>
        return(
            <div className=''>
                <h3>Question {question.id}</h3>
                <h5 className="mt-5">{question.question}</h5>
                <form onSubmit={onSubmit} className='mt-2 mb-2'>
                    <Options 
                    options = {question.options}
                    selectedOption = {selectedOption}
                    onOptionChange = {onOptionChange}/>
                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
        )
    }
}

export default Question