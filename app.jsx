import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import second from './second.jsx'
 
class App extends React.Component {
  constructor(){
      super();
      this.state = {value:"",artist:false,queryArtist:false}
      this.handleChange = this.handleChange.bind(this);
      this.submit = this.submit.bind(this);
      this.parseGetRequest = this.parseGetRequest.bind(this);
      this.parseRequestWithID = this.parseRequestWithID.bind(this);
  }
  reLoad(value){
      const url = this.parseGetRequest(value);
      console.log('url is', url);
      this.getArtistID(url);
  }
  handleChange(event){
      this.setState({value: event.target.value});  
  }
  submit(){
      const url = this.parseGetRequest(this.state.value);
      this.getArtistID(url);   
  }
  parseGetRequest(query){
      let url = 'https://api.spotify.com/v1/search?q='
      //handle spaces
      if (query.indexOf(' ') >= 0){
          query = query.replace(' ','%20');
      } 
      url += query + '&type=artist';
      return url;
  }
  parseRequestWithID(ID){
      let url = `https://api.spotify.com/v1/artists/${ID}/related-artists`;
      return url;
  }
  getArtistID(link){
      let searchedArtist = link;
    $.get(link)
      .then((data) => {return data.artists.items[0].id;})
      .then((artistID) => {
          const url = this.parseRequestWithID(artistID);
          $.get(url).done((data) => {
              let similarArtists = [];
              for (let i = 0; i < 6; i++){
                 //assign a variable
                 let size;
                 let pop = Math.floor(data.artists[i].popularity / 10);
                 switch(pop){
                     case 9 :
                         size = 'XXXLG'
                        break;
                     case 8 : 
                        size = 'XXLG'
                        break;
                     case 7 : 
                        size = 'XLG'
                        break;
                    case 6 : 
                        size = 'LG';
                        break;
                    case 5 : 
                        
                    case 4 : 
                        size = 'MD';
                        break;
                    case 3 : 
                        
                    case 2 : 
                        
                    case 1 : 
                        
                    case 0 : 
                        size = 'SM';
                        break;
                 }
                 let windowHeight = parseInt(window.innerHeight);
                 let windowWidth = parseInt(window.innerWidth);
                //  let posx = (150)
                //  let posy = (100)
                 let cssClasses = `${size} node ${windowHeight}`;
                //  let styles = {
                //      left: posx + 'px',
                //      top: posy + 'px'
                //  };
                 similarArtists.push(<div className={cssClasses} id={i} onClick={this.reLoad.bind(this,`${data.artists[i].name}`)}><span className="bandName">{data.artists[i].name}</span></div>);
              }
               if(searchedArtist.indexOf('%20') === -1){
                     let idx = searchedArtist.indexOf('=')+1;
                     let amp = searchedArtist.indexOf('&');
                     searchedArtist = searchedArtist.slice(idx,amp);
                     console.log(searchedArtist);
                 } else {
                     let idx = searchedArtist.indexOf('=')+1;
                     let amp = searchedArtist.indexOf('&');
                     searchedArtist = searchedArtist.slice(idx,amp);
                     searchedArtist = searchedArtist.replace('%20',' ');
                 }
                 let toSearch = [];
                 toSearch.push(<div className="queriedArtist"><span className="queryName">{searchedArtist}</span></div>)
              this.setState({queryArtist:toSearch,artist:similarArtists});
          });
      });
  }
  render() {
    let windowHeight = window.innerHeight;
    let styles = `${windowHeight} bg`
    return <div className="bg"><form>
    <input id='formID' className='queryForm' type='text' value={this.state.value} onChange={this.handleChange}/>
    </form>
    <button onClick={this.submit}>clickme</button>
    <div>{this.state.artist}</div>
    <div>{this.state.queryArtist}</div>
    </div>
   
  }

}
 
ReactDOM.render(<App/>, document.getElementById('app'));