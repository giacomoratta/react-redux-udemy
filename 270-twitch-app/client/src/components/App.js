import React from 'react';

// Components for react-router
import { BrowserRouter, Route } from 'react-router-dom';

// Custom components
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';


const App = () => {
  // without exact, PageOne is always showed because '/' is common to all other paths
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Header/>
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit" exact component={StreamEdit} />
          <Route path="/streams/delete" exact component={StreamDelete} />
          <Route path="/streams/show" exact component={StreamShow} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;