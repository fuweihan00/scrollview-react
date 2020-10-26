import React, { useState, useCallback, useEffect } from 'react';
import ScrollView from './scrollView';
import './App.css';

let scorllUse = () => {};

function App() {

  const [dataList, setDataList] = useState([1,1,1]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(() => {
    
      console.log('loadData.....');
      setTimeout(() => {
        setDataList(list => [1,1,1,1,1,1,1, ...list]);
        setLoading(false);
      }, 500);

  }, []);

  useEffect(() => () => {
    scorllUse = () => {};
  }, []);
   
  return (
    <div>
      <ScrollView
        className="scrollView"
        loadOffsetHeight={30}
        // body={true}
        loadData={loadData}
        scrollControll={scrollTo => {
          scorllUse = scrollTo;
        }}
      >
        {
          dataList.map((num, index) => <div className="listItem" key={index}>{index}</div>) 
        }
        <div className="loadItem">正在加载...</div>
      </ScrollView>
      <div className="toTopBtn" onClick={() => scorllUse(0)}>TOP</div>
    </div>
  );
}

export default App;
