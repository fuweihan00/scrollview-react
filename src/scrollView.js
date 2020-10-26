import React, { useEffect, useRef, useCallback, useState } from 'react';

const screenW = window.screen.width;
const screenH = window.screen.height;
const html = document.documentElement;

export default ({ children, body = false, className = '', style = {}, loadOffsetHeight = 0, loadData, scrollControll }) => {

  const [common] = useState({ onLoad: false });
  const scrollRef = useRef();

  const scrollTo = useCallback((top) => {
    if (body) {
      html.scrollTop = top;
    } else {
      scrollRef.current.scrollTop = top;
    }
  }, [body]);

  useEffect(() => {
    if (body && html.scrollHeight <= screenH) {
      loadData && loadData();
    } else if (!body && scrollRef.current.scrollHeight <= scrollRef.current.offsetHeight) {
      loadData && loadData();
    }
  }, [children, body, loadData]);

  useEffect(() => {
    scrollControll && scrollControll(scrollTo);
  }, [scrollTo, scrollControll]);

  useEffect(() => {
    let { onLoad } = common;
    if (body) {
      window.addEventListener('scroll', () => {
        if (!onLoad && html.scrollTop + screenH >= html.scrollHeight - parseInt(loadOffsetHeight * screenW/ 375, 0)) {
          loadData && loadData();
          onLoad = true;
        } else if (onLoad && html.scrollTop + screenH < html.scrollHeight - parseInt(loadOffsetHeight * screenW/ 375, 0)) {
          onLoad = false;
        }
      });
    } else {
      scrollRef.current.addEventListener('scroll', () => {
        if (!onLoad && scrollRef.current.scrollTop + scrollRef.current.offsetHeight >= scrollRef.current.scrollHeight - parseInt(loadOffsetHeight * screenW/ 375, 0)) {
          loadData && loadData();
          onLoad = true;
        } else if (onLoad && scrollRef.current.scrollTop + scrollRef.current.offsetHeight < scrollRef.current.scrollHeight - parseInt(loadOffsetHeight * screenW/ 375, 0)) {
          onLoad = false;
        }
      })
    }
  }, [body, loadData]);

  return (
    <div className={className} style={{ overflowY: body ? 'visible' : 'auto', ...style }} ref={scrollRef}>
      {
        children
      }
    </div>
  );
}