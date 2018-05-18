
class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0
    }
    this.onNextClick = this.onNextClick.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
  }
  onNextClick() {
    if(this.state.activeIndex < 4){
      this.setState({activeIndex: this.state.activeIndex + 1});
    } else {
      this.setState({activeIndex: 0})
    } 
  }
  
    onPrevClick() {
      if(this.state.activeIndex > 0) {
        this.setState({activeIndex: this.state.activeIndex - 1});
      } else {
        this.setState({activeIndex: 4})
      }
  }
  render() {
    let sliderStyle ={
      transform:`translateX(${this.state.activeIndex * -100}%)`,
      transition: '0.2s'
    }
    return (
      <div className='container'>
        <div className='buttons'>
          <button onClick={this.onPrevClick}>◀</button>
          <button onClick={this.onNextClick}>▶</button>
        </div>
<ol className='slide-container' >
          {[1,2,3,4,5].map((item, index) => {
            let computedClass = index === (this.state.activeIndex) ? 'slide active' : 'slide';
            return <li className={computedClass} key={index}>{item}</li>
          })}
        </ol>
    </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));