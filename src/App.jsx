import { useState, useRef } from "react";
import { Tweet } from "./Tweet";


const DEFAULT_TWEETS = [
  {
    id: 0,
    name:"Lisa", 
    content:"HEY là qui va là ?", 
    like:10,
  },
  {
    id: 1,
    name:"Doudou", 
    content:"Inspecteur gadget", 
    like:20,
  },
  {
    id: 2,
    name:"Andria", 
    content:"Oh nom de la loi", 
    like:30,
  },
  {
    id: 3,
    name:"Papa", 
    content:"Moi je vous arrête", 
    like:40,
  },
];

function App() {
  const [tweets, setTweets] = useState(DEFAULT_TWEETS);
  const nameRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);

    const name = nameRef.current.value;
    console.log(nameRef);
    const content = event.target.content.value;
  
    const newTweet = {
      id: tweets[tweets.length - 1]?.id + 1 ?? 0,
      name,
      content, 
      like: 0,
    }
    addTweet(newTweet);
  };

  const addTweet = (tweet) => {
    setTweets([...tweets, tweet]);
  }

  const onDelete = (tweetId) => {
    setTweets((curr) => curr.filter((tweet) => tweet.id !== tweetId));
  };

  const onLike = (tweetId) => {
    setTweets((curr) => {
      const copyTweet = [...curr];

      const likedTweet = copyTweet.find((tweet) => tweet.id === tweetId);
      likedTweet.like += 1;

      return copyTweet;
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="tweet-form">
        <h4>New Form</h4>
        <input ref={nameRef} placeholder="name" type="text" name="name" />
        <input placeholder="content" type="content" name="content" />
        <input type="submit"/>
      </form>
      <div className="tweet-container">
        {tweets.map((tweet) => {
          return (
            <Tweet 
              key={tweet.id}  
              id={tweet.id}
              name={tweet.name} 
              content={tweet.content} 
              like={tweet.like}
              onDelete={(id) => {
                console.log("DELETE", id)
                onDelete(id);
              }}
              onLike={(id) => {
                onLike(id)
              }}
            />
          );
        })}
      </div>
    </div>
  );
}



export default App;




  // let [username, setUsername] = useState("Poupette");
  // console.log("RERENDER", username)
  // const addLetter = () => {
  //   setUsername((curr) => {
  //     console.log(curr);
      
  //     return curr + "a";
  //   });
  // }
//CODE A RAJOUTER DANS LA DIV
  // <p>{username}</p>
  // <button onClick={addLetter}>Ajoute une lettre</button>
