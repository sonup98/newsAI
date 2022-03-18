import React,{useState, useEffect} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './component/NewsCards/NewsCards'
import useStyles from './styles'
import wordsToNumbers from 'words-to-numbers';



const alankey = '9f01155f8dbbaa2fd132aa3054f35dc12e956eca572e1d8b807a3e2338fdd0dc/stage'


const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle ] = useState(-1);
    const classes = useStyles();

useEffect(() => {
    alanBtn({
        key:alankey,
        onCommand: ({command, articles, number}) => {
            if(command === 'newHeadlines'){
                setNewsArticles(articles);
                setActiveArticle(-1);
            }else if(command === 'highlight'){
                setActiveArticle( (prevActiveArticle) => prevActiveArticle + 1);
            } else if (command === 'open') {
                const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                const article = articles[parsedNumber - 1];
      
                if (parsedNumber > articles.length) {
                  alanBtn().playText('Please try that again...');
                } else if (article) {
                  window.open(article.url, '_blank');
                  alanBtn().playText('Opening...');
                } else {
                  alanBtn().playText('Please try that again...');
                }
              }
        }
              })      
            },[])

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src={require('./News Ai.png')} className={classes.Logo} alt="logo"/>
            </div>
            <NewsCards articles = {newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}

export default App;
