import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from './../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component{

   componentDidMount(){
    this.updateChar();
   }
   state = {
     char:{},
     loading: true,
     error: false
   }
   
   marvelService = new MarvelService();
   onLoading = () => {
       this.setState({...this.state, loading: true})
   }
   onCharLoaded = (char) => {
       this.setState({char, loading: false, error: false})
   }

   onError = () => {
        this.setState({
            loading: false,
            error: true
        })
   }

  

   updateChar = () => {
        this.onLoading()
       const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
       this.marvelService
       .getCharacter(id)
       .then(this.onCharLoaded)
       .catch(this.onError)
   }
   
   render(){
       const {char, loading, error} = this.state;
    return (
        <div className="randomchar">
            {loading ? <Spinner/>: error? <ErrorMessage/> : <View char={char}/>}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick = {this.updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )


   }
   
 
}
const View = ({char}) => {

    const {name, description, thumbnail, wiki, homepage} = char
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    return(
        <div className="randomchar__block">
        <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}
export default RandomChar;